import React from 'react'

function PrivateRoute({children, ...rest}) {
  let login = true
  return login?<>{children}</>:<></>
}

export default PrivateRoute