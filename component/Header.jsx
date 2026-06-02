'use client'
import useCartStore from './Carting';
import { ShoppingCart, Search, Expand } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
const Header = ({data}) => {
    const [isClick, setIsClick] = useState(false)
    const [cari, setcari] = useState('')
    const isRef = useRef(null)
    useEffect(()=>{
      if (isClick){
        isRef.current?.focus()
        setcari('')
      }
    }, [isClick]);
    const path = usePathname()
    const isTarget = path === '/Cart'
    
    const cart = useCartStore((state) => state.cart);
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return(
    <div className='sticky top-0 z-5'>
      {isClick ?
        <>
        <div className="h-15 w-full bg-blue-500 flex justify-center items-center">
          <input ref={isRef} className='input w-full' placeholder='Cari Apa...' onChange={(e) => setcari(e.target.value)}/>
        </div> 
        <div className='absolute bg-black/90 h-screen w-full' onClick={()=>setIsClick(false)}>
          {data.filter((inputs) => {return (cari !=='' && inputs.nama_menu.toLowerCase().includes(cari.toLowerCase()))}).map((data) =>(
            <div className='w-full h-20 bg-white flex' key={data.menu_id}>
            <p className='text-black bg-red-600'>{data.nama_menu}</p>
            <button className='btn text-black justify-end'>pesan</button>
            </div>
          ))}
        </div>
        </>  
      :
        <>
        <div className="h-15 w-full bg-blue-500 flex">
          <div className="w-[25%] sm:w-[10%] flex justify-center items-center">
            <button className='btn border-0 bg-transparent' onClick={() => setIsClick(true)}>
              <Search />
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <Link className='btn border-0 bg-transparent' href={'/'}> MakanGEH </Link>
          </div>
          <div className=" w-[25%] sm:w-[10%] flex justify-center items-center">
            <Link className='btn border-0 bg-transparent' href={'/Cart'} disabled={isTarget}>
              <div className='indicator'>
                <span className="indicator-item rounded-full w-3 badge badge-secondary">{totalQuantity}</span>
                <ShoppingCart/>
              </div>
            </Link>
          </div>
        </div>  
        </> 
      }

    </div> 
)}
export default Header