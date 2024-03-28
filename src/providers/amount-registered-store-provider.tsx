'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type AmountRegisteredStore, createAmountRegisteredStore } from '@/store/amount-registered-store'

export const AmountRegisteredStoreContext = createContext<StoreApi<AmountRegisteredStore> | null>(
    null,
)

export interface AmountRegisteredStoreProviderProps {
    children: ReactNode
}

export const AmountRegisteredStoreProvider = ({
    children,
}: AmountRegisteredStoreProviderProps) => {
    const storeRef = useRef<StoreApi<AmountRegisteredStore>>()
    if (!storeRef.current) {
        storeRef.current = createAmountRegisteredStore()
    }

    return (
        <AmountRegisteredStoreContext.Provider value={storeRef.current}>
            {children}
        </AmountRegisteredStoreContext.Provider>
    )
}

export const useAmountRegisteredStore = <T,>(
    selector: (store: AmountRegisteredStore) => T,
): T => {
    const amountRegisteredStoreContext = useContext(AmountRegisteredStoreContext)

    if (!amountRegisteredStoreContext) {
        throw new Error(`useAmountRegisteredStore must be use within AmountRegisteredStoreProvider`)
    }

    return useStore(amountRegisteredStoreContext, selector)
}