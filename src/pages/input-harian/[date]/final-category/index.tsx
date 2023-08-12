import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useSessionUser } from '../../../../contexts/SessionUserContext'

interface FinalCategoryStatusType {
  daily_report_id: string;
  absence_filled: boolean;
  isVerified: boolean;
  omset_filled: boolean;
}

const FinalCategory = () => {
  const router = useRouter();
  const categories: Array<string> = ["Omset", "Absen"];
  const { date } = router.query;

  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()

  const [loading, setLoading] = useState<boolean>(false)
  const [omsetAndAbsence, setOmsetAndAbsence] = useState<FinalCategoryStatusType>()
  const [isAllowedNext, setIsAllowedNext] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)


  useEffect(() => {
    if (router?.query?.date) {
      fetchAbsenOmset()
    }
  }, [date])

  const fetchAbsenOmset = async () => {
    try {
      setLoading(true)
      // const categoryId: string = currentCategory.id ? currentCategory.id : findCategoryShopExpense(categoryShop)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/daily-report/omset-absence-status?date=${date}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response)

      if (response?.data?.data) {
        setOmsetAndAbsence(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  console.log({omsetAndAbsence})
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Data Pengeluaran (30 Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5 h-[30rem]">
          <p className="text-2xl text-white text-center">Pilih Kategori Data</p>
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <Link href={`/input-harian/${date}/final-category/omset/${omsetAndAbsence?.daily_report_id}`} onClick={() => {
              }} 
              className={`p-2 bg-transparent border border-${omsetAndAbsence?.omset_filled ? "[#87E490]" : "white"} rounded-lg text-white sm:text-base text-sm flex justify-between`}>
                <p>Omset</p>
                {omsetAndAbsence?.omset_filled ? <p className="text-[#87E490]">Sudah Terisi ✅</p> : <p className="">Belum Terisi</p>}
              </Link>
              <Link href={`/input-harian/${date}/final-category/absen/${omsetAndAbsence?.daily_report_id}`} onClick={() => {
                // console.log({category})
                // dispatchLaporan({ type: "setCurrentCategory", payload: category})
              }} 
              className={`p-2 bg-transparent border border-${omsetAndAbsence?.absence_filled ? "[#87E490]" : "white"} rounded-lg text-white sm:text-base text-sm flex justify-between`}>
                <p>Absen</p>
                {omsetAndAbsence?.absence_filled ? <p className="text-[#87E490]">Sudah Terisi ✅</p> : <p className="">Belum Terisi</p>}
              </Link>
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