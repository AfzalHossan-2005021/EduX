import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  const saveCart = (myCart) => {
    let subt = 0
    let keys = Object.keys(cart)
    for (let i = 0; keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
    localStorage.setItem("cart", myCart)
  }

  const addToCart = (itemCode, qty, price, title) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, price, title }
    }
    saveCart(newCart)
    setCart(newCart)
  }

  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    saveCart(newCart)
    setCart(newCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch {
      localStorage.clear()
    }
  }, [])


  return <div className='flex-col'>
    <Navbar isLoggedIn={isLoggedIn} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <div className='flex-col mt-16'>
      <Component isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    </div>
    <Footer/>
  </div>
}
