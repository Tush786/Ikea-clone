import React from 'react'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Products from './Products'
import AddProducts from './AddProducts'
import UsersComp from './UsersComp'

const RightPanel = ({ tab }) => {
    console.log(tab)
    return tab === "dashboard" ? <Dashboard />
    : tab === "orders" ? <Orders />
    : tab === "products" ? <Products />
    : tab === "addProduct" ? <AddProducts />
    : tab === "users" ? <UsersComp />
    : <></>
}

export default RightPanel
