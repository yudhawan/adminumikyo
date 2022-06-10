import React, { useEffect } from 'react'
import {authServices} from '../features/authSlice'
import {useDispatch,useSelector} from 'react-redux'
function useAuth() {
  const dispatch = useDispatch()
  const {token} = useSelector(state=>state.auth)
  useEffect(()=>{
    dispatch(authServices())
  },[])
  return token
}

export default useAuth