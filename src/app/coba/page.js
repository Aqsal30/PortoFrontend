'use client'

import { useEffect, useRef, useState } from "react";
import OrderModal from "../../../component/OrderModal";

const api = process.env.NEXT_PUBLIC_BASE_API;
const coba = () => {
  const modalref = useRef(null);
  const [data, setData] = useState([])
  useEffect(()=>{
      async function menu() {
        try{
          const data = await fetch(`${api}/menu`);
          const posts = await data.json();
          setData(posts)
        }catch(err){
          console.log(err)
        }
      }
      menu()
    },[])
  return(
    <>
    {data.map((item)=>(  
      <div key={item.menu_id}>
        <button className="btn" onClick={() => modalref.current.showModal(item)}>{item.nama_menu}</button>    
        <OrderModal data={item} ref={modalref} />
      </div>
    ))}
    </>
    
  )
  
}

export default coba