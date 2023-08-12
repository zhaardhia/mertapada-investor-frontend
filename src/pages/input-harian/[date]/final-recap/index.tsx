import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDataLaporan } from '../../../../contexts/DataLaporanContext'
import { useSessionUser } from '../../../../contexts/SessionUserContext'
import { formatRupiah } from '@/utils/util';

interface FinalRecapType {
  id: string;
  gross_profit: number;
  nett_profit: number;
  shop_expense: number;
  prevbalance: number;
  currentbalance: number;
}

const FinalRecap = () => {
  const router = useRouter();
  const { date } = router.query;
  const { dispatch: dispatchLaporan } = useDataLaporan()
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()

  const [loading, setLoading] = useState<boolean>(false)
  const [finalRecap, setFinalRecap] = useState<FinalRecapType>()
  const [isAllowedNext, setIsAllowedNext] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  useEffect(() => {
    if (router?.query?.date) {
      fetchFinalRecap()
    }
  }, [date])

  const fetchFinalRecap = async () => {
    try {
      setLoading(true)
      // const categoryId: string = currentCategory.id ? currentCategory.id : findCategoryShopExpense(categoryShop)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/daily-report/final-recap?date=${date}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response)

      if (response?.data?.data) {
        setFinalRecap(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  console.log({finalRecap})
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Silahkan Input Data Hari Ini (30 Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white text-center">Rekap Akhir Data</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex justify-between mt-4 mb-4">
                <p className="text-white">Total Pendapatan</p>
                <p className="text-white font-semibold">{formatRupiah(finalRecap?.gross_profit)}</p>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between mt-4 mb-4">
                <p className="text-white">Total Pengeluaran</p>
                <p className="text-white font-semibold">{formatRupiah(finalRecap?.shop_expense)}</p>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between mt-4 mb-4">
                <p className="text-white">Saldo Hari Ini</p>
                <p className="text-white font-semibold">{formatRupiah(finalRecap?.nett_profit)}</p>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between mt-4 mb-4">
                <p className="text-white">Saldo Sebelumnya</p>
                <p className="text-white font-semibold">{formatRupiah(finalRecap?.prevbalance)}</p>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between mt-4 mb-4">
                <p className="text-white">Total Pendapatan</p>
                <p className="text-white font-semibold">{formatRupiah(finalRecap?.currentbalance)}</p>
              </div>
              <hr />
            </div>
          </div>
          {/* muncul kalo udah di konfirm */}
          <button className="p-2 bg-[#3B71CA] rounded-lg text-white">Download Excel</button>
          {/* muncul kalo udah di konfirm */}
          <div className="text-white flex justify-between mt-10">
            <Link href={`/input-harian/${date}/final-category`} className="p-2 bg-transparent border border-white rounded-lg text-white">Kembali</Link>
            <a className="p-2 bg-[#14A44D] rounded-lg text-white">Konfirmasi</a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FinalRecap