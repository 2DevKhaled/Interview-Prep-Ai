import React, { Children, useContext } from 'react'
import { UserContext } from "../../context/userContext";
import Navbar from './Navbar';
function DashoardLayout({children}) {
    const {user} = useContext(UserContext)
  return (
    <div className='bg-bg min-h-screen'>
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  )
}

export default DashoardLayout
