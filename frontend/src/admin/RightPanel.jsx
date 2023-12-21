import React from 'react'
import Orders from './Orders'
import Products from './Products'
import AddProducts from './AddProducts'
import UsersComp from './UsersComp'
import Dashboard from './dashboard/Dashboard'
import ErrorPage from './ErrorPage'

const RightPanel = ({ tab }) => {
    return tab === "dashboard" ? <Dashboard />
        : tab === "orders" ? <Orders />
            : tab === "products" ? <Products />
                : tab === "addProduct" ? <AddProducts />
                    : tab === "users" ? <UsersComp />
                        : <ErrorPage />
}

export default RightPanel
