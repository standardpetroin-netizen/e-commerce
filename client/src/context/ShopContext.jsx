import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : "https://e-commerce-101p.onrender.com/api");

const ShopContextProvider = (props) => {

  const currency = "₹";
  const delivery_fee = 10;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isContextReady, setIsContextReady] = useState(false);

  // Initialize token and user from localStorage and fetch products on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken) {
      setToken(storedToken);
    }
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
    
    // Fetch products from backend
    fetchProducts();
    
    // Mark context as ready after initialization
    setIsContextReady(true);
  }, []);

  // Load cart from backend when token changes
  useEffect(() => {
    if (token) {
      loadCartFromBackend(token);
      fetchWishlist(token);
    } else {
      setWishlist([]);
    }
  }, [token]);

  const loadCartFromBackend = async (authToken) => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (response.data.success && response.data.cart.products) {
        // Convert backend cart format to frontend format
        const cartObj = {};
        response.data.cart.products.forEach((item) => {
          cartObj[item.productId._id] = item.quantity;
        });
        setCartItems(cartObj);
      }
    } catch (error) {
      console.error("Error loading cart from backend:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    // Add to local state first (for UI responsiveness)
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]) {
        updatedCart[itemId] += quantity;
      } else {
        updatedCart[itemId] = quantity;
      }
      return updatedCart;
    });

    // Sync with backend if user is logged in
    if (token) {
      try {
        await axios.post(
          `${API_URL}/cart/add`,
          { productId: itemId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });

    if (token) {
      try {
        await axios.delete(`${API_URL}/cart/remove/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const updateCart = async (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));

    if (token) {
      try {
        await axios.put(
          `${API_URL}/cart/update`,
          { productId: itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const fetchWishlist = async (authToken) => {
    try {
      const response = await axios.get(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${API_URL}/wishlist/add`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${API_URL}/wishlist/remove`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setCartItems({});
    setWishlist([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,    
    addToCart,
    removeFromCart,
    updateCart,
    setCartItems,
    token,
    setToken,
    user,
    setUser,
    logout,
    API_URL,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isContextReady
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;