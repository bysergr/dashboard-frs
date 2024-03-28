'use client'

import GeneralSubscribers from "@/components/GeneralSubscribers";
import EntrepreneursWithTraction from "@/components/EntrepreneursWithTraction";
import EntrepreneursWithoutTraction from "@/components/EntrepreneursWithoutTraction";
import NotEntrepreneurs from "@/components/NotEntrepreneurs";
import { useAmountRegisteredStore } from "@/providers/amount-registered-store-provider";
import { getAmountRegistered } from "@/utils/getData";
import { useEffect } from "react";

export default function Home() {
  const { setData, setIsLoading, setHasError, TotalDays } = useAmountRegisteredStore((state) => state)

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true)

      getAmountRegistered().then((data) => {
        const sortedDays = data.Days.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setData({ TotalDays: data.TotalDays, Days: sortedDays })
      }).catch(() => {
        setHasError(true)
      }).finally(() => {
        setIsLoading(false)
      })
    }

    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 1000 * 60)

    return () => {
      clearInterval(interval)
    }

  }, [setData, setHasError, setIsLoading])


  return (
    <main className="bg-gray-950 w-full min-h-screen px-6">
      <header className="sm:flex justify-between items-center py-4">
        <h1 className="text-white font-semibold text-2xl sm:py-8 py-4">Dashboard - Fundraising School</h1>
        <span className="text-white font-medium">{`Data from ${TotalDays > 1 ? `${TotalDays} days` : `${TotalDays} day`}`}</span>
      </header>
      <div className="flex flex-wrap w-full gap-6">
        <GeneralSubscribers />
        <EntrepreneursWithTraction />
        <EntrepreneursWithoutTraction />
        <NotEntrepreneurs />
      </div>
    </main>
  );
}
