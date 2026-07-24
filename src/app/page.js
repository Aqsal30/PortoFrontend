import ButtonCarousel from "../../component/ButtonCarousel"
import Header from "../../component/Header"
import ListMenu from "../../component/ListMenu"
const api = process.env.NEXT_PUBLIC_BASE_API;

export default async function Home(){
    const data = await fetch(`${api}/menu`);
    const menus = await data.json();
  
  return(
    <div className="bg-back min-h-dvh">
      <Header data={menus}/>
      <ButtonCarousel data={menus}/>
      <ListMenu data={menus}/>
      <div className="w-full h-25 bg-transparent"></div>
    </div>
  )
}