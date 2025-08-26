


import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import Item from "./Item"



function Cart() {

    const { cartItems, deleteItem, setCartItems } = useContext(CartContext)
    const [showConfirm, setShowConfirm] = useState(false)



    return (
        <>
            <div className={showConfirm ? 'splash-screen show' : 'splash-screen'}
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        setShowConfirm(false)
                    }
                }}
            >
                <div className="confirm-screen">
                    <img src="src\assets\images\icon-order-confirmed.svg" alt="" />
                    <div className="title">
                        <h3>order confirmed</h3>
                        <p className="enjoy">we hope you enjoy your food</p>
                    </div>
                    <div className="order-list">
                        {
                            cartItems.map(el => {
                                const { name, price, amount, image } = el
                                return (
                                    <div className="item" key={name}>
                                        <img src={image.thumbnail} alt="" />
                                        <div className="info">
                                            <div className="name">{name}</div>
                                            <div className="qty-price">
                                                <p className="qty">
                                                    <span>{amount}</span>
                                                    x
                                                </p>
                                                <p className="price">
                                                    $<span>{price.toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="total">
                                            <span className="total">${(amount * price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ) //return
                            }) //map
                        }

                        <div className="order-total">
                            <p>order total</p>
                            <h3>${cartItems.reduce((acc, item) => {
                                const total = acc + item.amount * item.price;
                                return total
                            }, 0).toFixed(2)
                            }</h3>
                        </div>

                        <button className="confirm-order start"
                            onClick={() => {
                                setCartItems([])
                                setShowConfirm(false)
                            }}
                        >
                            start new order
                        </button>






                    </div>
                </div>
            </div>



            <div id="cart">
                <div className="title">
                    <h2>
                        your cart
                        <span className="amount">({cartItems.length})</span>
                    </h2>
                </div>

                {(cartItems.length > 0) ?
                    <>
                        {
                            cartItems.map(el => {
                                const { name, price, amount } = el

                                return (
                                    <div className="item" key={name}>
                                        <div className="info">
                                            <div className="name">
                                                {name}
                                            </div>
                                            <div className="price">
                                                <div className="quantity">
                                                    <span>{amount}</span>
                                                    x
                                                </div>
                                                <div className="calc">
                                                    <span className="single">@ {price.toFixed(2)}</span>
                                                    <span className="total">${(amount * price).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="delete"
                                            onClick={() => {
                                                deleteItem(el)
                                            }}
                                        >
                                            <img src="src\assets\images\icon-remove-item.svg" alt="" />
                                        </button>
                                    </div>
                                ) //return
                            }) //map
                        }
                        <div className="order-total">
                            <p>order total</p>
                            <h3>${cartItems.reduce((acc, item) => {
                                const total = acc + item.amount * item.price;
                                return total
                            }, 0).toFixed(2)
                            }</h3>
                        </div>
                        <div className="delivery">
                            <img src="src\assets\images\icon-carbon-neutral.svg" alt="" />
                            this is a <span>carbon-neutral</span>delivery
                        </div>

                        <button className="confirm-order"
                            onClick={() => {
                                setShowConfirm(true)
                            }}
                        >
                            confirm order
                        </button>
                    </>



                    :
                    <div className="empty">
                        <img src="src\assets\images\illustration-empty-cart.svg" alt="" />
                        <p>your added items will appear here</p>
                    </div>
                }
            </div >
        </>
    )
}
export default Cart