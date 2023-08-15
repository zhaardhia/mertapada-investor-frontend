import Link from 'next/link';
import React, { useMemo } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

type MyData = {
  name: string;
  category: string;
  quantity: string;
  unit_type: string;
  price: string;
};
type SelectorType<T> = (row: T) => any;

const TestTable = () => {

  const columns: TableColumn<MyData>[] = useMemo(
    () => [
      {
        name: 'Name',
        selector: (row: MyData) => row.name, 
        cell: (row: MyData) => row.name
      },
      { 
        name: 'Kategori', 
        selector: (row: MyData) => row.category, 
        cell: (row: MyData) => row.category 
      },
      { 
        name: 'Jumlah', 
        selector: (row: MyData) => row.quantity, 
        cell: (row: MyData) => row.quantity 
      },
      { 
        name: 'Satuan', 
        selector: (row: MyData) => row.unit_type, 
        cell: (row: MyData) => row.unit_type 
      },
      { 
        name: 'Harga', 
        selector: (row: MyData) => row.price, 
        cell: (row: MyData) => row.price 
      }
    ],
    []
  );

  const data: MyData[] = useMemo(() => [
    {
      name: "Ayam",
      category: "Lauk - Pauk",
      quantity: "5",
      unit_type: "kg",
      price: "120.000"
    },
    {
      name: "Bumbu Gado Gado",
      category: "Lauk - Pauk",
      quantity: "4",
      unit_type: "kg",
      price: "70.000"
    },
    {
      name: "====",
      category: "====",
      quantity: "====",
      unit_type: "====",
      price: "===="
    },
    {
      name: "Bawang Merah",
      category: "Bumbu - Sayuran",
      quantity: "4",
      unit_type: "kg",
      price: "60.000"
    },
    {
      name: "Bawang Putih",
      category: "Bumbu - Sayuran",
      quantity: "5",
      unit_type: "kg",
      price: "50.000"
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

export default TestTable