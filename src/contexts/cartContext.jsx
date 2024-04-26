"use client"
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';

export const CartContext = createContext({})

export const CartProvider = ({children}) => {
    const [cartItem, setCartItem] = useState([])
    const addToCart = (data) => {
        toast.success(`Successfully added to cart`);
    }

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