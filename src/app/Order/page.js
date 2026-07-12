'use client'
import useCartStore from "../../../component/Carting"

const api = process.env.NEXT_PUBLIC_BASE_API
const Order = () =>{
    //const data = await fetch(`${api}/order`)
    //const posts = await data.json()
    //console.log(posts)    
    const cart = useCartStore((state)=>state.order)
    const clearorder = useCartStore(
    (state) => state.clearOrder
    )
    const iD = cart.map((item)=> item.OrderId)
    console.log(iD)
    return(
        <div className="bg-white w-full h-screen">
            <button className="btn bg-primer" onClick={()=>clearorder()}></button>
        </div>
    )
}
export default Order;