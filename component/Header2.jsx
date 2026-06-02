'use client'
import { useEffect, useRef, useState } from "react";
import { Coffee } from 'lucide-react';

const Header2 = ({data}) => {
  const [scrollY, setScrollY] = useState(0);
  const [minimum, setminimum] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial and minimum values
  const maxHeight = 200;
  const minHeight = 60;

  // Shrink by 0.5px for every 1px scroll
  const currentHeight = minimum
  ? minHeight
  :
  Math.max(minHeight,  maxHeight - scrollY);
  const [isClick, setIsClick] = useState(false)
  const [cari, setcari] = useState('')
  const isRef = useRef(null)
  useEffect(()=>{
    if (isClick){
      isRef.current?.focus()
      setcari('')
    }
  }, [isClick]);
  const handler = (data) =>{
    setIsClick(!isClick)
    setScrollY(data)
  }
  return (
      <div
        className="sticky top-0 z-50 bg-white shadow transition-[height]"
        style={{
          height: `${currentHeight}px`,
        }}
      >
        <div className={`h-full flex ${scrollY >= 100 ? "flex-row" : "flex-col"} text-black items-center justify-center`}>
          {scrollY >= 100 ?
          <Coffee />
          :
          <p>bab8afkafjhaksfahsfkafhkfahfshk</p>
          }
          <input ref={isRef} className='input w-full' placeholder='Cari Apa...' onClick={()=>handler(100)} onChange={(e) => setcari(e.target.value)}/>
        </div>
        {isClick &&
        <div className='absolute bg-black/90 h-screen w-full' onClick={()=>handler(0)}>
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