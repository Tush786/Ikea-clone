import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPage from '../admin/AdminPage'
import Productpage from '../product/Productpage'


const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/admin' element={<AdminPage />}/>
      <Route path='/product' element={<Productpage />}/>
      
    </Routes>
  )
}

export default AllRoutes
