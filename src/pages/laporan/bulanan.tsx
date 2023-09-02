import React, { useEffect, useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDataLaporan } from '../../contexts/DataLaporanContext'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { formatRupiah, getMonthReport } from '@/utils/util';
import { RecapDetailCategoryShop } from '@/types/laporan';
import FinalRecapDetailTable from '@/components/excel/FinalRecapDetailTable';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { LaporanBulananType } from '@/types/laporanBulanan';
import { MonthSelect } from '@/types/dates';
import { BounceLoader } from 'react-spinners';
import 'moment/locale/id';  // Import the Indonesian locale
moment.locale('id');

const DynamicLabaRugiDetailDataTable = dynamic(() => import('@/components/excel/LabaRugiDetailTable'), { ssr: false })
const DynamicMonthlyRecapTable = dynamic(() => import('@/components/excel/MonthlyRecapTable'), { ssr: false })

type Option = { value: string; label: string };
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

  const [monthOptions, setMonthOptions] = useState<MonthSelect[]>()
  const [selectedMonth, setSelectedMonth] = useState<Option | null>({label: moment().format("MMMM YYYY"), value: moment().format("YYYY-MM")})
  const [laporanBulanan, setLaporanBulanan] = useState<LaporanBulananType[]>([])

  const [tabSwitch, setTabSwitch] = useState<string>('dataBelanja') 
  const [isAllowedNext, setIsAllowedNext] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  // useEffect(() => {
  //   if (router?.query?.date && router?.query?.id) {
  //     fetchFinalRecap()
  //   }
  // }, [date, id])

  useEffect(() => {
    setMonthOptions(getMonthReport())
  }, [])

  useEffect(() => {
    fetchFinalRecap()
  }, [selectedMonth])

  const fetchFinalRecap = async () => {
    try {
      setLoading(true)
      // const categoryId: string = currentCategory.id ? currentCategory.id : findCategoryShopExpense(categoryShop)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/monthly-recap/laporan-bulanan?month=${moment(selectedMonth?.value).format("MM")}&year=${moment(selectedMonth?.value).format("YYYY")}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response)

      if (response?.data?.data) {
        setLaporanBulanan(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleChangeMonth = (newValue: Option | null, actionMeta: ActionMeta<Option>) => {
    setSelectedMonth(newValue);
    console.log({newValue})
  };

  console.log({laporanBulanan})
  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10 text-black">
        <div className="bg-[#2D4356] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white text-center">Rekap Data Bagi Hasil {moment(selectedMonth?.value).format("MMMM YYYY")}</p>
          <BounceLoader className="mx-auto" loading={loading} color="#e5f3f0" />
          <Select
            className="basic-single w-full rounded-xl mx-auto"
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
          />
          <div className="flex flex-col gap-4 rounded-lg w-full">
            {loading ? (
              <p>loading...</p>
            ) : laporanBulanan[0]?.day1 ? (
              <DynamicMonthlyRecapTable monthlyData={laporanBulanan} />
            ) : <p className="text-center text-white">Belum ada data harian yang terisi pada bulan ini.</p>
            }
            {/* {laporanBulanan.length > 0 && (
              <DynamicMonthlyRecapTable monthlyData={laporanBulanan} />
            )} */}
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
