import React from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const Absen = () => {
  const router = useRouter();
  const { date } = router.query;
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Silahkan Input Data Hari Ini (30 Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white">Absen</p>
          <div className="flex flex-col gap-4 h-[18rem]">
            <div className="flex flex-col">
              <div className="flex justify-between mt-4 mb-4">
                <p className="text-white">Pak XXX</p>
                <label htmlFor="absen-1" className="cursor-pointer relative">
                  <input type="checkbox" id='absen-1' className="appearance-none h-8 w-8 border-2 rounded-lg border-white check-absen"/>
                  <Icon icon="mingcute:check-fill" className="text-3xl text-white absolute left-[7px] top-0 text-opacity-0 check-1 transition" />
                </label>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between mt-4 mb-4">
                <p className="text-white">Pak XXX</p>
                <label htmlFor="absen-1" className="cursor-pointer relative">
                  <input type="checkbox" id='absen-1' className="appearance-none h-8 w-8 border-2 rounded-lg border-white check-absen"/>
                  <Icon icon="mingcute:check-fill" className="text-3xl text-white absolute left-[7px] top-0 text-opacity-0 check-1 transition" />
                </label>
              </div>
              <hr />
            </div>
          </div>
          <div className="text-white flex justify-around w-[50%] ml-[50%]">
            <a className="p-2 bg-[#E4A11B] rounded-lg text-white">Ubah Data</a>
            <Link href={`/input-harian/${date}/final-category`} className="p-2 bg-[#14A44D] rounded-lg text-white">Kembali</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Absen