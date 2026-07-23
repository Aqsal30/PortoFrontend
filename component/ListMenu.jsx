"use client"
import Carding from "./card"
import useMenuStore from "./carousel"
const ListMenu = ({data}) => {
  const category =
    useMenuStore((state) => state.category)

  const filteredPosts = data.filter(
    item => item.jenis === category
  )
  
    return(
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {filteredPosts.map((item, index) =>(
            <Carding key={item.menu_id} data={item} index={index}/>
        ))
        }
      </div>
    )
}
export default ListMenu