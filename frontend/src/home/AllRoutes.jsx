import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPage from '../admin/AdminPage'
// import Productpage from '../product/Productpage'
import { lazy,Suspense } from 'react'
import Home from './Home'
import ProductDetails from '../product/ProductDetails'
import Shimmer from '../Shimmer'


const Productpage = lazy(() => import("../product/Productpage"))

const AllRoutes = () => {

  return (
    <Routes>
      <Route path='/admin' element={<AdminPage />}/>
      <Route path='/product' element={<Suspense fallback={<Shimmer/>}><Productpage /></Suspense>}/>
      <Route path='/product/:id' element={<ProductDetails />}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default AllRoutes
