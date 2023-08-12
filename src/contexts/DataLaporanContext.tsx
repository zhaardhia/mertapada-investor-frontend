import React, { useContext, useReducer, ReactNode } from "react";
import { useRouter } from 'next/router'

interface ContextValue {
  state: any;
  dispatch: any;
}

interface CategoryType {
  id: string;
  name: string;
  filled: boolean;
}

const DataLaporanContext = React.createContext<ContextValue | undefined>(undefined);

function dataLaporanReducer(state: any, action: { type: string; payload: any; }) {
  switch (action.type) {
    case "setCurrentCategory": {
      return {
        ...state,
        currentCategory: action.payload
      }
    }
  }
}

export function DataLaporanProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataLaporanReducer, { currentCategory: {} })
  const router = useRouter()

  const value = {state, dispatch}
  return <DataLaporanContext.Provider value={value}>{children}</DataLaporanContext.Provider>
}

export function useDataLaporan() {
  const context = useContext(DataLaporanContext)

  if (context === undefined) {
    throw new Error('useDataLaporan must be used within a CountProvider')
  }
  return context
}
