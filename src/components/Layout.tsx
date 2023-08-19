import React, { FC, ReactNode, useEffect } from 'react'
// import Navbar from './Navbar'
// import Nav from './Nav'
// import Footer from './Footer'
import bg from '../../public/bg-monda.png'
import { useSessionUser } from '@/contexts/SessionUserContext'

interface Child {
  children: ReactNode | null
}

const Layout: FC<Child> = ({ children }) => {
  const { refreshToken, state } = useSessionUser()
  useEffect(() => {
    refreshToken()
  }, [])
  console.log(state.currentPage)
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
      <div className="bg-[#2D4356] rounded-2xl w-full p-5 text-white text-center">
        <p>Halaman {state?.currentPage || "Utama"}</p>
      </div>
      {/* <Nav /> */}
      {children}
      {/* <Footer /> */}
    </main>
  )
}

export default Layout