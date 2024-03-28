'use client'


import PulseLoader from "react-spinners/PulseLoader";
import { DayAmountRegistered, createAmountRegisteredByCountry } from '@/models/airtable'
import { calculateDaysPassed } from '@/utils/time'
import { useAmountRegisteredStore } from "@/providers/amount-registered-store-provider";

export default function NotEntrepreneurs() {
    const { Days, isLoading } = useAmountRegisteredStore((state) => state)

    return (
        <section className='component w-full sm:w-auto sm:min-w-[360px]'>
            <div className="flex justify-between items-center">
                <h2 className='px-4 font-semibold text-lg my-4'>Not Entrepreneurs</h2>
                <PulseLoader color='#ffffff' loading={isLoading} size={8} cssOverride={{ paddingRight: "15px" }} />
            </div>
            <div className="relative overflow-x-auto overflow-y-auto h-96 shadow-md">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead>
                        <tr>
                            <th className="px-6 py-4 w-28">Country</th>
                            {
                                Days.map((day) => (
                                    <th key={day.date} className="px-6 py-4">  {calculateDaysPassed(day.date) === 0 ? 'Today' : `Today - ${calculateDaysPassed(day.date)}`}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(createAmountRegisteredByCountry()).map(([country, _]) => {
                            return (
                                < tr key={country} className='border-b bg-gray-800 border-gray-700' >
                                    <td className="text-white px-6 py-4">{country}</td>
                                    {
                                        Days.map((day) => {
                                            return (
                                                <td key={day.date} className="text-white px-6 py-4">
                                                    {day.values.AmountNotEntrepreneurs[country as keyof DayAmountRegistered['values']['AmountByCountryTotal']]}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })}
                        <tr key='Total' className='border-b bg-gray-800 border-gray-700'>
                            <td className='text-white font-semibold px-6 py-4'>Total</td>
                            {
                                Days.map((day) => {
                                    return (
                                        <td key={day.date} className="text-white px-6 py-4">
                                            {Object.values(day.values.AmountNotEntrepreneurs).reduce((acc, curr) => acc + curr, 0)}
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}
