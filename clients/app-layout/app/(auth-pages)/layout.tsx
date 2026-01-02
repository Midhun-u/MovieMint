import React, { ReactNode } from 'react'

const AuthLayout = ({
    children
}: {
    children: ReactNode
}) => {

  return (

    <main>
        {children}
        Layout
    </main>
    
  )
}

export default AuthLayout