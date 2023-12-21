import { Routes, Route } from 'react-router-dom'
import { lazy,Suspense } from 'react'
import Home from './Home'
import ProductDetails from '../product/ProductDetails'
import Shimmer from '../Shimmer'
import ErrorPage from '../admin/ErrorPage'
import AdminRoute from '../admin/AdminRoute'


const Productpage = lazy(() => import("../product/Productpage"))

const AllRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin' element={<AdminRoute />}/>
      <Route path='/product' element={<Suspense fallback={<Shimmer/>}><Productpage /></Suspense>}/>
      <Route path='/product/:id' element={<ProductDetails />}/>
      <Route path='*' element={<ErrorPage/>} /> 
    </Routes>
  )
}

export default AllRoutes
