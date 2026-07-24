"use client"

import { useEffect, useState } from "react"

const api = process.env.NEXT_PUBLIC_BASE_API;
const coba = () => {
  const [menus, setMenus] = useState([])
  const [select, setSelect] = useState()
  const [file, setFile] = useState(null);
  useEffect(()=>{
      async function menu() {
        try{
          const data = await fetch(`${api}/menu`);
          const posts = await data.json();
          setMenus(posts)
        }catch(err){
          console.log(err)
        }
      }
      menu()
    },[])


  const handler = async() => {

    if (!select) {
        alert("Select a menu");
        return;
    }

    if (!file) {
        alert("Select an image");
        return;
    }

    const formData = new FormData();

    formData.append("menu_id", select);
    formData.append("image", file);

    try {

        const res = await fetch(`${api}/menu/image`, {
            method: "PUT",
            body: formData
        });

        const data = await res.json();

        console.log(data);

    } catch (err) {

        console.log(err);

    }
}
  return(
    <div className="bg-primer w-full min-h-dvh">
      <select value={select} onChange={(e)=>setSelect(e.target.value)}>
        <option value="">Menu</option>
        {menus.map((res)=>(
          <option className="text-black" key={res.menu_id}value={res.menu_id}>{res.nama_menu}</option>
        ))}
      </select>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
      <button onClick={handler} className="btn">submit</button>
    </div> 
  )
}

export default coba