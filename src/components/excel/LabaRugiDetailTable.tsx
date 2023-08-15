import Link from 'next/link';
import React, { FC, useMemo } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { RecapDetailCategoryShop, RecapDetailPriceShop } from '@/types/laporan'
import { formatRupiah } from '@/utils/util'
type MyData = {
  name: string | null;
  inherit: string | null
  totalInherit: string | null;
  total: string | null;
};

const LabaRugiDetailTable: FC = ({ 
  
}) => {

  const columns: TableColumn<MyData>[] = useMemo(
    () => [
      {
        name: 'Nama Harga',
        selector: (row: MyData) => row.name ?? '', 
        cell: (row: MyData) => row.name ?? ''
      },
      {
        name: 'Turunan Jenis',
        selector: (row: MyData) => row.inherit ?? '', 
        cell: (row: MyData) => row.inherit ?? ''
      },
      { 
        name: 'Total Turunan', 
        selector: (row: MyData) => row.totalInherit ?? '', 
        cell: (row: MyData) => row.totalInherit ?? ''
      },
      { 
        name: 'Total', 
        selector: (row: MyData) => row.total ?? '', 
        cell: (row: MyData) => row.total ?? ''
      }
    ],
    []
  );

  const data: MyData[] = useMemo(() => [
    {
      name: "Pendapatan / Omset",
      inherit: "",
      totalInherit: "",
      total: formatRupiah(64000000)
    },
    {
      name: "Pengeluaran Belanja",
      inherit: "",
      totalInherit: "",
      total: formatRupiah(64000000)
    },
    {
      name: "Rincian:",
      inherit: "Lauk - Pauk",
      totalInherit: formatRupiah(64000000),
      total: ""
    },
    {
      name: "",
      inherit: "Bumbu - Sayuran",
      totalInherit: formatRupiah(64000000),
      total: ""
    },
    {
      name: "",
      inherit: "Sembako - Minuman",
      totalInherit: formatRupiah(64000000),
      total: ""
    },
    {
      name: "",
      inherit: "Lain - Lain",
      totalInherit: formatRupiah(64000000),
      total: ""
    },
    {
      name: "Keuntungan Kotor",
      inherit: "",
      totalInherit: "",
      total: formatRupiah(64000000)
    },
    {
      name: "-----",
      inherit: "-----",
      totalInherit: "-----",
      total: "-----"
    },
    {
      name: "Bagi hasil Investor (50%)",
      inherit: "",
      totalInherit: "",
      total: formatRupiah(64000000)
    },
    {
      name: "Bagi hasil Pengelola (50%)",
      inherit: "",
      totalInherit: "",
      total: formatRupiah(64000000)
    },
    {
      name: "-----",
      inherit: "-----",
      totalInherit: "-----",
      total: "-----"
    },
    {
      name: "Transfer ke Investor",
      inherit: "",
      totalInherit: "",
      total: formatRupiah(64000000)
    },
    {
      name: "Rincian:",
      inherit: "Bagi Hasil",
      totalInherit: formatRupiah(64000000),
      total: ""
    },
    {
      name: "",
      inherit: "Sewa",
      totalInherit: formatRupiah(64000000),
      total: ""
    },
    {
      name: "",
      inherit: "Sisa Modal Awal",
      totalInherit: formatRupiah(64000000),
      total: ""
    },
  ], []) 

  return (
    <DataTableExtensions
      className="paid"
      columns={columns}
      data={data}
      // filterPlaceholder="Filter Halaman"
      exportHeaders
    >
      <DataTable
        noHeader
        paginationServer
        sortServer
        data={data}
        columns={columns}
      />
    </DataTableExtensions>
  )
}

export default LabaRugiDetailTable