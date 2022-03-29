import React from 'react'
import { CogOutline } from 'react-ionicons'
function Header() {
  return (
    <div className='w-full h-16  flex px-2 lg:px-5 lg:text-3xl justify-between items-center bg-[#0069FF] text-white font-semibold text-xl border-b border-gray-500 fixed top-0'>
        <div>Administration Umikyo</div>
        <div className='flex items-center justify-center'><CogOutline color={'white'} width={'2rem'} height={'2rem'} /></div>
    </div>
  )
}

export default Header