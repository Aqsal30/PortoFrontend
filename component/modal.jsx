"use client"

const modal = ({ref, data}) => {
    console.log(data)
    return(
      <>
      <dialog ref={ref} className="modal">
        <div className="w-full h-full text-primer mb-50">
          <div className='w-full h-60 bg-white'>
            <img src="/image/americano.png" className="w-full h-full object-contain" />
          </div>
          <div className='w-full h-full bg-primer flex flex-col'>
            <div className='w-full h-15 bg-green-300 flex items-center'><p className='ml-2'>Nama Menu</p></div>
            <div className='w-full h-15 bg-red-200 flex justify-between items-center'>
              <p className='ml-2'>Nama Menu</p>
              <p className='mr-2'>Nama Menu</p>
            </div>
            <div className='w-full h-20 bg-blue-200'>
              <p className='ml-2'>Cup Size</p>
              <div className='flex justify-around'>
                <button className='btn rounded-full w-30'>Small</button>
                <button className='btn rounded-full w-30'>Medium</button>
                <button className='btn rounded-full w-30'>large</button>
              </div>
            </div>
            <div className='w-full h-20 bg-blue-200'>
              <p className='ml-2'>Ice Level</p>
              <div className='flex justify-around'>
                <button className='btn rounded-full w-30'>30%</button>
                <button className='btn rounded-full w-30'>60</button>
                <button className='btn rounded-full w-30'>100%</button>
              </div>
            </div>
            <div className='w-full h-20 bg-blue-200'>
              <p className='ml-2'>Sugar Level</p>
              <div className='flex justify-around'>
                <button className='btn rounded-full w-30'>30%</button>
                <button className='btn rounded-full w-30'>60%</button>
                <button className='btn rounded-full w-30'>100%</button>
              </div>
            </div>
            <div className='w-full h-20 bg-red-400 flex flex-col'>
              <p className='ml-2'>Note</p>
              <input className='w-[95%] border-2 rounded-full h-8 pl-5 focus:outline-none' placeholder='Add note'></input>
            </div>
          </div>
        </div>
      </dialog>
      </>
    )

}
export default modal