import Image from 'next/image'
import { Inter } from 'next/font/google'
import bg from '../../public/bg-monda.png'
import LayoutLogin from '@/components/LayoutLogin'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <LayoutLogin>
      <div className="flex flex-col sm:gap-0 gap-10">
        <p className="text-3xl text-center">Warteg Kharisma Bahari Mertapada</p>
        <div className="flex flex-col gap-5 w-full sm:w-auto sm:mt-14 bg-[#617A55] p-10 rounded-3xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-light text-white">Masuk Sebagai Pengelola</h1>
            <p className="text-[#B4B4B4]">Masuk untuk melanjutkan mengurus laporan</p>
          </div>
          <div className="flex flex-col gap-4 w-full ">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-[100%] rounded-xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm p-2"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex flex-col gap-2 w-full">
              <input
                // type={visiblePass ? "text" : "password"}
                type="text"
                placeholder="Kata Sandi"
                className="w-[100%] rounded-xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm p-2"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex gap-3 items-center sm:w-full w-[95%] justify-start mt-2">
                <input
                  type="checkbox"
                  className="focus:border-0"
                  // checked={visiblePass}
                  // onChange={(e) => setVisiblePass(e.target.checked)}
                />
                <p className="text-slate-100 text-sm">Buka Password</p>
              </div>

            </div>
          </div>
          {/* <div
            className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"}`}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.5 }}
            variants={animateVibrate}
          >
            <p className="text-red-500">{msgError}</p>
          </div> */}
          <div className="flex justify-end">
            <button type="submit" className="bg-[#3B71CA] hover:bg-[#2d63ba] text-white text-xl px-7 py-2 rounded-xl" 
              // onClick={() => submitUser()}
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </LayoutLogin>
  )
}
