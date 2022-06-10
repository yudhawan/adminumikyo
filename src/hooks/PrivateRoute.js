import React from 'react'
import useAuth from '../hooks/useAuth'
import Login from '../pages/Login'
export function PrivateRoute({children, ...rest}) {
  let token = useAuth()

  if(token) return <>{children}</>
  return <Login/>
}
export function PrivateRouteTab({children, ...rest}) {
  let token = useAuth()

  if(token) return <>{children}</>
  return <></>
}
// export default PrivateRoute