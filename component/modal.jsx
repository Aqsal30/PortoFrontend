"use client"

import { formatPrice } from "@/app/utils/FormatPrice"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

const modal = ({ref, data}) => {
    
    const [cups, setCups] = useState("") 
    const [ices, setIce] = useState("") 
    const [sugars, setSugar] = useState("") 

    const cup = ["Small", "Regular", "Large"]
    const ice = ["Less", "Regular", "More"]
    const sugar = ["Less", "Regular", "More"]


    console.log(cups)
    console.log(ices)
    console.log(sugars)

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
            <div className='w-full h-15 flex items-center'><p className='ml-2'>{data.nama_menu}</p></div>
            
            <div className='w-full h-15 flex justify-between items-center'>
              <p className='ml-2'>{data.deskripsi_singkat}</p>
              <p className='mr-2'>Rp {formatPrice(data.harga)}</p>
            </div>

            <div className='w-full h-25'>
              <p className='ml-2 mb-5'>Cup Size</p>
              <div className='flex justify-around'>
                {cup.map((item) => (
                  <label key={item} className={`btn rounded-full w-30 
                    ${cups === item ?
                    "":
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
                    "":
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
                    "":
                    "bg-white text-black"
                   }`}>
                    <input type="radio" className="hidden" checked={sugars === item} onChange={(e) => setSugar(e.target.value)} value={item}/>
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className='w-full h-25 flex flex-col'>
              <p className='mt-2 ml-2'>Note</p>
              <input className='w-[95%] border-2 rounded-full h-8 pl-5 focus:outline-none' placeholder='Add note'></input>
            </div>
            
          </div>
        </div>
      </dialog>
      </>
    )

}
export default modal