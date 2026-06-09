'use client'

const Coba = () => {
  return(
  <>
    <div className="card items-center">
            <img
              src="/image/americano.png"
              alt="Shoes"
              className='size-35 object-cover rounded-t-md aspect-square'/>
            <div className="w-35 h-20 flex flex-col rounded-b-md bg-blue-500" >
              <div className='w-full h-12 flex flex-col justify-around bg-red-600'>
              <p className="text-[12px] font-jakartaSans ml-2">Mie Ayam</p>
              <p className="text-[12px] ml-2">20.000</p>
              </div>
              <div className='w-full h-8 flex bg-green-600 justify-end items-center'>
              <button className="btn w-5 h-5 mr-2 bg-red-400"> + </button>
              </div>
            </div>
          </div>
    
  </>
  )
} 
export default Coba