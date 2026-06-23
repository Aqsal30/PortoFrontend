"use client";

import { useState } from "react";
import useCartStore from "../../../component/Carting";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
const Keranjang = () => {
  const [nama,setNama] = useState('')
  const [alert, setAlert] = useState(false)
  const cart = useCartStore(
    (state) => state.cart
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
      await fetch('https://porto-backend-silk.vercel.app/order', {
        method: "POST", 
        headers: {"Content-Type": "application/json",}, 
        body: JSON.stringify({data:cart, nama})
      });
    }
    };

  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center w-full h-full flex flex-col items-center">
      <div className="w-full sticky top-0 h-10 bg-primer z-10 flex items-center">
        <Link href={"/"}><ArrowLeft /></Link>
        <p>Cart</p>
      </div>
      <input type="text" placeholder="Masukkan Nama Pemesan" className="input mt-5 mb-3 w-[80%] rounded-xl" onChange={(e)=>setNama(e.target.value)} />
      <div className="w-[80%] text-base-100 ring-2 ring-black shadow-xl/40 border-black rounded-xl mb-50">
        {cart.map((item) => (
          <div key={item.id}>
            <div className="card card-side shadow-xl">
              <div className="card-body flex-row">
                <div className="bg-green-200 w-[70%]">
                  <p>{item.id}</p>
                </div>  
                <div className="bg-blue-200 w-[30%] card-actions justify-end">
                  <div className="w-20 h-20 bg-red-400 justify-end">
                    <img className="bg-cover"
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
                  </div>
                  <button className="btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Delete
                  </button>
                </div>  
              </div>
            </div>
          </div>
        ))} 
      </div>
      <div className="bg-sekunder w-full h-30 fixed bottom-20"></div> 
      
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