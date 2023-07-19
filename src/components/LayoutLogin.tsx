import React, { FC, ReactNode } from 'react'
// import Navbar from './Navbar'
// import Nav from './Nav'
// import Footer from './Footer'
import bg from '../../public/bg-monda.png'

interface Child {
  children: ReactNode | null
}

const LayoutLogin: FC<Child> = ({ children }) => {
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-between sm:p-24 py-24 px-10"
      style={{
        backgroundImage: `url(${bg.src})`,
        // objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
        // width: '100%',
        // height: '100%',
      }}
    >
      {/* <Nav /> */}
      {children}
      {/* <Footer /> */}
    </main>
  )
}

export default LayoutLogin