"use client"
import { FaCheck } from "react-icons/fa";
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    // Check for window and localStorage existence
    if (typeof window !== 'undefined' && localStorage) {
      try {
        return localStorage.getItem("cart-item") ? JSON.parse(localStorage.getItem("cart-item")) : [];
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        return []; // or any default value
      }
    }
    return []; // or any initial value (for SSR)
  });

  const addToCart = (data, setQuantity) => {
    if (!data) {
      toast.error(`Please enter the quantity that you want`);
      return;
    }
    if (!cartItem.some((item) => item.id === data?.id)) {
      setCartItem((prev) => [...prev, data]);
      setQuantity([]);
      toast.success(`Successfully added to cart`, {
        icon: <FaCheck color="green" />
      });
    } else {
      setCartItem(
        cartItem.map((item) =>
          item.id === data.id ? { ...item, quantity: item.quantity + data.quantity } : item
        )
      );
      toast.success(`More of ${data.name} has been added to your cart`, {
        icon: <FaCheck color="green" />
      });
      console.log(quantity)
      setQuantity([]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart-item", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <CartContext.Provider value={{ cartItem, setCartItem, addToCart }}>
      <Toaster position="top-center" />
      <div className="relative">
        <>
          {children}
        </>
      </div>
    </CartContext.Provider>
  );
};