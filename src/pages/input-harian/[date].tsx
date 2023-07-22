import React from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Link from 'next/link';
const Date = () => {
  const router = useRouter();
  const { date } = router.query;
  const category: Array<string> = ["Lauk - pauk", "Bumbu - bumbuan", "Sembako - Minuman", "Lain - Lain"]
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Data Pengeluaran (30 Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white text-center">Pilih Kategori Data</p>
          <div className="flex flex-col gap-4">
            {category.map((tgl) => {
              return (
                <Link href={`input-harian/${tgl}`} className="p-2 bg-transparent border border-[#87E490] rounded-lg text-white sm:text-base text-sm flex justify-between">
                  <p>{tgl}</p>
                  <p className="text-[#87E490]">Sudah Terisi ✅</p>
                </Link>
              )
            })}
          </div>
          <div className="text-white flex flex-col gap-5">
            <p>Total Pengeluaran:</p>
            <p className="text-right font-semibold">Rp 2.000.000</p>
            <hr />
          </div>
          <div className="text-white flex justify-between">
            <Link href="/input-harian" className="p-2 bg-transparent border border-white rounded-lg text-white">Kembali</Link>
            <Link href={`/input-harian/${date}/final-category`} className="p-2 bg-[#14A44D] rounded-lg text-white">Selanjutnya</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Date