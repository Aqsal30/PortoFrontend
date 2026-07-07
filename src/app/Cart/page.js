"use client";

import { useState } from "react";
import useCartStore from "../../../component/Carting";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "../utils/FormatPrice";
const api = process.env.BASE_API
const Keranjang = () => {
  const [nama,setNama] = useState('')
  const [alert, setAlert] = useState(false)
  const cart = useCartStore(
    (state) => state.cart
  );
  const TotalPrice = cart.reduce(
    (total, items) => total + items.quantity * items.harga,
    0
  );
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const handler = async() => {
    if (!nama){
      setAlert(true)
      setTimeout(()=>{
        setAlert(false);

      }, 2000)
    }else{
      await fetch(`${api}/order`, {
        method: "POST", 
        headers: {"Content-Type": "application/json",}, 
        body: JSON.stringify({data:cart, nama})
      });
    }
    };

  return (
    <div className="bg-back w-full h-full flex flex-col items-center">
      <div className="w-full sticky top-0 h-10 bg-primer z-10 flex items-center">
        <Link href={"/"}><ArrowLeft /></Link>
        <p>Cart</p>
      </div>
      <div className="w-full text-primer mb-50">
        {cart.map((item) => (
          <div key={item.id}>
            <div className='w-full h-40 bg-back flex flex-row justify-center border-2 border-primer'>
              
              <div className='w-[30%] flex justify-center items-center m-2'>
                <img className='size-25 rounded-3xl' src='/image/latte.png' alt='Coffee' />
              </div>

              <div className='w-[65%] pt-2 flex flex-col'>
                <div className="w-full h-[70%] flex flex-col">
                  <p className='font-bold text-red-400'>{item.name}</p>
                  <p className="text-gray">Espresso description</p>
                </div>
                
                <div className="w-full h-[30%] flex flex-row justify-between items-center">
                  <div className='w-30 h-9 bg-tersier border-2 border-back rounded-full flex justify-between items-center text-back'>
                    <div className='btn btn-circle bg-back size-6 ml-1'>
                     <Minus color="#000" strokeWidth={3}/>
                    </div>
                    <p className="text-black">{item.quantity}</p>
                    <div className='btn btn-circle bg-back size-6 mr-1'>
                      <Plus color="#3B2416" strokeWidth={3}/>
                    </div>
                  </div>
                  <p className="mr-5 font-bold text-primer">Rp {formatPrice(item.harga)}</p>
                </div>

              </div>
            </div>
          </div>
        ))} 
      </div>

      <div className="bg-back w-full text-black rounded-t-xl border-2 border-primer h-30 fixed bottom-20">
        <div className="dropdown w-full">
          <div tabIndex={0} role="button" className="btn w-[95%] rounded-full border-2 border-primer text-primer bg-back">nama meja</div>
          <ul tabIndex="-1" className="dropdown-content menu bg-sekunder rounded-box z-1 w-52 p-2 shadow-sm">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
        <p>Rp {formatPrice(TotalPrice)}</p>
      </div> 
      
      {alert && 
      <div className="toast toast-start toast-middle">
        <div className="alert alert-info">
          <span>Nama Harus Diisi</span>
        </div>
      </div>
      }
    </div>
  );
}
export default Keranjang