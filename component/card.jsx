'use client'
import useCartStore from './Carting';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { formatPrice } from '@/app/utils/FormatPrice';
import Modal from './ModalCart';
const Carding = ({data}) => {
    const [alert, setAlert] = useState(false)
    const modalref = useRef(null);
    const id = crypto.randomUUID()
    const cart = useCartStore(
      (state) => state.addToCart
    )
    const Pesan = (event, data) => {
      cart({id:id, menu_id:data.menu_id, desc:data.deskripsi_singkat, name:data.nama_menu, quantity:1, harga:data.harga, option:{
        cup:"regular", ice:"regular", sugar:"regular"
      }, note:""})
      event.stopPropagation()
      setAlert(true); 

      setTimeout(()=>{
        setAlert(false);

      }, 2000)
    }

    return(
        <div className=" mt-3 text-black">
          <div className="card items-center" onClick={() => modalref.current.showModal(data)}>
            <img
              src="/image/americano.png"
              alt="Shoes"
              className='w-35 h-30 object-cover rounded-t-md aspect-square'/>
            <div className="w-35 h-20 flex flex-col bg-back shadow-2xl rounded-b-md " >
              <div className='w-full h-12 flex flex-col '>
                <p className="text-[12px] font-sans font-bold ml-2">{data.nama_menu}</p>
                <p className="text-[10px] font-sans font-semibold ml-2">{data.deskripsi_singkat}</p>
              </div>
              <div className='w-full h-8 flex flex-row rounded-b-md justify-between items-center'>
                <p className="text-[12px] font ml-2">Rp {formatPrice(data.harga)}</p>
                <button className="btn size-5 mr-2 bg-primer text-back flex justify-center items-center" onClick={(e)=>Pesan(e,data)}> + </button>
              </div>
            </div>
          </div>

          <Modal data={data} ref={modalref} />

          {alert && 
            <div className="toast toast-top toast-center w-full absolute z-10">
              <div className="alert alert-success ">
                <span>Berhasil Ditambahkan</span>
              </div>
            </div>
            
          }
          </div>   
          
    )
}
export default Carding;