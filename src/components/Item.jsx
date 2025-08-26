/* eslint-disable no-unused-vars */
import { useRef, useState, useContext, useEffect } from 'react'
import '../styles/Item.css'

import { CartContext } from '../context/CartContext'

function Item({ data }) {

    const { addToCart, cartItems, setCartItems, handleQty } = useContext(CartContext)


    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const [tabIndex, setTabIndex] = useState([...cartItems.map(x => x.category)])

    const [istransitioning, setIstransitioning] = useState(false)

    const handleClick = () => {
        setIstransitioning(true);
        setTimeout(() => {
            setIstransitioning(false);
        }, 300);
    }


    return (
        <>
            {
                data.map(item => {
                    const { image, name, category, price, amount } = item
                    return (
                        <div className='card' key={name}>
                            <img


                                src={
                                    (window.innerWidth < 767) ? image.mobile
                                        :
                                        (window.innerWidth > 767 && window.innerWidth < 1025) ? image.tablet : image.desktop
                                }
                                alt={category}
                            />
                            <div className={cartItems.find(x => x.name === name)?.amount === undefined ?
                                'addtocart' : 'addtocart select'}
                                style={{ pointerEvents: istransitioning ? 'none' : 'auto' }}
                                onKeyDown={(e) => {
                                    if (e.code === 'Enter') {
                                        e.currentTarget.classList.add('select')
                                        handleClick()
                                        setTabIndex(prev =>
                                            prev.includes(category) ?
                                                [...prev] : [...prev, category]
                                        )
                                    }
                                    if (cartItems.find(x => x.name === item.name)?.amount === 1) {
                                        setTabIndex(prev =>
                                            prev.filter(x => x !== category)
                                        )
                                    }
                                }}
                                key={category}
                                tabIndex={0}
                            >
                                <div className="wrapper">

                                    <div className="amount">
                                        <button className="calc dec"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleQty(item, -1)
                                            }}
                                            tabIndex={tabIndex.includes(category) ? 0 : -1}
                                        >
                                            <img src="src\assets\images\icon-decrement-quantity.svg" alt="" />
                                        </button>


                                        <p className="number">
                                            {cartItems.find(x => x.name === item.name)?.amount || 0}
                                        </p>

                                        <button className="calc inc"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleQty(item, +1)
                                            }}
                                            tabIndex={tabIndex.includes(category) ? 0 : -1}
                                        >
                                            <img src="src\assets\images\icon-increment-quantity.svg" alt="" />
                                        </button>
                                    </div>


                                    <div className="click"
                                        onClick={() => {
                                            addToCart(cartItems, item)
                                            handleClick()
                                        }}
                                    >
                                        <img src="src/assets/images/icon-add-to-cart.svg" alt="" />
                                        <p>add to cart</p>
                                    </div>
                                </div>

                            </div>
                            <div className="info">
                                <div className="category">{category}</div>
                                <div className="name">{name}</div>
                                <div className="price">
                                    $
                                    <span className="number">{price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div >
                    )
                })
            }
        </>
    )
}
export default Item