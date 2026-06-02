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
        <div className="bg-red-500 m-auto">
          <div className="card bg-base-100 w-40 shadow-sm">
            <button onClick={()=>document.getElementById('display').showModal()}>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </button>
            <div className="card-body flex flex-row bg-blue-500" >
              <p className="card-title text-[10px]">{data.nama_menu}</p>
              <div className="card-actions justify-end">
                <button className="btn" onClick={()=>{handler()}} ><ShoppingCart /></button>
              </div>
            </div>
          </div>

          <dialog id="display" className="modal">
            <div className="modal-box">
              <p className="py-4">Display</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          <dialog ref={Open} className="modal" onClose={tutup}>
            <div className="modal-box">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
              <p>{data.nama_menu}</p>
              <p>{data.deskripsi}</p>
              <input className='input w-15' type='number' value={total} onChange={(e) => setTotal(e.target.value)}></input>
              <button className='btn h-7' onClick={()=> setTotal(Number(total + 1))}>+</button>
              <button className='btn h-7' onClick={() => setTotal(Number(total - 1))}>-</button>
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