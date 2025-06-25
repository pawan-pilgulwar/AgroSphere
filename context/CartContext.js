"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookies";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);

  // Fetch cart from API
  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = cookies.getItem("token");
      if (!token) return;
      const response = await axios.get("/api/cart/getcart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.cart;
      setCart(data);
      if (data && Array.isArray(data.items)) {
        setCartCount(data.items.reduce((sum, item) => sum + (item.quantity || 0), 0));
        // Fetch product details for each cart item
        const items = await Promise.all(
          data.items.map(async (element) => {
            const productRes = await axios.get(`/api/products/${element.product}/getproduct`, {
              headers: { "Content-Type": "application/json" },
            });
            const product = productRes.data.product;
            product.quantity = element.quantity;
            // Optionally fetch category details
            if (product.category) {
              try {
                const categoryRes = await axios.get(`/api/categories/${product.category}/getcategory`, {
                  headers: { "Content-Type": "application/json" },
                });
                product.category = categoryRes.data.category;
              } catch {}
            }
            return product;
          })
        );
        setCartItems(items);
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      setCartItems([]);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // Optionally, add dependencies to refetch on login/logout
  }, []);

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    try {
      const token = cookies.getItem("token");
      if (!token) return;
      await axios.post(
        "/api/cart/add",
        { productId: product._id, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCart();
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const token = cookies.getItem("token");
      if (!token) return;
      await axios.post(
        "/api/cart/remove",
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCart();
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, newQuantity) => {
    setLoading(true);
    try {
      const token = cookies.getItem("token");
      if (!token) return;
      await axios.put(
        "/api/cart/update",
        { productId, quantity: newQuantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCart();
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        loading,
        setLoading,
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
