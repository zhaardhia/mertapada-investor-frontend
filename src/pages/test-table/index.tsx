import Link from 'next/link';
import React, { useMemo } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import dynamic from 'next/dynamic';
const DynamicDataTable = dynamic(() => import('../../components/excel/TestTable'), { ssr: false });

type MyData = {
  memberId: string;
  customerId: string;
  customer: {
    email: string;
    name: string;
  };
  // ...other properties
};

const index = () => {

  // const columns = useMemo(
  //   () => [
  //     {
  //       name: 'ID Member',
  //       selector: 'memberId',
  //       sortField: 'memberId',
  //       cell: (row: { memberId: string; }) => row?.memberId
  //     },
  //     {
  //       name: 'Pelanggan',
  //       selector: 'customerId',
  //       cell: (row: { customerId: string; }) => row?.customerId
  //     },
  //     {
  //       name: 'Email',
  //       selector: 'customer.email'
  //     },
  //     {
  //       name: 'Nama',
  //       selector: 'customer.name'
  //     }
  //   ],
  //   []
  // );

  // const columns: TableColumn<MyData>[] = [
  //   { name: 'Member ID', selector: (row) => row.memberId, sortable: true },
  //   { name: 'Customer ID', selector: (row) => row.customerId, sortable: true },
  //   { name: 'Email', selector: (row) => row.customer.email, sortable: true },
  //   { name: 'Name', selector: (row) => row.customer.name, sortable: true },
  //   // ...other columns
  // ];

  // const data: MyData[] = useMemo(() => [
  //   {
  //     memberId: "xxx",
  //     customerId: "mmmm",
  //     customer: {
  //       email: "fff@GMAIL.COM",
  //       name: "nnnn"
  //     }
  //   },
  //   {
  //     memberId: "xxx",
  //     customerId: "mmmm",
  //     customer: {
  //       email: "fff@GMAIL.COM",
  //       name: "nnnn"
  //     }
  //   }
  // ], []) 

  return (
    // <DataTableExtensions
    //   className="paid"
    //   columns={columns}
    //   data={data}
    //   filterPlaceholder="Filter Halaman"
    //   exportHeaders
    // >
    //   <DataTable
    //     noHeader
    //     paginationServer
    //     sortServer
    //     data={data}
    //     columns={columns}
    //   />
    // </DataTableExtensions>
    <div>
      <DynamicDataTable />
    </div>
  )
}

export default index