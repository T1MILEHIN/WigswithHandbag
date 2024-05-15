"use client";
import { useState, useEffect, createContext } from "react";

export const DisplayContext = createContext({});

export const DisplayProvider = ({ children }) => {
    const [FullScreen, setFullScreen] = useState(false)
    useEffect(()=> {
        const handleResize = ()=> {
            const size = window.innerWidth;
            size > 1024 ? setFullScreen(true) : setFullScreen(false)
        }
        handleResize()

        window.addEventListener("resize", handleResize)

        return ()=> window.removeEventListener("resize", handleResize)
    }, [FullScreen])

  return (
    <DisplayContext.Provider
      value={{FullScreen}}
    >
        {children}
    </DisplayContext.Provider>
  );
};
