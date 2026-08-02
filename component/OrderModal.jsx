"use client"

import { formatPrice } from "@/app/utils/FormatPrice"
import { ArrowLeft, Minus, Plus } from "lucide-react"
import { useState } from "react"
import useModalStore from '../src/app/utils/CartStorage';
import Image from "next/image";
const OrderModal = ({ref, data}) => { 
  const [notes, setNotes] = useState("")
  const [qty, setQty] = useState(1)
  const [select, setSelect] = useState([])

  const cart = useModalStore(
    (state) => state.addToCart
  )

  const Order = (data) => {
    cart({menu_id:data.menu_id, desc:data.deskripsi_singkat, name:data.nama_menu, quantity:qty, harga:data.harga, img:data.img_url, option:select, note:notes})
    ref.current.close()
  }
  return(
    <>
    <dialog ref={ref} className="modal">
      <div className="w-full min-h-dvh flex flex-col bg-back text-black">
        <div className='w-full h-60 bg-white'>
          <Image
           src={data.img_url} 
           alt="menu"
           width={240}
           height={240}
           className="w-full h-full object-contain"/>
          <form method="dialog">
            <button className="btn btn-circle size-10 text-white bg-primer border-1 border-sekunder absolute top-2 left-2"><ArrowLeft/></button>
          </form>
        </div>
        <div className='w-full flex-1 flex flex-col'>
          <div className="w-full flex-1 flex flex-col justify-between">
            <div className='w-full flex-1 flex items-end justify-between'>
              <p className='ml-2 font-bold flex-7'>{data.nama_menu}</p>
              <p className='mr-2 flex-2 font-bold text-primer'>Rp {formatPrice(data.harga)}</p>
            </div>
            <div className='w-full flex-1 flex items-center'>
              <p className='ml-2'>{data.deskripsi_lengkap}</p>
            </div>
            
          </div>
          <div className="w-full flex-5 gap-4 flex flex-col">
          {data.option.map((option) => (
            <div className="min-h-25 flex flex-col border-b-2 justify-around border-primer" key={option.option_id}>
              <p className="ml-2 font-bold">{option.label}</p>
              <div className="flex justify-start gap-4">
                {option.value.map((value) => (
                  <label
                  key={value}
                  className={`btn rounded-full w-30 ${
                    select[option.option_id]?.value === value
                    ? "bg-primer text-white"
                    : "bg-white text-black"
                  }`}>
                    <input
                      type="radio"
                      className="hidden"
                      checked={
                          select[option.option_id]?.value === value
                      }
                      onChange={() =>
                          setSelect(prev => ({
                              ...prev,
                              [option.option_id]:{label:option.label, value}
                          }))
                      }
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
          ))}
          </div>

          <div className="w-full flex-2 flex flex-col">
            <div className='w-full flex-1 grid shadow-xl'>
              <p className='mt-2 ml-2 font-bold text-black'>Notes</p>
              <input className='w-[95%] justify-self-center border-2 border-primer rounded-full h-8 pl-5 focus:outline-none' placeholder='Add note' onChange={(e)=> setNotes(e.target.value)}/>
            </div>
            <div className="flex-1 flex justify-between items-center">
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