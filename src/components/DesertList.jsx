import Item from "./Item"
import '../styles/desertlist.css'

import { CartContext } from "../context/CartContext"

function DesertList({ data }) {


    // console.log(data)
    // console.log(addCart)


    

    return (
        <div className="desert-list">
            <h1 className="header">Desserts</h1>
            <div className="list">
                <Item data={data} />
            </div>
        </div>
    )
}
export default DesertList