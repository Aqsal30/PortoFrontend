'use client'
import {ArrowDown, ArrowLeft} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { formatPrice } from '@/app/utils/FormatPrice';
const HistoryModal = ({data, open, close}) => {
  const scrollRef = useRef(null);
      const [canScroll, setCanScroll] = useState(false);
      const [hasScrolled, setHasScrolled] = useState(false);
  
      useEffect(() => {
          if (!scrollRef.current) return;
  
          const { scrollHeight, clientHeight } = scrollRef.current;
  
          setCanScroll(scrollHeight > clientHeight);
  
          // Reset every time a new order opens
          setHasScrolled(false);
      }, [data]);
  
      const handleScroll = () => {
          if (!scrollRef.current) return;
          const {scrollTop} = scrollRef.current;
          
          if (scrollTop > 20) {
            setHasScrolled(true);
          }else {
            setHasScrolled(false)
          }
      };

      const handleClose = () => {
        if(scrollRef.current){
          scrollRef.current.scrollTop = 0;
        }
        setHasScrolled(false)
        setCanScroll(false)
        close()
      }

  return(
    <div className={`fixed inset-0 z-10 flex flex-col w-full min-h-dvh transition
                  ${open
                    ?"translate-y-0 opacity-100 duration-250 ease-out"
                    :"translate-y-full opacity-0 duration-350 ease-in"
                  }
                    `}>
      <div className="flex-1"></div>

      <div className="bg-primer relative max-h-[70vh] flex flex-col rounded-t-xl">
        
        <div className="h-[60px] flex rounded-t-xl">  
          <div className='flex-1 flex items-center'>
            <button className="btn btn-circle size-10 text-back bg-transparent border-1 border-sekunder shadow-xl ml-2 mr-4" onClick={handleClose}><ArrowLeft/></button>
            <p>Order #{data.order_id}</p>
          </div>
          <div className='flex-1 flex flex-col justify-center items-end mr-2'>
            <p>Tanggal Pemesanan</p>
            <p>{data.Created_at}</p>
          </div>
        </div>

        <div ref={scrollRef} onScroll={handleScroll} className="relative max-h-[50vh] bg-back flex flex-col items-center overflow-auto">
        {data.detail.map((res)=>(
          <div key={res.nama_menu} className='w-full flex flex-col text-black border-b-2 border-primer'>
            <div className='w-full flex justify-between'>
              <p className='ml-2 font-bold text-primer'>{res.nama_menu}</p>
              <p className='font-bold text-primer mr-2'>{res.quantity}</p>
            </div>
            <p className='ml-2 font-semibold'>Cup size: {res.option.cup}</p>
            <p className='ml-2 font-semibold'>Ice Level: {res.option.ice}</p>
            <p className='ml-2 font-semibold'>Sugar Level: {res.option.sugar}</p>
            <p className='self-end mr-2 font-bold text-primer'>Rp {formatPrice(res.harga)}</p>
          </div>
        ))}
        </div>
        <div className="h-[60px] relative flex flex-col bg-back border-t-primer border-2">
          {canScroll && !hasScrolled &&(
            <div className='absolute bottom-full left-1/2 -translate-x-1/2 flex justify-center items-center animate-bounce size-8 rounded-full border-1 border-white bg-primer'>
              <ArrowDown size={35}/>
            </div>        
          )}
          <p className='font-bold text-black self-end'>Total: Rp {formatPrice(data.total)}</p>
        </div>
        
      </div>
    </div>
    )
}

export default HistoryModal;