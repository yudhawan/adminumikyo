import React, { useState } from 'react'
import {logout} from '../features/authSlice'
import {useDispatch} from 'react-redux'
function Setting() {
    const [data,setdata]= useState({
        username:'',
        password:''
    })
    const dispatch = useDispatch()
  return (
    <div className='flex overflow-y-auto flex-col lg:items-center lg:border lg:border-gray-200 lg:rounded-sm w-full h-auto lg:h-[75vh] mb-[4.5rem] lg:mb-5 space-y-2 items-center'>
        <button className='rounded-lg bg-rose-500 hover:bg-rose-600 text-white px-2 py-1 self-end mt-5 lg:mr-24 mr-5' onClick={()=>dispatch(logout())}>Logout</button>
        <form className='space-y-2'>
            <div className='border-gray-400 border p-2 rounded-lg w-80'>
                <input type='text' placeholder='Username' value={data.username} onChange={(e)=> setdata({...data, username:e.target.value})} className='w-full outline-none' />
            </div>
            <div className='border-gray-400 border p-2 rounded-lg w-80'>
                <input type='password' placeholder='Password' value={data.password} onChange={(e)=> setdata({...data, password:e.target.value})} className='w-full outline-none' />
            </div>
            <button className='rounded-lg bg-gray-500 hover:bg-gray-600 w-full text-white text-lg h-10' >Update</button>
        </form>
    </div>
  )
}

export default Setting