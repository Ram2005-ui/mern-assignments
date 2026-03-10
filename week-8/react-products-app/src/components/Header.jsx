import React from 'react'
import { NavLink, Outlet } from 'react-router'

function Header() {
  return (
    <div className='flex justify-between items-center px-10 py-3 bg-gray-400 shadow-lg'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuN-4AVtZ0FeZBe7ksoicFp8AeDlYIjlbXQ&s" width="60px"></img>
        <ul className='flex gap-10'>
            <li>
                {/* dynamic styling and apply function */}
                <NavLink to="" className={({isActive})=>isActive?"text-blue-600 pd-2 bg-blue-400":"text-black"}>Home</NavLink>
            </li>
            
            <li>
                <NavLink to="productslist" className={({isActive})=>isActive?"text-blue-600 pd-2 bg-blue-400":"text-black"}>ProductsList</NavLink>
            </li>
            <li>
                <NavLink to="contact" className={({isActive})=>isActive?"text-blue-600 pd-2 bg-blue-400":"text-black"}>Contact</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Header