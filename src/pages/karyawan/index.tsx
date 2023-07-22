import React, { FC } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react';

const Karyawan: FC = () => {
  const router = useRouter();
  
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-center mx-auto'>Pengaturan Gaji Karyawan untuk Bulan Ini (Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white">Karyawan & Gaji</p>
          <div className="flex flex-col gap-4 h-[18rem]">
            <div className="flex flex-col">
              <p className="text-white">Pak Fulan</p>
              <div className="flex justify-between items-center mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
                <button>
                  <Icon icon="zondicons:minus-solid" className="text-3xl text-[#FF3B30]" />
                </button>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <p className="text-white">Pak Fulan</p>
              <div className="flex justify-between items-center mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
                <button>
                  <Icon icon="zondicons:minus-solid" className="text-3xl text-[#FF3B30]" />
                </button>
              </div>
              <hr />
            </div>
            <button className="text-white text-2xl border border-[#CECECE] w-[80%] mx-auto rounded-lg shadow-lg">+</button>
          </div>
          <div className="text-white text-sm">
            <p>Catatan:</p>
            <p>* Gaji yang diubah akan berpengaruh pada pembayaran gaji bulan ini & seterusnya. Pastikan anda telah memasukkan nilai gaji dengan benar</p>
          </div>
          <div className="text-white flex justify-around w-[50%] ml-[50%]">
            <a className="p-2 bg-[#E4A11B] rounded-lg text-white">Ubah Data</a>
            <Link href={`/home`} className="p-2 bg-[#14A44D] rounded-lg text-white">Kembali</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Karyawan