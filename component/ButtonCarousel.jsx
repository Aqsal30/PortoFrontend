"use client";
import useMenuStore from "./CategoryCarousel"
const ButtonCarousel = ({data}) => {
  const { category, setCategory } =
    useMenuStore()
  const categories = [...new Set((data ?? []).map(item => item.jenis))]
  return(
     <div className="sticky top-[100px] bg-white z-5 flex overflow-x-auto gap-2 p-3 justify-around scrollbar-none">
         {categories.map((item)=>(
            <button key={item} className={category === item ? "btn bg-primer border-0 flex-none text-black" : "btn bg-sekunder text-white border-0 flex-none"} onClick={()=> setCategory(item)}>{item}</button>
         ))}
      </div>
      )
}
export default ButtonCarousel