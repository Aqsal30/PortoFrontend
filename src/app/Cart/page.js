"use client";

import { useState } from "react";
import useCartStore from "../utils/CartStorage";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "../utils/FormatPrice";
import { useRouter } from "next/navigation";
import Loadingpage from "../../../component/OrderLoading";
import Image from "next/image";
const api = process.env.NEXT_PUBLIC_BASE_API;

const Keranjang = () => {
  const [nama,setNama] = useState('')
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const [select, setSelect] = useState({})
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
          console.log(error)
        }finally{
          setLoading(false)
        }
      }
    
  };
  return (
    <div className="bg-back w-full h-dvh flex flex-col items-center">
      {loading && <Loadingpage/>}
      <div className="w-full sticky top-0 h-15 bg-primer z-10 flex justify-center items-center relative">
        <Link className="absolute left-3 btn btn-circle bg-white border-1 border-sekunder text-sekunder" href={"/"} prefetch={false}><ArrowLeft/></Link>
        <p className="font-bold ">Cart</p>
      </div>
      <div className="w-full h-full overflow-auto mb-40 text-primer">
        {cart.length > 0 ? (
          <div className="w-full h-full">
          {cart.map((item, index) => (
              <div key={item.menu_id} className='w-full min-h-45 bg-back flex flex-row justify-center border-b-2 border-primer'>
                <div className='w-[30%] flex justify-center items-center m-2'>
                  <Image
                   src={item.img} 
                   height={100}
                   width={100}
                   sizes="100px"
                   priority={index === 0}
                   className='size-30 rounded-3xl aspect-square object-cover'
                   alt='Coffee' />
                </div>

                <div className='w-[70%] relative pt-2 flex flex-col'>
                  <button className="absolute right-2 btn btn-square bg-sekunder text-primer border-primer size-8 rounded-md" onClick={()=>removeFromCart(item.id)}><Trash2/></button>
                  <div className="w-full flex flex-col">
                    <p className='font-bold text-black'>{item.name}</p>
                    <p className="font-semibold text-black">{item.desc}</p>
                    {Object.values(item.option).map((data)=>(
                      <div className="flex justify-between mr-3">
                        <p className="text-gray-400">{data.label}</p>
                        <p className="text-gray-400">{data.value}</p>
                      </div>

                    ))}
                  </div>
                  <div className="w-full flex-2 mt-3 flex flex-row justify-between items-center">
                    <div className='w-30 h-9 bg-sekunder border-2 border-back rounded-full flex justify-between items-center text-back'>
                      <div className='btn btn-circle bg-back text-black size-6 ml-1' onClick={() => decreaseQuantity(item.id)}>
                       <Minus strokeWidth={3}/>
                      </div>
                      <p className="text-white font-bold">{item.quantity}</p>
                      <div className='btn btn-circle bg-back size-6 mr-1' onClick={() => increaseQuantity(item.id)}>
                        <Plus color="#2563EB" strokeWidth={3}/>
                      </div>
                    </div>
                    <p className="mr-3 font-bold text-primer">Rp {formatPrice(item.harga * item.quantity)}</p>
                  </div>
                </div>
              </div>
          ))}
          </div> 
        ):
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p>Belum Memilih Menu?</p>
            <p>Silahkan Kembali ke halaman Menu</p>
            <p>Menu Favorit Minggu Ini</p>
          </div>
        }
      </div>

      <div className="z-10 w-full flex flex-col justify-between text-black rounded-t-xl border-2 border-primer h-40 fixed bottom-0">
        <label className="text-md font-bold mt-2 ml-1">Nama Pemesan</label>
        <input type="text" placeholder="Masukkan Nama Pemesan" className="w-[90%] ml-1 mt-1 pl-2 h-10 border-1 border-primer rounded-xl" onChange={(e) => setNama(e.target.value)}/>
        <p className="self-end mr-2 font-bold text-primer">Rp {formatPrice(TotalPrice)}</p>
        <button className="btn w-full h-10 bg-primer border-0" onClick={handler}>Checkout</button>
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