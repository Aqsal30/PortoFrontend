'use client'

import Link from "next/link";
import {Hamburger, ShoppingCart, ScrollText} from 'lucide-react';

const Navbar2 = () => {
    return(
        <div className="h-15 w-full bg-blue-500 flex justify-around fixed bottom-0 items-center">
          <Link href={'/'} className="btn flex flex-col w-13 h-13"><Hamburger />Menu</Link>
          <Link href={'/Cart'} className="btn flex flex-col w-13 h-13"><ShoppingCart />Cart</Link>
          <Link href={'/Order'} className="btn flex flex-col w-13 h-13"><ScrollText />Order</Link>
        </div>

    )
}

export default Navbar2;