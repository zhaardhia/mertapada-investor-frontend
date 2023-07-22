import React, { FC, ReactNode } from 'react'
// import Navbar from './Navbar'
// import Nav from './Nav'
// import Footer from './Footer'
import bg from '../../public/bg-monda.png'

interface Child {
  children: ReactNode | null
}

const Layout: FC<Child> = ({ children }) => {
  return (
    <main 
      className="min-h-screen p-10 max-w-[1000px] mx-auto"
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
      <div className="bg-[#617A55] rounded-2xl w-full p-5 text-white text-center">
        <p>Halaman Utama</p>
      </div>
      {/* <Nav /> */}
      {children}
      {/* <Footer /> */}
    </main>
  )
}

export default Layout