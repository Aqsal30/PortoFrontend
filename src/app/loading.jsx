export default function Loading() {
  return (
  <div className="w-full flex flex-col h-dvh bg-back">
    <div className="w-full h-[100px]"></div>
    <div className="sticky top-[100px] z-5 flex overflow-x-auto gap-2 p-3 justify-around scrollbar-none">
         {Array.from({ length: 6 }).map((_, i) => (
            <button key={i} className="btn bg-transparent shadow-none border-0 flex-none"></button>
         ))}
      </div>
    <div className="w-full flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">         
    {Array.from({ length: 6 }).map((_, i) => (
        <div  key={i} className="mt-3 card items-center">
          <div className='animate-pulse bg-gray-600 rounded-md size-35 rounded-t-md'/>
          <div className="w-35 h-20 flex flex-col rounded-b-md " >
            <div className='w-full h-12 flex flex-col '>
              <div className="animate-pulse bg-gray-600 rounded-md h-4 w-20 ml-2 mb-2 mt-2"></div>
              <div className="animate-pulse bg-gray-600 rounded-md h-3 w-30 ml-2"></div>
            </div>
            <div className='w-full h-8 flex flex-row rounded-b-md justify-between items-center'>
              <p className="animate-pulse bg-gray-600 rounded-md h-3 w-25 ml-2"></p>
              <div className="animate-pulse bg-gray-600 rounded-md border-0 btn btn-square size-5 mr-2"/>
            </div>
          </div>
        </div>
    ))}
    </div>
  </div>
);
}