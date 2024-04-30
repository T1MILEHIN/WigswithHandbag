"use client"
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItem, setCartItem] = useState([])
    const addToCart = (data) => {
        if (!cartItem.some((item)=> item.id === data.id)) {
            setCartItem(prev=> ([...prev, data]));
            localStorage.setItem("cart-item", JSON.stringify(cartItem))
            toast.success(`Successfully added to cart`);
        } else {
            toast.error("Item is already in your cart");
        }
    }
    useEffect(() => {
        if (cartItem) {
            setCartItem(localStorage.getItem("cart-item"));
        } else {
            setCartItem([]);
        }
    }, [cartItem]);

    return (
        <CartContext.Provider value={{cartItem, addToCart}}>
            <Toaster position="top-center" />
            <div className="relative">
                <>
                    {children}
                </>
            </div>
        </CartContext.Provider>
    )
}