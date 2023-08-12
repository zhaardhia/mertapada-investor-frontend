import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useSessionUser } from '@/contexts/SessionUserContext';

interface AbsenceType {
  id: string;
  employee_id: string;
  absence_detail_id: string;
  is_present: boolean;
  date: string;
  created_date: Date;
  updated_date: Date;
}

const Absen = () => {
  const router = useRouter();
  const { date, id } = router.query;
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()

  const [absence, setAbsence] = useState<AbsenceType[]>([])
  const [absenceOrigin, setAbsenceOrigin] = useState<AbsenceType[]>([])

  const [mainProfit, setMainProfit] = useState<number>()
  const [otherProfit, setOtherProfit] = useState<number>()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const [showModal, setShowModal] = useState<boolean>(false)
  console.log({date})

  useEffect(() => {
    if (router?.query?.id && router?.query?.date) {
      fetchAbsence()
    }
  }, [date, id])

  const fetchAbsence = async () => {
    try {
      setLoading(true)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/daily-report/absence?date=${date}&id=${id}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })

      if (response?.data?.data) {
        setAbsence(response?.data?.data)
        setAbsenceOrigin(response?.data?.data)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  console.log({absence})

  const updateAbsence = (value: any, obj: AbsenceType) => {
    setAbsence(current => 
      current.map(item =>
        item.id === obj.id ? { ...obj, is_present: value } : item
      )
    );
  }

  const handleApproved = async () => {
    let verifDailyReport = null;
    try {
      verifDailyReport = await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/daily-report/omset`, 
        {
          id,
          date,
          main_profit: mainProfit,
          other_profit: otherProfit
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
    } catch (error) {
      console.error(error)
    }
    setIsUpdate(false)
    return verifDailyReport.message || "Gagal saat melakukan verifikasi"
  }

  const handleCancelEdit = () => {
    setAbsence(absenceOrigin)
    setIsUpdate(false)
  }

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
                <label htmlFor="absen-2" className="cursor-pointer relative">
                  <input type="checkbox" id='absen-2' className="appearance-none h-8 w-8 border-2 rounded-lg border-white check-absen"/>
                  <Icon icon="mingcute:check-fill" className="text-3xl text-white absolute left-[7px] top-0 text-opacity-0 check-1 transition" />
                </label>
              </div>
              <hr />
            </div>
          </div>
          <div className="text-white flex justify-between">
            {!isUpdate ? (
              <>
                <Link href={`/input-harian/${date}/final-category`} className="p-2 bg-transparent border border-white rounded-lg text-white">Kembali</Link>
                <button className="p-2 bg-[#E4A11B] rounded-lg text-white" onClick={() => setIsUpdate(!isUpdate)}>Ubah Data</button>
              </>
            ) : (
              <>
                <button className="p-2 bg-transparent border border-white rounded-lg text-white" onClick={handleCancelEdit}>Batal</button>
                <button className="p-2 bg-[#14A44D] rounded-lg text-white" onClick={() => setShowModal(!showModal)} >Simpan Data</button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Absen