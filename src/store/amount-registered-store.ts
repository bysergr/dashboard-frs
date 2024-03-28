import { createStore } from 'zustand/vanilla'
import { produce } from 'immer'
import type { ResponseAmountRegistered } from '@/models/airtable'


type GeneralState = {
    isLoading: boolean
    hasError: boolean
}

export type AmountRegisteredState = ResponseAmountRegistered & GeneralState

export type AmountRegisteredActions = {
    setData: (newValues: ResponseAmountRegistered) => void
    setIsLoading: (isLoading: boolean) => void
    setHasError: (hasError: boolean) => void
}

export type AmountRegisteredStore = AmountRegisteredState & AmountRegisteredActions

export const createAmountRegisteredStore = () => {
    return createStore<AmountRegisteredStore>()((set) => ({
        TotalDays: 0,
        Days: [],
        isLoading: true,
        hasError: false,
        setData: (newValues: ResponseAmountRegistered) => set(produce((state) => {
            state.Days = newValues.Days
            state.TotalDays = newValues.TotalDays
        })),
        setIsLoading: (isLoading: boolean) => set(produce((state) => {
            state.isLoading = isLoading
        })),
        setHasError: (hasError: boolean) => set(produce((state) => {
            state.hasError = hasError
        })),
    }))
}










