'use client'
import {useRef, useState } from "react";
import {Search } from 'lucide-react';

const Header = ({data}) => {
  const [shrink, setshrink] = useState(false);
  const [cari, setcari] = useState('')
  const isRef = useRef(null)
  const keyword = cari.toLowerCase()
  const filteredMenu = data.filter(item =>keyword && item.nama_menu.toLowerCase().includes(keyword))
  return (
      <div className="sticky top-0 z-10 w-full bg-white h-[100px]">
        <div className="h-full bg-white flex text-black flex-col items-center justify-end"
          >
          <p>Selamat Datang</p>
          <label className="input bg-primer text-white font-bold w-full">
            <Search size={15}/>
            <input type="search" required ref={isRef} placeholder="cari menu disini..." value={cari} onClick={()=>{if(!shrink){setshrink(true)}}} onChange={(e) => setcari(e.target.value)}/>
          </label>
        </div>
        {shrink &&
        <div className='absolute bg-black/90 h-screen w-full' onClick={()=>setshrink(false)}>
          {keyword == "" ? (
          <p>Ketik Untuk Mencari Menu</p>
          ): filteredMenu.length > 0 ?(
          <>
            {filteredMenu.map(item => (
              <div className='w-full h-20 bg-white flex' key={item.menu_id}>
              <p className='text-black bg-red-600'>{item.nama_menu}</p>
              <button className='btn text-black justify-end'>pesan</button>
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