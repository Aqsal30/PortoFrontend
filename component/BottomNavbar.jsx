'use client'

import Link from "next/link";
import {Hamburger, ShoppingCart, ScrollText} from 'lucide-react';
import useCartStore from "./CartStorage";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
    const cart = useCartStore((state) => state.cart);
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const path = usePathname()
    const Inner = (route) => {
    return path === route
      ? "bg-sekunder text-white"
      : "bg-transparent text-biru";
    };
    const Logo = (route) => {
      return path === route &&
      "translate-y-[-10px] rounded-full bg-tersier" 
      
    };

    
    return(
      <div className="fixed bottom-0 w-full bg-white h-20 flex justify-center rounded-t-xl">
        {path != "/Cart" &&
        <div className="h-16 w-[90%] bg-primer rounded-xl flex items-center justify-around">
            <Link href={'/'} prefetch={false} className={`btn border-0 flex flex-col justify-center items-center size-13 gap-0 ${Inner("/")}`}>
              <div className={`flex justify-center items-center size-9 ${Logo("/")}`}><Hamburger size={24}/></div>
              <p className="text-[12px]">Menu</p>
            </Link>

            <Link href={'/Cart'} className={`btn border-0 flex flex-col justify-center items-center size-13 gap-0 ${Inner("/Cart")}`}>
              <div className={`flex justify-center items-center size-9 ${Logo("/Cart")}`}>
                  <div className="indicator">
                    <span className="indicator-item bg-sekunder border-0 rounded-full w-3 badge">{totalQuantity}</span>
                    <ShoppingCart size={24}/>
                  </div>
              </div>
              <p className="text-[12px]">Cart</p>
            </Link>
            
            <Link href={'/History'} className={`btn border-0 flex flex-col justify-center items-center size-13 gap-0 ${Inner("/History")}`}>
              <div className={`flex justify-center items-center size-9 ${Logo("/History")}`}><ScrollText size={24}/></div>
              <p className="text-[12px]">History</p>
            </Link>
          </div>      
        }

      </div>
    )
}

export default BottomNavbar;