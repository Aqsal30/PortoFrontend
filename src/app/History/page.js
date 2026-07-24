'use client'
import { useEffect,useState } from "react"
import useCartStore from "../../../component/CartStorage"
import HistoryCard from "../../../component/HistoryCard"
import LoadingComponent from "../../../component/LoadingComponent"
const api = process.env.NEXT_PUBLIC_BASE_API
const History = () =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const cart = useCartStore((state)=>state.order)
    const OrderIds = cart.map((item)=> item.OrderId)
    useEffect(() => {
        async function OrderHistory() {
            setLoading(true)
            const res = await fetch(`${api}/order/history`, {
                method: "POST",
                headers: {"Content-Type": "application/json",}, 
                body: JSON.stringify({OrderIds})
            })
            const posts = await res.json()
            setData(posts)
            setLoading(false)
        }
        OrderHistory()
    }, [OrderIds]);
    return(
        <div className="bg-white w-full min-h-dvh">
            <div className="w-full h-10 sticky top-0 bg-primer flex items-center">
                <p className="ml-4 font-bold">
                    Order History
                </p>
            </div>
            {loading && <LoadingComponent/>}
            <div className="w-full h-full flex flex-col justify-center items-center mt-2">
                {data.map((res)=>(
                        <HistoryCard key={res.order_id} data={res}/>
                ))}
            </div>
            <div className="h-20 w-full"></div>
        </div>
    )
}
export default History;