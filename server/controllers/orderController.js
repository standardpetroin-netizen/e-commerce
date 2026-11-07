import orderModel from "../models/ordermodel.js";


// ============================
// CREATE ORDER
// ============================
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }

    if (!address) {
      return res.json({ success: false, message: "Address is required" });
    }

    const newOrder = new orderModel({
      userId: req.user.id,
      items,
      amount,
      address,
      status: "Processing",
      paymentMethod: paymentMethod || "cash_on_delivery",
      paymentStatus: paymentMethod === "upi" ? "pending" : "pending",
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ============================
// GET USER ORDERS
// ============================
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ============================
// ADMIN: GET ALL ORDERS
// ============================
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ============================
// ADMIN: LIST ALL ORDERS (Alias for allOrders)
// ============================
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    // Format address fields from address object
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      userId: order.userId,
      items: order.items,
      amount: order.amount,
      status: order.status,
      firstName: order.address?.firstName || "",
      lastName: order.address?.lastName || "",
      email: order.address?.email || "",
      street: order.address?.street || "",
      city: order.address?.city || "",
      state: order.address?.state || "",
      zipcode: order.address?.zipcode || "",
      country: order.address?.country || "",
      phone: order.address?.phone || "",
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    res.json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ============================
// ADMIN: UPDATE ORDER STATUS
// ============================
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const validStatuses = ["Pending", "Processing", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, userOrders, allOrders, listOrders, updateOrderStatus };
