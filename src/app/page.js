import Carouselbut from "../../component/carousel-button"
import Header from "../../component/Header"
import ListMenu from "../../component/ListMenu"
import Loadingskeleton from "../../component/Loadingskeleton";
const api = process.env.NEXT_PUBLIC_BASE_API;

export default async function Home(){
    const data = await fetch(`${api}/menu`);
    const menus = await data.json();
  
  return(
    <div className="bg-back min-h-dvh">
      <Header data={menus}/>
      <Carouselbut data={menus}/>
      <ListMenu data={menus}/>
      <div className="w-full h-25 bg-transparent"></div>
    </div>
  )
}