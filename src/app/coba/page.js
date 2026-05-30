'use client'

import useCartStore from "../../../component/Carting";

const Coba = () => {
    const cart = useCartStore(
    (state) => state.cart
    );
    const handler = async() => {
        await fetch('http://localhost:5000/posting', {
            method: "POST", 
            headers: {"Content-Type": "application/json",}, 
            body: JSON.stringify({data:cart})
        });
    };
    const handlers = () => {
        cart.map((item) => {
            console.log(item)
        })
    }
    return(
        <div>
            <button className="btn bg-red-500" onClick={handler}>click</button>
        </div>
    )
}

export default Coba;