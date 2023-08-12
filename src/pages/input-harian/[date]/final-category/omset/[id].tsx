import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
import { NumericFormat } from 'react-number-format';
import { useSessionUser } from '@/contexts/SessionUserContext';
import Link from 'next/link';
import ModalConfirm from '@/components/modals/ModalConfirm';

interface OmsetType {
  id: string;
  main_profit: number;
  other_profit: number;
  gross_profit: number;
}

const Omset = () => {
  const router = useRouter();
  const { date, id } = router.query;
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()

  const [omset, setOmset] = useState<OmsetType>()
  const [mainProfit, setMainProfit] = useState<number>()
  const [otherProfit, setOtherProfit] = useState<number>()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const [showModal, setShowModal] = useState<boolean>(false)
  console.log({date})

  useEffect(() => {
    if (router?.query?.id && router?.query?.date) {
      fetchOmset()
    }
  }, [date, id])

  const fetchOmset = async () => {
    try {
      setLoading(true)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/daily-report/omset?date=${date}&id=${id}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })

      if (response?.data?.data) {
        setOmset(response?.data?.data)
        setMainProfit(response.data.data.main_profit > 0 && response.data.data.main_profit)
        setOtherProfit(response.data.data.other_profit > 0 && response.data.data.other_profit)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  console.log({omset})

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
    setMainProfit(omset?.main_profit)
    setOtherProfit(omset?.other_profit)
    setIsUpdate(false)
  }
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-start mx-auto'>Silahkan Input Data Hari Ini (30 Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white">Omset</p>
          <div className="flex flex-col gap-4 h-[18rem]">
            <div className="flex flex-col">
              <p className="text-white">Omset</p>
              <div className="flex justify-between mt-4 mb-4">
                <NumericFormat
                  thousandSeparator={true}
                  // prefix={'Rp'}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  placeholder="Masukkan Omset Utama"
                  onValueChange={(values: any) => {
                    const { formattedValue, value } = values;
                    // formattedValue = "$1,234.56", value = "1234.56"
                    console.log(value);
                    setMainProfit(value)
                  }}
                  className={`bg-[#FFF8D6] w-[80%] h-[2rem] rounded-xl py-2 px-3 ${!isUpdate && "disabled:opacity-60"}`}
                  value={mainProfit || null}
                  disabled={isUpdate ? false : true}
                />
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <p className="text-white">Omset Lainnya</p>
              <div className="flex justify-between mt-4 mb-4">
                <NumericFormat
                  thousandSeparator={true}
                  // prefix={'Rp'}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  placeholder="Masukkan Omset Lainnya"
                  onValueChange={(values: any) => {
                    const { formattedValue, value } = values;
                    // formattedValue = "$1,234.56", value = "1234.56"
                    console.log(value);
                    setOtherProfit(value)
                  }}
                  className={`bg-[#FFF8D6] w-[80%] h-[2rem] rounded-xl py-2 px-3 ${!isUpdate && "disabled:opacity-60"}`}
                  value={otherProfit || null}
                  disabled={isUpdate ? false : true}
                />              
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
          {showModal && (
            <ModalConfirm onApproved={handleApproved} setShowModal={setShowModal} header="Omset" headerTitle='omset'/>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Omset