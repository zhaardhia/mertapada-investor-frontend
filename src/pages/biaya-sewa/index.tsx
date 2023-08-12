import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react';
import { useSessionUser } from '@/contexts/SessionUserContext';
import { SelectedDeleteType, EmployeeType } from '@/types/employee';
import ModalKaryawanGaji from '@/components/modals/ModalKaryawanGaji';
import ModalConfirm from '@/components/modals/ModalConfirm';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete';
import { NumericFormat } from 'react-number-format';

const BiayaSewa = () => {
  const router = useRouter();
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()

  const [loading, setLoading] = useState<boolean>(false)
  const [biayaSewa, setBiayaSewa] = useState<EmployeeType[]>([])
  const [biayaSewaOrigin, setBiayaSewaOrigin] = useState<EmployeeType[]>([])
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
  const [selectedDelete, setSelectedDelete] = useState<SelectedDeleteType>()

  useEffect(() => {
    fetchAllBiayaSewa()
  }, [])

  const fetchAllBiayaSewa = async () => {
    try {
      setLoading(true)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/biaya-sewa`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })

      if (response?.data?.data) {
        setBiayaSewa(response?.data?.data)
        setBiayaSewaOrigin(response?.data?.data)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  
  const handleAddBiayaSewa = async (karyawan: EmployeeType) => {
    let addKaryawan = null;
    try {
      addKaryawan = await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/employee`, 
        {
          employeeItems: [karyawan]
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
      setBiayaSewa([...biayaSewa, karyawan])
      setBiayaSewaOrigin([...biayaSewaOrigin, karyawan])
      setShowModalAdd(false)
    } catch (error) {
      console.error(error)
    }
    return addKaryawan?.message || "Gagal saat melakukan verifikasi"
  }

  const handleUpdateBiayaSewa = async () => {
    let updateKaryawan = null;
    try {
      updateKaryawan = await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/employee`, 
        {
          employeeItems: biayaSewa
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )

      setBiayaSewaOrigin([...biayaSewa])
      setIsUpdate(false)
    } catch (error) {
      console.error(error)
      throw error
    }
    setIsUpdate(false)
    return updateKaryawan?.message || "Gagal saat melakukan verifikasi"
  }

  const updatePriceBiayaSewa = (value: any, obj: EmployeeType) => {
    setBiayaSewa(current => 
      current.map(item =>
        item.id === obj.id ? { ...obj, salary: +value } : item
      )
    );
  }

  const handleCancelEdit = () => {
    setBiayaSewa(biayaSewaOrigin)
    setIsUpdate(false)
  }

  const handleDeleteBiayaSewa = async () => {
    let updateKaryawan = null;
    try {
      updateKaryawan = await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/employee`, 
        {
          id: selectedDelete?.id
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )

      setBiayaSewaOrigin([...biayaSewa.filter((employee: EmployeeType) => employee.id !== selectedDelete?.id)])
      setBiayaSewa([...biayaSewa.filter((employee: EmployeeType) => employee.id !== selectedDelete?.id)])
      setIsUpdate(false)
    } catch (error) {
      console.error(error)
      throw error
    }
    setIsUpdate(false)
    setSelectedDelete(undefined)
    return updateKaryawan?.message || "Gagal saat melakukan verifikasi"
  }
  console.log({showModalConfirm})

  return (
    <Layout>
      <div className="flex flex-col gap-10 mt-10">
        <p className='text-2xl text-center mx-auto'>Pengaturan Biaya Sewa untuk Bulan Ini (Juli 2023)</p>
        <div className="bg-[#617A55] rounded-2xl sm:w-[80%] w-full p-5 mx-auto flex flex-col gap-5">
          <p className="text-2xl text-white">Biaya Sewa</p>
          <div className="flex flex-col gap-4 h-[18rem]">
            <div className="flex flex-col">
              <p className="text-white">Rumah Makan</p>
              <div className="flex justify-between items-center mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
                <button>
                  <Icon icon="zondicons:minus-solid" className="text-3xl text-[#FF3B30]" />
                </button>
              </div>
              <hr />
            </div>
            <div className="flex flex-col">
              <p className="text-white">Lain - lain</p>
              <div className="flex justify-between items-center mt-4 mb-4">
                <input type="text" className="bg-[#FFF8D6] w-[45%] h-[2rem] rounded-xl p-2 text-center" value={5000}/>
                <button>
                  <Icon icon="zondicons:minus-solid" className="text-3xl text-[#FF3B30]" />
                </button>
              </div>
              <hr />
            </div>
            <button className="text-white text-2xl border border-[#CECECE] w-[80%] mx-auto rounded-lg shadow-lg">+</button>
          </div>
          <div className="text-white text-sm">
            <p>Catatan:</p>
            <p>* Biaya sewa yang diubah akan berpengaruh pada pencatatan laporan bulan ini & seterusnya. Pastikan anda telah memasukkan nilai biaya sewa dengan benar</p>
          </div>
          <div className="text-white flex justify-between">
            {!isUpdate ? (
              <>
                <Link href={`/home`} className="p-2 bg-transparent border border-white rounded-lg text-white">Kembali</Link>
                <button className="p-2 bg-[#E4A11B] rounded-lg text-white" onClick={() => setIsUpdate(!isUpdate)}>Ubah Data</button>
              </>
            ) : (
              <>
                <button className="p-2 bg-transparent border border-white rounded-lg text-white" onClick={handleCancelEdit}>Batal</button>
                <button className="p-2 bg-[#14A44D] rounded-lg text-white" onClick={() => setShowModalConfirm(true)} >Simpan Data</button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BiayaSewa