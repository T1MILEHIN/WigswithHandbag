import { Vollkorn, Poppins } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"]}, )
import { Providers } from "./providers";
import { AuthProvider } from "@/contexts/authContext";
import { CartProvider } from "@/contexts/cartContext";

export const metadata = {
  title: "EvaTouch",
  keywords:"",
  content:"Evatouchbeauty: Your Trusted Global Destination for Premium Haircare and Makeup Essentials  At Evatouchbeauty, we pride ourselves on being the go-to choice for discerning individuals worldwide. Renowned for our unwavering commitment to quality and innovation, we specialize in curating the finest haircare and makeup products that elevate your beauty regimen to new heights",
  description:"Evatouchbeauty: Your Trusted Global Destination for Premium Haircare and Makeup Essentials "
};


export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="icon.jpeg" type="jpeg" sizes="any" />
      </head>
      <body>
        <div className={vollkorn.className}>
          <section>
            <AuthProvider>
              <CartProvider>
                <Providers>
                  {children}
                </Providers>
              </CartProvider>
            </AuthProvider>
          </section>
        </div>
      </body>
    </html>
  );
}

