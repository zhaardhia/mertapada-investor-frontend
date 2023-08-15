import React, { FC, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link';
import { useSessionUser } from '@/contexts/SessionUserContext'
import Image from 'next/image';
import { Icon } from '@iconify/react';
interface DateMonthTypes {
  status: string;
  date: string;
}
const InputHarian: FC = () => {
  const tanggal: Array<string> = ["01", "02" , "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]; // example day of month
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()


  const [allDates, setAllDates] = useState<DateMonthTypes[]>()

  useEffect(() => {
    fetchAllDates()
    dispatch({ type: "setCurrentPage", payload: "Data Harian"})
  }, [])

  const fetchAllDates = async () => {
    try {
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/daily-report/date-in-month`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      if (response?.data?.data) {
        setAllDates(response.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  console.log({allDates})
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col items-center gap-3">
          {/* <Image src="/icon-brand.png" alt={'warteg kharisma bahari'} width={100} height={100} /> */}
          <Icon icon="clarity:date-line" className="text-7xl" />
          <p className='text-2xl mx-auto text-center'>Silahkan Pilih Tanggal Laporan</p>
        </div>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white">Juni, 2023</p>
          <div className="grid sm:grid-cols-5 grid-cols-4 sm:gap-4 gap-2">
            {allDates?.map((tgl: DateMonthTypes, idx) => {
              return (
                allDates[idx - 1]?.status === "verified" || tgl.status === "verified" ?
                <Link href={`input-harian/${tgl.date}`} 
                  className={`sm:p-2 p-1 
                    ${tgl.status === "verified" ? "bg-[#14A44D] text-white" : 
                      (tgl.status === "filled" || tgl.status === "empty") && allDates[idx - 1].status === "verified" ? "bg-[#FFF8D6]" 
                      : "bg-[#FFF8D6] opacity-60"}  
                    hover:bg-[#f5eecc] rounded-lg text-center`
                  }
                >
                  {tgl?.date}
                </Link>
                : <button disabled className="sm:p-2 p-1 bg-[#FFF8D6] opacity-60 rounded-lg text-center">{tgl?.date}</button>
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