import React, { useEffect, useState } from "react";
import { useSessionUser } from '../../contexts/SessionUserContext'
import { motion } from "framer-motion";
import { animateVibrate, animateFromAboveSlower } from "../../animations/animation";

interface ModalConfirmType {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onApproved: () => Promise<void>;
  header: string;
  headerTitle: string;
  setSure: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ModalConfirmFinal: React.FC<ModalConfirmType> = ({ setShowModal, onApproved, header, headerTitle, setSure }) => {
  const { axiosJWT, state } = useSessionUser()
  const [msgError, setMsgError] = useState<string | null>(null)
  const [msgSuccess, setMsgSuccess] = useState<string | null>(null)
  
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[90%] overflow-y-auto max-h-screen mx-auto bg-white outline-none focus:outline-none">
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
              <p className="font-bold mb-5">Akan terjadi kesalahan fatal apabila terdapat kesalahan data yang sudah ter-verifikasi tahap akhir.</p>
              <p>Berikut saran yang dapat diikuti untuk menghindari kesalahan fatal:</p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-3 text-sm">
                <li>Cek kembali data-data yang sudah diinput, perhatikan apakah semua yang diinput sudah benar.</li>
                <li>Apabila terdapat data yang salah, segera hubungi pengurus / investor agar data dapat diubah terlebih dahulu melalui database, sebelum melakukan tahap verifikasi akhir.</li>
              </ul>
            </div>
            <div className="p-6 flex flex-col gap-2">
              <p>Ketik <strong>SAYA YAKIN</strong> dengan huruf besar untuk melanjutkan verifikasi.</p>
              <input type="text" name="" id="" className="w-[80%] bg-slate-200 rounded-lg py-2 px-3" 
                onChange={(e) => setSure(e.target.value)}
              />
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
                onClick={onApproved}
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

export default ModalConfirmFinal;
