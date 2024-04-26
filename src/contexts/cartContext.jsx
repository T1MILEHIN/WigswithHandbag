"use client";
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';

export const CartContext = createContext({})

export const CartProvider = ({children}) => {
    const  [cartItems, setCartItems] = useState([]);
    // Add item to cart
    useEffect(()=> {
        const  cartFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem('cart')) : [];
        if (cartFromLocalStorage){
            setCartItems([...JSON.parse(localStorage.getItem("cartItems"))  ])
        }
        else {
            setCartItems([])
        };
    }, [cartItems])

    const addCartItem = (item)=> {
        console.log(cartItem)
    }

    return (
        <CartContext.Provider value={{addCartItem}}>
            <Toaster position="top-center" />
            <div className="relative">
                <>
                    {children}
                </>
            </div>
        </CartContext.Provider>
    )
    
    

}