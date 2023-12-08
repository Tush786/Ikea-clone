import React, { useState } from 'react'
import RightPanel from './RightPanel'
import LeftPanel from './LeftPanel'

const AdminPage = () => {
  const [tab,setTab] = useState('dashboard')
  return (
    <div className='flex'>
      <div className='md:w-[23%] w-[15%]  bg-[#1f2937] h-[100vh]'><LeftPanel tab={tab} setTab={setTab}/></div>
      <div className='md:w-[77%] w-[85%] bg-slate-100'><RightPanel tab={tab}/></div>
    </div>
  )
}

export default AdminPage
