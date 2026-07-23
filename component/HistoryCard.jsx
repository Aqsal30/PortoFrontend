"use client"

import { formatPrice } from "@/app/utils/FormatPrice"
import { ArrowRight, Check, Clock } from "lucide-react"
import { useRef, useState } from "react"
import Modal from "./ModalComponent"

const HistoryCard = ({data}) => {
  const [open, setopen] = useState(false)
  return(
    <>
    <div className="w-[90%] h-40 bg-primer border-2 border-black flex flex-col px-1 py-1 mb-2 rounded-xl"  onClick={()=>setopen(true)}>
      <div className="flex-1 flex justify-between">
        <div className="flex items-center">
          {data.status === "Pending" ?    
          <>
            <div className="size-5 bg-orange-500">
            <Clock size={20}/>
            </div>
            <p>{data.status}</p>
          </>
          :
          <>
            <div className="size-5 bg-green-500">
            <Check size={20}/>
            </div>
            <p>{data.status}</p>
          </>
          }
        </div>
        <p>Rp.{formatPrice(data.total)}</p>
      </div>
      <div className="flex-1 ">
        <p>{data.Created_at}</p>
      </div>
      <div className="flex-1 ">
        {data.detail.slice(0,2).map((res)=>(
          <p>{res.nama_menu}</p>
        ))}
        {data.detail.length > 2 && 
        <p> {data.detail.length - 2} more items...</p>
      }
      </div>
      <div className="flex-1 flex justify-end">
        <p>View Detail </p>
        <ArrowRight />
      </div>
    </div>
    <Modal data={data} open={open} close={()=>setopen(false)}/>
    </>

    
    )
}

export default HistoryCard