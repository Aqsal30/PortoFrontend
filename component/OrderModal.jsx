"use client"

import { formatPrice } from "@/app/utils/FormatPrice"
import { ArrowLeft, Minus, Plus } from "lucide-react"
import { useState } from "react"
import useModalStore from './CartStorage';
const OrderModal = ({ref, data}) => {

  const cup = ["Small", "Regular", "Large"]
  const ice = ["Less", "Regular", "More"]
  const sugar = ["Less", "Regular", "More"]
  
  const [cups, setCups] = useState(cup[0]) 
  const [ices, setIce] = useState(ice[0]) 
  const [sugars, setSugar] = useState(sugar[0]) 
    const [notes, setNotes] = useState("")
    const [qty, setQty] = useState(1)
    const cart = useModalStore(
      (state) => state.addToCart
    )
    const Order = (data) => {
      const id = crypto.randomUUID();
      cart({id:id, menu_id:data.menu_id, name:data.nama_menu, quantity:qty, harga:data.harga, img:data.img_url, option: {
        cup:cups, ice:ices, sugar:sugars}, note:notes}
      )
      ref.current.close()
    }
    return(
      <>
      <dialog ref={ref} className="modal">
        <div className="w-full min-h-dvh flex flex-col bg-back mb-50 text-black">
          <div className='w-full h-60 bg-white'>
            <img src={data.img_url} className="w-full h-full object-contain"/>
            <form method="dialog">
              <button className="btn btn-circle size-10 text-white bg-primer border-1 border-sekunder absolute top-2 left-2"><ArrowLeft/></button>
            </form>
          </div>
          <div className='w-full flex-1 flex flex-col'>
              <div className='w-full flex-1 flex items-center'><p className='ml-2 font-bold'>{data.nama_menu}</p></div>
              <div className='w-full flex-1 flex justify-between items-center'>
                <p className='ml-2'>{data.deskripsi_singkat}</p>
                <p className='mr-2 font-bold text-primer'>Rp {formatPrice(data.harga)}</p>
            </div>

            <div className="w-full flex-5 flex flex-col">  
              <div className='w-full flex-1'>
                <p className='ml-2 mb-5 font-bold'>Cup Size</p>
                <div className='flex justify-around'>
                  {cup.map((item) => (
                    <label key={item} className={`btn rounded-full w-30 
                      ${cups === item ?
                      "bg-primer text-white":
                      "bg-white text-black"
                     }`}>
                      <input type="radio" className="hidden" checked={cups === item} onChange={(e) => setCups(e.target.value)} value={item}/>
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className='w-full flex-1'>
                <p className='ml-2 mb-5 font-bold'>Ice Level</p>
                <div className='flex justify-around'>
                  {ice.map((item) => (
                    <label key={item} className={`btn rounded-full w-30 
                      ${ices === item ?
                      "bg-primer text-white":
                      "bg-white text-black"
                     }`}>
                      <input type="radio" className="hidden" checked={ices === item} onChange={(e) => setIce(e.target.value)} value={item}/>
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className='w-full flex-1'>
                <p className='ml-2 mb-5 font-bold'>Sugar Level</p>
                <div className='flex justify-around'>
                  {sugar.map((item) => (
                    <label key={item} className={`btn rounded-full w-30 
                      ${sugars === item ?
                      "bg-primer text-white":
                      "bg-white text-black"
                     }`}>
                      <input type="radio" className="hidden" checked={sugars === item} onChange={(e) => setSugar(e.target.value)} value={item}/>
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex-3 flex flex-col">
              <div className='w-full flex-1 grid shadow-xl'>
                <p className='mt-2 ml-2 font-bold text-black'>Notes</p>
                <input className='w-[95%] justify-self-center border-2 border-primer rounded-full h-8 pl-5 focus:outline-none' placeholder='Add note' onChange={(e)=> setNotes(e.target.value)}/>
              </div>
              <div className="flex-1 flex justify-between items-end">
                <div className="w-[35%] h-10 bg-primer text-primer font-bold rounded-full flex items-center justify-between">
                  <button className="btn btn-circle size-9 ml-1 flex justify-center items-center" onClick={()=> setQty((e)=>Math.max(1, e - 1))}><Minus/></button>
                  <p className="font-bold text-white">{qty}</p>
                  <button className="btn btn-circle size-9 mr-1 flex justify-center items-center" onClick={()=> setQty((e)=>e+1)}><Plus/></button>
                </div>
                <button className="btn w-[50%] h-10 rounded-full bg-primer border-sekunder" onClick={() => Order(data)}>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      </>
    )

}
export default OrderModal