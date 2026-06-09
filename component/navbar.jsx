'use client'

import Link from "next/link";
import {Hamburger, ShoppingCart, ScrollText} from 'lucide-react';
import useCartStore from "./Carting";
import { usePathname } from "next/navigation";
const Navbar2 = () => {
    const cart = useCartStore((state) => state.cart);
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const path = usePathname()
    const activeClass = (route) => {
    return path === route
      ? "bg-biru text-white"
      : "bg-gray-200 border-0 text-biru";
    };
    return(
        <div className="h-14 w-full bg-white rounded-t-4xl border-1 border-blue-600 flex justify-around fixed bottom-0 items-center">
          <Link href={'/'} className={`btn flex flex-col justify-end size-13 ${activeClass("/")}`}><Hamburger size={20}/>Menu</Link>
          <Link href={'/Cart'} className={`btn flex flex-col justify-end size-13 ${activeClass("/Cart")}`}>
            <div className='indicator'>
                <span className="indicator-item rounded-full w-3 badge badge-secondary">{totalQuantity}</span>
                <ShoppingCart size={20}/>
            </div>
            Cart
          </Link>
          <Link href={'/Order'} className={`btn flex flex-col justify-end size-13 ${activeClass("/Order")}`}><ScrollText size={20}/>Order</Link>
        </div>

    )
}

export default Navbar2;