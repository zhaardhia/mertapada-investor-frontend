import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionUserProvider } from "../contexts/SessionUserContext";
import { DataLaporanProvider } from "../contexts/DataLaporanContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionUserProvider>
      <DataLaporanProvider>
        <Component {...pageProps} />
      </DataLaporanProvider>
    </SessionUserProvider>
  )
}
