"use client"
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';

export const CartContext = createContext({})

export const CartProvider = ({children}) => {
    const [cartItem, setCartItem] = useState(()=> localStorage.getItem("cart-item") ? JSON.parse(localStorage.getItem("cart-item")) :  []);
    const addToCart = (data) => {
        if (!cartItem.some((item)=> item.id === data.id)) {
            setCartItem(prev=> ([...prev, data]));
            toast.success(`Successfully added to cart`);
        } else {
            toast.error("Already in Your cart")
        }
    }
    useEffect(()=> {
        localStorage.setItem("cart-item", JSON.stringify(cartItem))
    }, [cartItem])

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