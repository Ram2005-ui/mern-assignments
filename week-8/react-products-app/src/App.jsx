import React from 'react'
import { Outlet } from 'react-router-dom'
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router'
import Home from './components/Home'
import Products from './components/Products'
import ProductsList from './components/ProductsList'
import RootLayout from './components/RootLayout'
import Contact from './components/Contact'
import Header from './components/Header'
function App() {
  const routingObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      children:[
        {
          path:"",
          element:<Home />
        },
        {
          path:"productslist",
          element:<ProductsList />
        },
        {
          path:"contact",
          element:<Contact />
        },
        {
          path:"product",
          element:<Products />
        }
      ]
    }
  ])
  return  <RouterProvider router={routingObj} />
}

export default App