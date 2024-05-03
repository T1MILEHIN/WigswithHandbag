"use client"
import { FaCheck } from "react-icons/fa";
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';

export const CartContext = createContext({})

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState(() => localStorage.getItem("cart-item") ? JSON.parse(localStorage.getItem("cart-item")) : [])
    const addToCart = (data) => {
        if (!cartItem.some((item) => item.id === data.id)) {
            console.log(data)
            setCartItem((prev) => [...prev, data])
            toast.success(`Successfully added to cart`,
            {
                icon: <FaCheck color="green" />
            }
        );
        } else {
            toast.error("Item is already in your cart");
        }
        console.log(cartItem)
    }

    useEffect(() => {
        localStorage.setItem("cart-item", JSON.stringify(cartItem))
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
    )
}