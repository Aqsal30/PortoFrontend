'use client'
import { useEffect, useState } from "react";
import Carding from "../../component/card"
import Carouselbut from "../../component/carousel-button"
import Header from "../../component/Header"
import ListMenu from "../../component/ListMenu"
import Loadingskeleton from "../../component/Loadingskeleton";
const api = process.env.NEXT_PUBLIC_BASE_API;
const Home = () => {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    async function menu() {
      setLoading(true)
      const data = await fetch(`${api}/menu`);
      const posts = await data.json();
      
      setMenus(posts)
      setLoading(false)
    }
    menu()
  },[])
  
  return(
    <div className="bg-back min-h-dvh">
      {loading && <Loadingskeleton/>}
      <Header data={menus}/>
      <Carouselbut data={menus}/>
      <ListMenu data={menus}/>
      <div className="w-full h-25 bg-transparent"></div>
    </div>
  )
}
export default Home