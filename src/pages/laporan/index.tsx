import React, { useRef } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { createPDF } from '@/utils/util';
import moment from 'moment';
import { Icon } from '@iconify/react';

const Laporan = () => {
  const router = useRouter();
  const { date } = router.query;
  const category: Array<string> = ["Lauk - pauk", "Bumbu - bumbuan", "Sembako - Minuman", "Lain - Lain"]
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10" ref={pdfContainerRef} id="pdf">
        <div className="bg-[#2D4356] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5 mt-10">
          <p className="text-2xl text-white text-center">Silahkan Pilih Kategori Laporan</p>
          <div className="flex flex-col gap-4 my-5">
            <Link href="/laporan/bagi-hasil" className="p-3 bg-[#435B66] hover:bg-[#4c6069] rounded-xl text-white sm:text-base text-sm flex gap-2 items-center underline">
              <Icon icon="game-icons:profit" />
              <p>Laporan Bagi Hasil</p>
            </Link>
            <Link href="/laporan/bulanan" className="p-3 bg-[#435B66] hover:bg-[#4c6069] rounded-xl text-white sm:text-base text-sm flex gap-2 items-center underline">
              <Icon icon="ic:baseline-calendar-month" />
              <p>Laporan Bulanan</p>
            </Link>
          </div>
          
          <div className="text-white flex justify-end gap-2 w-[70%] ml-[30%]">
            {/* <button className="p-2 bg-[#3B71CA] rounded-lg text-white"
              onClick={() => createPDF(pdfContainerRef.current)}
            >Download PDF</button> */}
            {/* <Link className="p-2 bg-[#3B71CA] rounded-lg text-white"
              href={`/laporan/01`}
            >Rincian</Link> */}
            <Link href={`/home`} className="p-2 bg-[#14A44D] rounded-lg text-white">Kembali</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Laporan