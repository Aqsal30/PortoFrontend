'use client'
import {useRef, useState } from "react";
import {Search,Plus} from 'lucide-react';
import Image from "next/image";
import { formatPrice } from "@/app/utils/FormatPrice";
const Header = ({data}) => {
  const [shrink, setshrink] = useState(false);
  const [cari, setcari] = useState('')
  const isRef = useRef(null)
  const keyword = cari.toLowerCase()
  const filteredMenu = data.filter(item =>keyword && item.nama_menu.toLowerCase().includes(keyword))
  return (
      <div className="sticky top-0 z-10 w-full h-[100px]">
        <div className="h-full bg-white flex text-black flex-col items-center justify-end"
          >
          <p>Selamat Datang</p>
          <label className="input bg-primer text-white font-bold w-full">
            <Search size={15}/>
            <input type="search" required ref={isRef} placeholder="cari menu disini..." value={cari} onClick={()=>{if(!shrink){setshrink(true)}}} onChange={(e) => setcari(e.target.value)}/>
          </label>
        </div>
        {shrink &&
        <div className='absolute bg-white overflow-auto min-h-dvh w-full flex flex-col items-center' onClick={()=>setshrink(false)}>
          {keyword == "" ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold">Ketik Untuk Mencari Menu</p>
          </div>
          ): filteredMenu.length > 0 ?(
          <>
            {filteredMenu.map(item => (
              <div className='w-[97%] h-40 border-b-2 border-primer flex' key={item.menu_id}>
                <div className="flex-6 flex flex-col mt-2">
                  <p className='text-black font-bold'>{item.nama_menu}</p>
                  <p className='text-black'>{item.deskripsi_singkat}</p>
                  <p className='mt-auto text-primer font-bold'>Rp {formatPrice(item.harga)}</p>
                </div>
                <div className="mt-2 flex-3 flex flex-col justify-center items-center">
                <Image 
                  src={item.img_url}
                  alt="item"
                  height={100}
                  width={100}
                  className="aspect-square size-25 rounded-xl object-cover"
                />
                <button className='btn bg-white w-23 z-10 -translate-y-2 rounded-full border-2 border-primer text-primer'>Tambah</button>
                </div>
              </div>
            ))}
          </>
          ):(
          <p> Menu Tidak Tersedia</p>)}
        </div>
        }
      </div>
      
  );
}
export default Header