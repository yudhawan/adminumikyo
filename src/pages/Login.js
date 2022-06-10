import React, { useState } from 'react'
import {authLogin} from '../features/authSlice'
import {useDispatch} from 'react-redux'
function Login() {
    const [data,setdata]=useState({
        username:'',
        password:''
    })
    const dispatch = useDispatch()
    function handleLogin(e){
        e.preventDefault()
        dispatch(authLogin(data))
    }
  return (
    <div className='flex w-full h-[80vh] justify-center items-center'>
        <div className='flex flex-col space-y-3'>
            <div className='text-slate-500'>Umikyo Administration</div>
            <form className='space-y-2' onSubmit={handleLogin}>
                <div className='border-gray-400 border p-2 rounded-lg w-80'>
                    <input type='text' placeholder='Username' value={data.username} onChange={(e)=> setdata({...data, username:e.target.value})} className='w-full outline-none' />
                </div>
                <div className='border-gray-400 border p-2 rounded-lg w-80'>
                    <input type='password' placeholder='Password' value={data.password} onChange={(e)=> setdata({...data, password:e.target.value})} className='w-full outline-none' />
                </div>
                <button className='rounded-lg bg-green-500 hover:bg-green-600 w-full text-white text-lg h-10' onClick={handleLogin}>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login