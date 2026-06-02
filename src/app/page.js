import Carding from "../../component/card"
import Header from "../../component/Header"
import Header2 from "../../component/Header2"
const Home = async() => {
  const data = await fetch("https://porto-backend-silk.vercel.app/menu")
  const posts = await data.json()
  
  return(
    <div className="bg-[url('/bg.png')] bg-cover bg-center h-full">
      <Header2 data={posts}/>
      <div className="flex justify-center items-center mb-4 h-2 w-full text-blue-500"></div>
      <div className="flex justify-center items-center mb-4 border-dashed border-b-4 h-8 w-full text-blue-500"><p>Makanan</p></div>
      <div className="w-full h-full grid grid-cols-2 gap-5">
        {posts.filter(data => data.jenis === "Food").map((data) =>(
            <Carding key={data.menu_id} data={data}/>
        ))
        }
      </div>
      <div className="flex justify-center items-center mt-4 mb-4 border-dashed border-b-4 h-8 w-full text-blue-500"><p>Minuman</p></div>
      <div className="w-full h-full grid grid-cols-2 gap-5">
        {posts.filter(data => data.jenis === "Drink").map((data) => (
          <Carding key={data.menu_id} data={data}/>
        ))}
      </div>
    </div>
  )
}
export default Home