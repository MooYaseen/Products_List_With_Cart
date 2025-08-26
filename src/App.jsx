
import { useEffect, useState } from 'react'
import data from '../src/data/data.json'
import DesertList from './components/DesertList'
import Cart from './components/Cart'
import './App.css'
import './styles/Item.css'
import './styles/desertlist.css'

import { CartContext } from './context/CartContext'

function App() {

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('items')) || [])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (cart, item) => {
    setCartItems(prev => {
      const exist = cart.find(x => x.name === item.name)
      if (exist) {
        return prev.map(p =>
          p.name === item.name ? { ...p, amount: p.amount + 1 } : p
        )
      }
      else {
        return [...prev, { ...item, amount: 1 }]
      }
    })
  }


  const deleteItem = (item) => {
    setCartItems(prev =>
      prev.filter(x => x.name !== item.name)
    )
  }





  const handleQty = (el, qty) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.name === el.name);
      if (exists) {
        // حدث الكمية أو امسحه لو بقيت 0
        return prev
          .map(item =>
            item.name === el.name
              ? { ...item, amount: item.amount + qty }
              : item
          )
          .filter(x => x.amount > 0);
      }
      // لو مش موجود وضغط +1 (أو أي قيمة موجبة) → ضيفه
      if (qty > 0) {
        return [...prev, { ...el, amount: qty }];
      }
      // لو مش موجود وضغط -1 → مفيش حاجة تتغير
      return prev;
    });
  };









  return (
    <>
      <CartContext.Provider value={{ addToCart, cartItems, setCartItems, handleQty, deleteItem }}>
        <DesertList data={data} />
        <Cart />
      </CartContext.Provider>
    </>
  )
}
export default App