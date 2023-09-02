import Link from 'next/link';
import React, { FC, useMemo } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { RecapDetailCategoryShop, RecapDetailPriceShop } from '@/types/laporan'
import { LaporanBulananType } from '@/types/laporanBulanan'
import { formatRupiah } from '@/utils/util'

type DataBulanan = {
  monthlyData: LaporanBulananType[]
}

const LabaRugiDetailTable: FC<DataBulanan> = ({ 
  monthlyData
}) => {
  const arrHeader: any[] = []

  for (const headerReport in monthlyData[0]) {
    const obj = {
      name: monthlyData[0][headerReport as keyof LaporanBulananType],
      selector: (row: LaporanBulananType) => row[headerReport as keyof LaporanBulananType] ?? '',
      // cell: (row: LaporanBulananType) => typeof(row[headerReport as keyof LaporanBulananType]) === "number" ? formatRupiah(row[headerReport as keyof LaporanBulananType]) : typeof(row[headerReport as keyof LaporanBulananType]) === "string" ? row[headerReport as keyof LaporanBulananType] : '',

      cell: (row: LaporanBulananType) => (
        <p className="text-primary w-[6rem]">
          {typeof(row[headerReport as keyof LaporanBulananType]) === "number" ? formatRupiah(row[headerReport as keyof LaporanBulananType]) : typeof(row[headerReport as keyof LaporanBulananType]) === "string" ? row[headerReport as keyof LaporanBulananType] : ''}
        </p>
      ),
    }
    arrHeader.push(obj)
  }
  console.log({monthlyData})
  const columns: TableColumn<LaporanBulananType>[] = useMemo(
    () => arrHeader,
    []
  );

  return (
    <DataTableExtensions
      className="paid"
      columns={columns}
      data={monthlyData}
      exportHeaders
    >
      <DataTable
        noHeader
        paginationServer
        sortServer
        data={monthlyData}
        columns={columns}
      />
    </DataTableExtensions>
  )
}

export default LabaRugiDetailTable
