"use client"

import { formatPrice } from "@/app/utils/FormatPrice"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import useModalStore from './Carting';
const modal = ({ref, data}) => {

    const id = crypto.randomUUID();
    const cup = ["Small", "Regular", "Large"]
    const ice = ["Less", "Regular", "More"]
    const sugar = ["Less", "Regular", "More"]
    
    const [cups, setCups] = useState(cup[0]) 
    const [ices, setIce] = useState(ice[0]) 
    const [sugars, setSugar] = useState(sugar[0]) 
    const [notes, setNotes] = useState("")
    const cart = useModalStore(
      (state) => state.addToCart
    )
    const Order = (data) => {
      cart({id:id, menu_id:data.menu_id, name:data.nama_menu, quantity:1, harga:data.harga, option: {
        cup:cups, ice:ices, sugar:sugars}, note:notes}
      )
      ref.current.close()
    }

    return(
      <>
      <dialog ref={ref} className="modal">
        <div className="w-full h-screen bg-back mb-50">
          <div className='w-full h-80 bg-white'>
            <img src="/image/americano.png" className="w-full h-full object-contain" />
            <form method="dialog">
              <button className="btn btn-circle size-10 text-black bg-transparent border-1 border-black absolute top-2 left-2"><ArrowLeft/></button>
            </form>
          </div>
          <div className='w-full flex flex-col'>
            <div className='w-full h-10 flex items-center'><p className='ml-2 font-bold'>{data.nama_menu}</p></div>
            
            <div className='w-full h-10 flex justify-between items-center'>
              <p className='ml-2'>{data.deskripsi_singkat}</p>
              <p className='mr-2 font-bold text-primer'>Rp {formatPrice(data.harga)}</p>
            </div>

            <div className='w-full h-25'>
              <p className='ml-2 mb-5'>Cup Size</p>
              <div className='flex justify-around'>
                {cup.map((item) => (
                  <label key={item} className={`btn rounded-full w-30 
                    ${cups === item ?
                    "bg-black text-white":
                    "bg-white text-black"
                   }`}>
                    <input type="radio" className="hidden" checked={cups === item} onChange={(e) => setCups(e.target.value)} value={item}/>
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className='w-full h-25'>
              <p className='ml-2 mb-5'>Ice Level</p>
              <div className='flex justify-around'>
                {ice.map((item) => (
                  <label key={item} className={`btn rounded-full w-30 
                    ${ices === item ?
                    "bg-black text-white":
                    "bg-white text-black"
                   }`}>
                    <input type="radio" className="hidden" checked={ices === item} onChange={(e) => setIce(e.target.value)} value={item}/>
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className='w-full h-25'>
              <p className='ml-2 mb-5'>Sugar Level</p>
              <div className='flex justify-around'>
                {sugar.map((item) => (
                  <label key={item} className={`btn rounded-full w-30 
                    ${sugars === item ?
                    "bg-black text-white":
                    "bg-white text-black"
                   }`}>
                    <input type="radio" className="hidden" checked={sugars === item} onChange={(e) => setSugar(e.target.value)} value={item}/>
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className='w-full h-20 flex flex-col'>
              <p className='mt-2 ml-2'>Note</p>
              <input className='w-[95%] border-2 rounded-full h-8 pl-5 focus:outline-none' placeholder='Add note' onChange={(e)=> setNotes(e.target.value)}/>
            </div>
            
            <button className="btn w-full h-10 rounded-full" onClick={() => Order(data)}>Add to cart</button>

          </div>
        </div>
      </dialog>
      </>
    )

}
export default modal