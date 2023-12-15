import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPage from '../admin/AdminPage'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/admin' element={<AdminPage />}/>
      
    </Routes>
  )
}

export default AllRoutes
