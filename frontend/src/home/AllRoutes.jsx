import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPage from '../admin/AdminPage'
import Home from './Home'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/admin' element={<AdminPage />}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default AllRoutes
