'use client'
import useCartStore from './Carting';
import { ShoppingCart } from 'lucide-react';
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
      setAlert(true);

      setTimeout(()=>{
        setAlert(false);

      }, 2000)
    }

    const tutup = () => {
      setTotal(1)
    }
    return(
        <div className="mt-3">
          <div className="card items-center">
            <img
              src="/image/americano.png"
              alt="Shoes"
              className='w-35 h-30 object-cover rounded-t-md aspect-square'/>
            <div className="w-35 h-20 flex flex-col rounded-b-md bg-blue-500" >
              <div className='w-full h-12 flex flex-col justify-around bg-red-600'>
              <p className="text-[12px] font-jakartaSans ml-2">{data.nama_menu}</p>
              <p className="text-[12px] font-jakartaSans ml-2">{data.nama_menu}</p>
              <p className="text-[12px] ml-2">{data.harga}</p>
              </div>
              <div className='w-full h-8 flex bg-green-600 justify-end items-center'>
              <button className="btn w-5 h-5 mr-2 bg-red-400" onClick={()=>{handler()}}> + </button>
              </div>
            </div>
          </div>

          <dialog ref={Open} className="modal" onClose={tutup}>
            <div className="modal-box">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
              <p>{data.nama_menu}</p>
              <p>{data.deskripsi}</p>
              <input className='input w-15' type='number' value={total} onChange={(e) => setTotal(Number(e.target.value))}></input>
              <button className='btn h-7' onClick={() => setTotal(prev => prev + 1)}>+</button>
              <button className='btn h-7' onClick={() => setTotal(prev => Math.max(1, prev - 1))}>-</button>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn" onClick={()=>Pesan(data)}>Pesan</button>
                    </form>
                  </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
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