'use client'
import { useEffect, useRef, useState } from "react";
import { Coffee, Search } from 'lucide-react';

const Header2 = ({data}) => {
  const [scrollY, setScrollY] = useState(0);
  const [shrink, setshrink] = useState(false);
  const [cari, setcari] = useState('')
  const isRef = useRef(null)

  useEffect(() => {
    let ticking = false;
  
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
      
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
  
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const shrinking = scrollY >= 140 || shrink
  const fakeScroll = shrinking
    ? 140
    : scrollY;
  const fakeheight = Math.min(fakeScroll, 140)

  useEffect(()=>{
    if (shrink){
      isRef.current?.focus()
      setcari('')
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [shrink]);

  return (
      <div className="sticky top-0 z-10 w-full"
      style={{ height: `200px`, transform: `translateY(-${fakeheight}px)`}}
      >
        <div className={`h-full bg-base flex text-black 
          ${shrinking 
          ? 
          "flex-row items-end justify-center" 
          : 
          "flex-col items-center justify-end"}`
          }
          >
          {shrinking ?
          <div className="w-10 h-10 flex items-center justify-center">
            <Coffee />
          </div>
          :
          <p>Selamat Datang</p>
          }
          <label className="input bg-tersier text-black font-bold w-full">
            <Search size={15}/>
            <input type="search" required ref={isRef} placeholder="cari menu disini..." value={cari} onClick={()=>{if(!shrink){setshrink(true)}}} onChange={(e) => setcari(e.target.value)}/>
          </label>
        </div>
        {shrink &&
        <div className='absolute bg-black/90 h-screen w-full' onClick={()=>setshrink(false)}>
          {data.filter((inputs) => {return (cari !=='' && inputs.nama_menu.toLowerCase().includes(cari.toLowerCase()))}).map((data) =>(
            <div className='w-full h-20 bg-white flex' key={data.menu_id}>
            <p className='text-black bg-red-600'>{data.nama_menu}</p>
            <button className='btn text-black justify-end'>pesan</button>
            </div>
          ))}
        </div>
        }
      </div>
  );
}
export default Header2