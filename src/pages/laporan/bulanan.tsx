import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDataLaporan } from '../../contexts/DataLaporanContext'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { formatRupiah } from '@/utils/util';
import { RecapDetailCategoryShop } from '@/types/laporan';
import FinalRecapDetailTable from '@/components/excel/FinalRecapDetailTable';
import dynamic from 'next/dynamic';
import moment from 'moment';
const DynamicFinalDetailDataTable = dynamic(() => import('@/components/excel/FinalRecapDetailTable'), { ssr: false });
const DynamicFinalPriceDataTable = dynamic(() => import('@/components/excel/FinalRecapTotalPrice'), { ssr: false });
const DynamicLabaRugiDetailDataTable = dynamic(() => import('@/components/excel/LabaRugiDetailTable'), { ssr: false })
interface FinalRecapType {
  id: string;
  gross_profit: number;
  nett_profit: number;
  shop_expense: number;
  prevbalance: number;
  currentbalance: number;
  lainLain: RecapDetailCategoryShop[];
  lainLainTotalPrice: number;
  sembakoMinuman: RecapDetailCategoryShop[];
  sembakoMinumanTotalPrice: number;
  bumbuSayuran: RecapDetailCategoryShop[];
  bumbuSayuranTotalPrice: number;
  laukPauk: RecapDetailCategoryShop[];
  laukPaukTotalPrice: number;

}

const Bulanan = () => {
  const router = useRouter();
  const { date, id } = router.query;
  const { dispatch: dispatchLaporan } = useDataLaporan()
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()
  const thisMonth = moment().format("MMMM YYYY")
  const [loading, setLoading] = useState<boolean>(false)
  const [finalRecapDetail, setFinalRecapDetail] = useState<string>('wkwk')
  const [tabSwitch, setTabSwitch] = useState<string>('dataBelanja') 
  const [isAllowedNext, setIsAllowedNext] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  useEffect(() => {
    if (router?.query?.date && router?.query?.id) {
      fetchFinalRecap()
    }
  }, [date, id])

  const fetchFinalRecap = async () => {
    try {
      setLoading(true)
      // const categoryId: string = currentCategory.id ? currentCategory.id : findCategoryShopExpense(categoryShop)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/daily-report/final-recap-detail?id=${id}&date=${date}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response)

      if (response?.data?.data) {
        setFinalRecapDetail(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  console.log({finalRecapDetail})
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10 text-black">
        <div className="bg-[#2D4356] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white text-center">Rekap Data Bagi Hasil {thisMonth}</p>
          
          <div className="flex flex-col gap-4 rounded-lg">
            {finalRecapDetail && (
              <DynamicLabaRugiDetailDataTable />
            )}
          </div>
          <div className="text-white flex justify-end mt-10">
            <Link href={`/laporan`} className="p-2 bg-transparent border border-white rounded-lg text-white">Kembali</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Bulanan
