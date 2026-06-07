"use client"
import Carding from "./card"
import useMenuStore from "./carousel"
const ListMenu = ({data}) => {
  const category =
    useMenuStore((state) => state.category)

  const filteredPosts = data.filter(
    item => item.jenis === category
  )
  console.log(category)
    return(

        <div className="w-full h-full grid grid-cols-2 gap-5">
        {filteredPosts.map((item) =>(
            <Carding key={item.menu_id} data={item}/>
        ))
        }
      </div>
    )
}
export default ListMenu