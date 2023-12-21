import React from 'react'
import Navbar from './home/Navbar'
import AllRoutes from './home/AllRoutes'
import AdminPage from './admin/AdminPage'
import Productpage from './product/Productpage'
import Carts from './cart/Carts'

function App() {
  return (
    <>
      <Navbar/>
      {/* <AllRoutes/> */}
      {/* <Productpage/> */}
      {/* <AdminPage /> */}
      <AllRoutes/>
      {/* <AdminPage /> */}
    </>
  )
}

export default App
