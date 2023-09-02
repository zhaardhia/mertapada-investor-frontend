import React, { FC, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link';
import { useSessionUser } from '@/contexts/SessionUserContext'
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import moment from 'moment';
import { MonthSelect } from '@/types/dates';
import { getMonthReport } from '@/utils/util';
import { BounceLoader } from "react-spinners";
import dynamic from 'next/dynamic';

interface DateMonthTypes {
  status: string;
  date: string;
  isDisabled: boolean;
  fullDate: string;
}
type Option = { value: string; label: string };

const InputHarian: FC = () => {
  const tanggal: Array<string> = ["01", "02" , "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]; // example day of month
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()


  const [allDates, setAllDates] = useState<DateMonthTypes[]>()
  const [monthOptions, setMonthOptions] = useState<MonthSelect[]>()
  const [selectedMonth, setSelectedMonth] = useState<Option | null>({label: moment().format("MMMM YYYY"), value: moment().format("YYYY-MM")})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchAllDates()
    dispatch({ type: "setCurrentPage", payload: "Data Harian"})
    setMonthOptions(getMonthReport())
  }, [selectedMonth])

  const fetchAllDates = async () => {
    try {
      setLoading(true)
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/daily-report-investor/date-in-month?monthYear=${selectedMonth?.value}`, {
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
    setLoading(false)
  }
  console.log({allDates})

  // const handleChangeMonth: (newValue: SingleValue<MonthSelect>, actionMeta: ActionMeta<MonthSelect>) => void = (e: MonthSelect) => {
    
  //   if (newValue !== null) {
  //     // Your logic here using newValue and actionMeta
  //     console.log({e})
  //   }
    
  // }

  const handleChangeMonth = (newValue: Option | null, actionMeta: ActionMeta<Option>) => {
    setSelectedMonth(newValue);
    console.log({newValue})
  };

  console.log({monthOptions})
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col items-center gap-3">
          {/* <Image src="/icon-brand.png" alt={'warteg kharisma bahari'} width={100} height={100} /> */}
          <Icon icon="clarity:date-line" className="text-7xl" />
          <p className='text-2xl mx-auto text-center'>Silahkan Pilih Tanggal Laporan</p>
        </div>
        <div className="bg-[#2D4356] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="text-2xl text-white">{moment(selectedMonth?.value).format("MMMM YYYY")}</p>
            <Select
              className="basic-single sm:w-[50%] w-full rounded-xl"
              classNamePrefix="select"
              defaultValue={ selectedMonth }
              // isLoading={isLoading}
              value={selectedMonth}
              isClearable={false}
              isSearchable={true}
              name="courier"
              options={monthOptions}
              placeholder="Pilih Bulan & Tahun"
              onChange={handleChangeMonth}
              // disabled={!id}
            />
          </div>
          <BounceLoader className="mx-auto" loading={loading} color="#e5f3f0" />
          <div className="grid sm:grid-cols-5 grid-cols-4 sm:gap-4 gap-2">
            {allDates?.map((tgl: DateMonthTypes, idx) => {
              return (
                !tgl.isDisabled ?
                <Link href={`input-harian/${tgl.fullDate}`} 
                  className={`sm:p-2 p-1 
                    ${tgl.status === "verified" ? "bg-[#14A44D] text-white" : "bg-[#FFF8D6]"}  
                    hover:bg-[#f5eecc] rounded-lg text-center`
                  }
                >
                  {tgl?.date}
                </Link>
                : <button disabled className="sm:p-2 p-1 bg-[#FFF8D6] opacity-40 rounded-lg text-center">{tgl?.date}</button>
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

export default dynamic(() => Promise.resolve(InputHarian), {
  ssr: false,
})