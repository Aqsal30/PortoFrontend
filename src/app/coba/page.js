'use client'
import { useEffect, useRef, useState } from "react";
import { Coffee } from 'lucide-react';

const Coba = (data) => {
  const [scrollY, setScrollY] = useState(0);

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
  const currentHeight = Math.max(
    minHeight,
    maxHeight - scrollY
  );
  const [isClick, setIsClick] = useState(false)
  const [cari, setcari] = useState('')
  const isRef = useRef(null)
  useEffect(()=>{
    if (isClick){
      isRef.current?.focus()
      setcari('')
    }
  }, [isClick]);
  return (
    <div>
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
          <input ref={isRef} className='input w-full' placeholder='Cari Apa...' onClick={() => setIsClick(true)} onChange={(e) => setcari(e.target.value)}/>
        </div>
      </div>

      <div className="p-6 space-y-4 text-black">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded bg-gray-200"
          >
            Item {i + 1}  
            {scrollY}

          </div>
        ))}
      </div>
    </div>
  );
}
export default Coba