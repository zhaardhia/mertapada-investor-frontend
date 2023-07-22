import React from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Link from 'next/link';

const Category = () => {
  const router = useRouter();
  const { category, date } = router.query;
  console.log({category, date})
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Silahkan Input Data Hari Ini (30 Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white">{category}</p>
          <div className="flex flex-col gap-4 h-[32rem] overflow-y-scroll pr-5">
            <div className="flex flex-col">
              <p className="text-white">Ati Ampela</p>
              <div className="flex justify-between mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[25%] h-[2rem] rounded-xl p-2 text-center" value={5} />
                <input type="text" className="bg-[#FFF8D6] w-[20%] h-[2rem] rounded-xl p-2 text-center" value="Kg" />
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <p className="text-white">Ati Ampela</p>
              <div className="flex justify-between mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[25%] h-[2rem] rounded-xl p-2 text-center" value={5} />
                <input type="text" className="bg-[#FFF8D6] w-[20%] h-[2rem] rounded-xl p-2 text-center" value="Kg" />
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <p className="text-white">Ati Ampela</p>
              <div className="flex justify-between mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[25%] h-[2rem] rounded-xl p-2 text-center" value={5} />
                <input type="text" className="bg-[#FFF8D6] w-[20%] h-[2rem] rounded-xl p-2 text-center" value="Kg" />
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <p className="text-white">Ati Ampela</p>
              <div className="flex justify-between mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[25%] h-[2rem] rounded-xl p-2 text-center" value={5} />
                <input type="text" className="bg-[#FFF8D6] w-[20%] h-[2rem] rounded-xl p-2 text-center" value="Kg" />
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <p className="text-white">Ati Ampela</p>
              <div className="flex justify-between mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[25%] h-[2rem] rounded-xl p-2 text-center" value={5} />
                <input type="text" className="bg-[#FFF8D6] w-[20%] h-[2rem] rounded-xl p-2 text-center" value="Kg" />
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
              </div>
              <hr />
            </div>
            <button className="text-white text-2xl border border-[#CECECE] w-[80%] mx-auto rounded-lg shadow-lg">+</button>
          </div>
          <div className="text-white flex flex-col gap-5 mt-3">
            <p>Total Pengeluaran:</p>
            <p className="text-right font-semibold">Rp 2.000.000</p>
            <hr />
          </div>
          <div className="text-white flex justify-between">
            <a className="p-2 bg-transparent border border-white rounded-lg text-white">Kembali</a>
            <a className="p-2 bg-[#14A44D] rounded-lg text-white">Selanjutnya</a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Category