import React, { FC } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
const index: FC = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Selamat Datang Pengelola!</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full flex flex-col gap-5 items-center p-10 mx-auto">
          <Link href="/input-harian" className="bg-[#F7E1AE] hover:bg-[#f3dca6] p-3 rounded-2xl w-[80%] text-center">Input Data Harian</Link>
          <Link href="/laporan" className="bg-[#F7E1AE] hover:bg-[#f3dca6] p-3 rounded-2xl w-[80%] text-center">Halaman Laporan</Link>
          <Link href="/karyawan" className="bg-[#F7E1AE] hover:bg-[#f3dca6] p-3 rounded-2xl w-[80%] text-center">Pengaturan Karyawan & Gaji</Link>
          <Link href="/biaya-sewa" className="bg-[#F7E1AE] hover:bg-[#f3dca6] p-3 rounded-2xl w-[80%] text-center">Pengaturan Biaya Sewa</Link>
        </div>
      </div>
    </Layout>
  )
}

export default index