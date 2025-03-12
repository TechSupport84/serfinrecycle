import React from 'react'
import { BrowserRouter as  Router  , Routes  ,  Route  } from 'react-router-dom'
import NavBar from '../navigation/NavBar'
import Home from '../pages/Home'
import SingleProduct from '../components/SingleProduct'
import CartPage from '../pages/CartPage'
import Register from '../screens/Register'
import Login from '../screens/Login'
import { useAuth } from '../context/AuthContext'
import  OrderedProducts from "../components/OrdredProducts"
import CancelPayment from '../pages/CancelPayment'
import SuccessPayment from '../pages/SuccessPayment'
import ExchangeProduct from '../pages/Ex-ChangePhone'
import SellProduct from '../pages/SellProduct'
import SubscribeAffiliate from '../pages/SubscribeAffiliate'
import Account from '../pages/Account'

function AppRoute() {
  const {user } = useAuth()
  return (
    <Router>
    <NavBar/>
     <Routes>
     
      <Route  path='/' element ={<Home/>}/>
        <Route path ="/product/:id"  element ={<SingleProduct/>}/>
        {user && (
          <>
        <Route path ="/cart" element ={<CartPage/>}/>
        <Route path='/ordered' element ={ <OrderedProducts/>}/>
        <Route path='/cancel' element ={<CancelPayment/>}/>
        <Route path='/Success'element ={<SuccessPayment/>}/>
          </>
      )}
        <Route path ="/register"  element ={<Register/>}/>
        <Route path ="/login"  element ={<Login/>}/>
        <Route path = "/exchange" element ={<ExchangeProduct/>}/>
        <Route path ="/sell" element ={<SellProduct/>} />
        <Route path='/subscribe' element ={<SubscribeAffiliate/>}/>
        <Route path ="/account" element ={<Account/>} />
    </Routes>
 </Router>
  )
}

export default AppRoute