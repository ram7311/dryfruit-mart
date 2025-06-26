
import './App.css'
import ProductList from './components/ProductList'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Cart from './components/Cart'
import Home from './components/Home'
import MyOrders from './components/MyOrders'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import { getToken } from './components/auth'
import { BACKEND_API_URL } from './components/constants'

function App() {
const [cartCount, setCartCount] = useState(0);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  const token = getToken();
  if(token){
  axios.get(`${BACKEND_API_URL}/api/cart/count`,{
      headers :{ Authorization: `Bearer ${token}` }
    })
    .then(res =>{
      console.log("quantity_count --> "+res.data.quantity_count);
       setCartCount(res.data.quantity_count)})
       .catch(err => {
    console.error("Failed to fetch cart count ",err);
  });
}},[]);


const handleAddToCart = (productId) => {
  const token = getToken();
    axios.post(`${BACKEND_API_URL}/api/cart/add`, {

      productId: productId,
      quantity: 1
    },{
      headers :{ Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setCartCount((prev) => prev + 1);
    })
    .catch(err => {
      console.error("Failed to add to cart", err);
    });
  };

  return (
    <>
    <Router>
      <Header cartCount={cartCount} setCartCount = {setCartCount} setSearchTerm={setSearchTerm}  />

      <Routes>
        <Route path="/" element={<Login  setCartCount = {setCartCount}/>}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/products" element= {<ProtectedRoute> <ProductList onAddToCart={handleAddToCart} searchTerm={searchTerm} /> </ProtectedRoute>}/>
        <Route path="/cart" element = {<ProtectedRoute> <Cart setCartCount = {setCartCount}/> </ProtectedRoute>}/>
        <Route path="/my_orders" element = {<ProtectedRoute> <MyOrders /> </ProtectedRoute>}/>
      </Routes>

      <Footer />
      </Router>
    </>
  )
}

export default App
