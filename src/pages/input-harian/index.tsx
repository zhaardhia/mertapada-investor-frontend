import React, { FC } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link';

const InputHarian: FC = () => {
  const tanggal: Array<string> = ["01", "02" , "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]; // example day of month
  const id: number = 2;
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Silahkan Pilih Tanggal Laporan</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white">Juni, 2023</p>
          <div className="grid sm:grid-cols-5 grid-cols-4 sm:gap-4 gap-2">
            {tanggal.map((tgl) => {
              return (
                <a href={`input-harian/${tgl}`} className="sm:p-2 p-1 bg-[#FFF8D6] hover:bg-[#f5eecc] rounded-lg text-center">
                  {tgl}
                </a>
              )
            })}
          </div>
          <div className="text-white flex justify-end">
            <Link href={`/home`} className="p-2 bg-transparent border border-white rounded-lg text-white">Kembali</Link>
            {/* <Link href={`/input-harian/${date}/final-category`} className="p-2 bg-[#14A44D] rounded-lg text-white">Selanjutnya</Link> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default InputHarian