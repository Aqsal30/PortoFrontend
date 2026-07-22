"use client";

import { useState } from "react";
import useCartStore from "../../../component/Carting";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "../utils/FormatPrice";
import { useRouter } from "next/navigation";
import Loadingpage from "../../../component/Loadingpage";
const api = process.env.NEXT_PUBLIC_BASE_API;

const Keranjang = () => {
  const [nama,setNama] = useState('')
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();
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
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  )
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  )
  const clearCart = useCartStore(
    (state) => state.clearCart
  )
  const savedOrder = useCartStore(
    (state) => state.savedOrder
  )
  const handler = async() => {
      if (!nama){
        setAlert(true)
        setTimeout(()=>{
          setAlert(false);
        
        }, 2000)
      }else{
        try{
          setLoading(true)
          const res = await fetch(`${api}/order/orderpost`, {
            method: "POST", 
            headers: {"Content-Type": "application/json",}, 
            body: JSON.stringify({data:cart, nama})

          });
          const data = await res.json()
          savedOrder(data.orderId)
          clearCart()

          router.push("/")
        }catch(error){
          alert(error.message)
        }finally{
          setLoading(false)
        }
      }
    
  };

  const handle = () => {
    console.log(cart)
  }

  return (
    <div className="bg-back w-full h-full flex flex-col items-center">
      {loading && <Loadingpage/>}
      <div className="w-full sticky top-0 h-10 bg-primer z-10 flex items-center">
        <Link href={"/"} prefetch={false}><ArrowLeft /></Link>
        <p>Cart</p>
      </div>
      <div className="w-full text-primer mb-50">
        {cart.map((item) => (
          <div key={item.id}>
            
            <div className='w-full h-40 bg-back flex flex-row justify-center border-b-2 border-primer'>
              
              <div className='w-[30%] flex justify-center items-center m-2'>
                <img className='size-25 rounded-3xl' src='/image/latte.png' alt='Coffee' />
              </div>

              <div className='w-[65%] pt-2 flex flex-col'>
                <button className="absolute right-2 btn btn-square size-8 rounded-md" onClick={()=>removeFromCart(item.id)}><Trash2/></button>
                <div className="w-full h-[70%] flex flex-col">
                  <p className='font-bold text-black'>{item.name}</p>
                  <p className="text-gray">Espresso description</p>
                </div>
                
                <div className="w-full h-[30%] flex flex-row justify-between items-center">
                  <div className='w-30 h-9 bg-tersier border-2 border-back rounded-full flex justify-between items-center text-back'>
                    <div className='btn btn-circle bg-back size-6 ml-1' onClick={() => decreaseQuantity(item.id)}>
                     <Minus color="#000" strokeWidth={3}/>
                    </div>
                    <p className="text-black font-bold">{item.quantity}</p>
                    <div className='btn btn-circle bg-back size-6 mr-1' onClick={() => increaseQuantity(item.id)}>
                      <Plus color="#2563EB" strokeWidth={3}/>
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
        <label className="text-md font-bold mt-2 ml-1">Nama Pemesan</label>
        <input type="text" placeholder="Masukkan Nama Pemesan" className="w-[90%] ml-1 mt-1 pl-2 h-10 border-1 border-primer rounded-xl" onChange={(e) => setNama(e.target.value)}/>
        <p className="absolute right-2 bottom-1 font-bold text-primer">Rp {formatPrice(TotalPrice)}</p>
      </div> 

      <div className="fixed z-50 bottom-0 left-0 w-full h-20 bg-back">
        <button className="btn w-full h-10 bg-primer" onClick={handler}>Checkout</button>
      </div>
      
      {alert && 
      <div className="toast toast-top toast-center w-90 rounded-full z-50 bg-red-600 text-black">
        <div className="alert alert-info rounded-full">
          <span>Nama Harus Diisi</span>
        </div>
      </div>
      }
    </div>
  );
}
export default Keranjang