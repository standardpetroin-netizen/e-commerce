import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // ✅ Handle both boolean true and string "true" from MongoDB
      const bestProduct = products.filter(
        (item) => item.bestseller === true || item.bestseller === "true"
      );
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  if (bestSeller.length === 0) return null;

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Sellers"} />
        <p>Discover our most loved pieces</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;