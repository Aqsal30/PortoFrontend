'use client'
import useCartStore from './Carting';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
const Carding = ({data}) => {
    const [select, setSelect] = useState(null);
    const [total, setTotal] = useState(1)
    const [alert, setAlert] = useState(false)
    const Open = useRef(null)
    const cart = useCartStore(
      (state) => state.addToCart
    )

    const handler = () =>{
      Open.current?.showModal()
    }
    const Pesan = (data) => {
      cart({id:data.menu_id, name:data.nama_menu, quantity:total, harga:data.harga})
      console.log(data)
      setAlert(true);

      setTimeout(()=>{
        setAlert(false);

      }, 2000)
    }

    return(
        <div className="mt-3 text-black">
          <div className="card items-center">
            <img
              src="/image/americano.png"
              alt="Shoes"
              className='w-35 h-30 object-cover rounded-t-md aspect-square'/>
            <div className="w-35 h-20 flex flex-col border-1 bg-gray-200 shadow-2xl border rounded-b-md" >
              <div className='w-full h-12 flex flex-col '>
              <p className="text-[12px] font-sans font-semibold ml-2">{data.nama_menu}</p>
              <p className="text-[10px] font-sans font-semibold ml-2">{data.deskripsi_singkat}</p>
              </div>
              <div className='w-full h-8 flex flex-row rounded-b-md justify-between items-center'>
              <p className="text-[12px] ml-2">{data.harga}</p>
              <button className="btn w-5 h-5 mr-2 bg-blue-600" onClick={()=>Pesan(data)}> + </button>
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
          </div>   
    )
}
export default Carding;