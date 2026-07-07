import Carding from "../../component/card"
import Carouselbut from "../../component/carousel-button"
import Header from "../../component/Header"
import ListMenu from "../../component/ListMenu"
const api = process.env.BASE_API;
const Home = async() => {
  const data = await fetch(`${api}/menu`)
  const posts = await data.json()
  return(
    <div className="bg-back h-full">
      <Header data={posts}/>
      <Carouselbut data={posts}/>
      <ListMenu data={posts}/>
      <div className="w-full h-25 bg-transparent"></div>
    </div>
  )
}
export default Home