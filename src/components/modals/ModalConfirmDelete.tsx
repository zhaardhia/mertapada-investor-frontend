import React, { useEffect, useState } from "react";
import { useSessionUser } from '../../contexts/SessionUserContext'
import { motion } from "framer-motion";
import { animateVibrate, animateFromAboveSlower } from "../../animations/animation";
import { SelectedDeleteType } from "@/types/employee";
interface ModalConfirmType {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onApproved: () => Promise<void>;
  header: string;
  headerTitle: string;
  nameToBeDeleted: string | undefined;
}

const ModalConfirmDelete: React.FC<ModalConfirmType> = ({ setShowModal, onApproved, header, headerTitle, nameToBeDeleted }) => {
  const { axiosJWT, state } = useSessionUser()
  const [msgError, setMsgError] = useState<string>()
  const [msgSuccess, setMsgSuccess] = useState<string>()

  const handleApproved = () => {
    try {
      onApproved()
      setMsgSuccess(`Sukses menghapus ${headerTitle} dengan nama ${nameToBeDeleted}.`)
    } catch (error) {
      console.error(error)
      setMsgError(`Gagal menghapus ${headerTitle}. Silahkan hubungi admin`)
    }
    setTimeout(() => {
      setShowModal(false)
    }, 4000)
  }
  
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[90%] mx-auto bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl text-center font-semibold">{header}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                // onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p>Apakah anda yakin akan menghapus <strong>{headerTitle}</strong> dengan nama {nameToBeDeleted}?</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Batalkan
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                // onClick={() => {
                //   if (type === "to_shipment") handleVerifyShipment()
                //   else if (type === "to_verif_payment") handleVerifyPayment()
                // }}
                onClick={handleApproved}
              >
                Ya, saya yakin
              </button>
            </div>
            <motion.div
              className={`border-2 border-green-500 rounded-xl p-2 ${msgSuccess ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto my-10`}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.5 }}
              variants={animateFromAboveSlower}
            >
              <p className="text-green-500 text-center">{msgSuccess}</p>
            </motion.div>
            <motion.div
              className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto my-10`}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.5 }}
              variants={animateVibrate}
            ><p className="text-red-500 text-center">{msgError}</p></motion.div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalConfirmDelete;
