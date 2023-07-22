import React from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router';

const FinalCategory = () => {
  const router = useRouter();
  const categories: Array<string> = ["Omset", "Absen"];
  const { date } = router.query;

  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Data Pengeluaran (30 Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5 h-[30rem]">
          <p className="text-2xl text-white text-center">Pilih Kategori Data</p>
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              {categories.map((category) => {
                return (
                  <Link href={`/input-harian/${date}/final-category/${category.toLowerCase()}`} className="p-2 bg-transparent border border-[#87E490] rounded-lg text-white sm:text-base text-sm flex justify-between">
                    <p>{category}</p>
                    <p className="text-[#87E490]">Sudah Terisi ✅</p>
                  </Link>
                )
              })}
            </div>
            <div className="text-white flex justify-between mt-[15rem]">
              <Link href={`/input-harian/${date}`} className="p-2 bg-transparent border border-white rounded-lg text-white">Kembali</Link>
              <Link href={`/input-harian/${date}/final-recap`} className="p-2 bg-[#14A44D] rounded-lg text-white">Selanjutnya</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FinalCategory