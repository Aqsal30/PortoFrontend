'use client'
import useCartStore from './CartStorage';
import { Plus} from 'lucide-react';
import { useRef, useState } from 'react';
import { formatPrice } from '@/app/utils/FormatPrice';
import OrderModal from './OrderModal';
import Image from 'next/image';
const DisplayCard = ({data, index}) => {
    const [alert, setAlert] = useState(false)
    const modalref = useRef(null);
    const cart = useCartStore(
      (state) => state.addToCart
    )
    const Pesan = (event, data) => {
      cart({menu_id:data.menu_id, desc:data.deskripsi_singkat, name:data.nama_menu, quantity:1, harga:data.harga, img:data.img_url, option:{
        cup:"regular", ice:"regular", sugar:"regular"
      }, note:""})
      event.stopPropagation()
      setAlert(true); 

      setTimeout(()=>{
        setAlert(false);

      }, 2000)
    }

    return(
      <>
        <div className="mt-3 text-black">
          <div className="card items-center" onClick={() => modalref.current.showModal(data)}>
            <Image
              src={data.img_url}
              alt="food"
              width={140}
              height={140}
              sizes='140px'
              priority={index === 0}
              className='object-cover size-35 rounded-t-md border-2 border-b-0 border-primer'/>
            <div className="w-35 h-20 flex border-2 border-primer flex-col bg-back shadow-2xl rounded-b-md " >
              <div className='w-full h-12 flex flex-col '>
                <p className="text-[12px] font-sans font-bold ml-2">{data.nama_menu}</p>
                <p className="text-[10px] font-sans font-semibold ml-2">{data.deskripsi_singkat}</p>
              </div>
              <div className='w-full h-8 flex flex-row rounded-b-md justify-between items-center'>
                <p className="text-[12px] text-primer font-bold font ml-2">Rp {formatPrice(data.harga)}</p>
                <button id='AddItem' aria-label='AddItem' className="btn btn-square size-5 mr-2 bg-primer text-white border-sekunder flex justify-center items-center" onClick={(e)=>Pesan(e,data)}> <Plus/> </button>
              </div>
            </div>
          </div>


          </div>   

          {alert && 
            <div className="toast toast-top toast-center w-full absolute z-10">
              <div className="alert alert-success ">
                <span>Berhasil Ditambahkan</span>
              </div>
            </div>
            
          }
          <OrderModal data={data} ref={modalref} />
        </>
          
    )
}
export default DisplayCard;