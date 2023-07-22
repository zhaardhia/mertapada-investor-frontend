import React from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
const Omset = () => {
  const router = useRouter();
  const { date } = router.query;
  console.log({date})
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Silahkan Input Data Hari Ini (30 Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white">Omset</p>
          <div className="flex flex-col gap-4 h-[18rem]">
            <div className="flex flex-col">
              <p className="text-white">Ati Ampela</p>
              <div className="flex justify-between mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <p className="text-white">Ati Ampela</p>
              <div className="flex justify-between mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
              </div>
              <hr />
            </div>
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

export default Omset