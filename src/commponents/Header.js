import React from 'react'
import { CogOutline } from 'react-ionicons'
import useAuth from '../hooks/useAuth'
import {useNavigate} from 'react-router-dom'
function Header() {
  const navigate = useNavigate()
  const token = useAuth()
  return (
    <div className='w-full h-16  flex px-2 lg:px-5 lg:text-3xl justify-between items-center bg-[#0069FF] text-white font-semibold text-xl border-b border-gray-500 fixed top-0'>
        <div>Administration Umikyo</div>
        {token&&<div className='flex items-center justify-center cursor-pointer' onClick={()=> navigate('/setting') }><CogOutline color={'white'} width={'2rem'} height={'2rem'} /></div>}
    </div>
  )
}

export default Header