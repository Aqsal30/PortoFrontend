'use client'
import useMenuStore from "./carousel"
const Carouselbut = ({data}) => {
  const { category, setCategory } =
    useMenuStore()
  const categories = [
    ...new Set(data.map(item => item.jenis))
  ]
  return(
     <div className="flex overflow-x-auto gap-2 p-3 justify-around scrollbar-none">
         {categories.map((item)=>(
            <button key={item} className={category === item ? "btn bg-red-400 flex-none" : "btn flex-none"} onClick={()=> setCategory(item)}>{item}</button>
         ))}
      </div>
      )
}
export default Carouselbut