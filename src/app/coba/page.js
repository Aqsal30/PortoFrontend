'use client'
import Link from 'next/link';
import {Hamburger, ShoppingCart, ScrollText, Ham} from 'lucide-react';
const Navbar = () => {
    return(
      <>
        <div className='w-50 h-50 bg-black flex justify-center items-center'>
          <div className='bg-white h-20 w-20'></div>
          <div className='bg-base h-20 w-20'></div>
        </div>
      </>
    )
}

export default Navbar;