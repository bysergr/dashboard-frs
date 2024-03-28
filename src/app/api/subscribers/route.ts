export const dynamic = "force-dynamic";

import { Country, AmountRegisteredByCountry, createAmountRegisteredByCountry, ResponseAmountRegistered, DayAmountRegistered } from "@/models/airtable"
import { getAirtableRegistered } from "@/utils/airtable"
import { FieldSet, Records } from "airtable"

export async function GET(): Promise<Response> {

    let registeredByCountry: AmountRegisteredByCountry = createAmountRegisteredByCountry()
    let registeredByCountryWithoutTraction: AmountRegisteredByCountry = createAmountRegisteredByCountry()
    let registeredByCountryWithTraction: AmountRegisteredByCountry = createAmountRegisteredByCountry()
    let registeredNotEntrepreneurs: AmountRegisteredByCountry = createAmountRegisteredByCountry()

    const records: Records<FieldSet> = await getAirtableRegistered()
    records.forEach((record) => {
        const country = record.get('Country') as Country;
        registeredByCountry[country] += 1;

        if (record.get('Type of applicant') === 'Founder ') {
            if (record.get('Traction') === 'Pre-Revenue') {
                registeredByCountryWithoutTraction[country] += 1;
            } else {
                registeredByCountryWithTraction[country] += 1;
            }
        } else {
            registeredNotEntrepreneurs[country] += 1;
        }
    })

    const currentDay = new Date().toISOString().split('T')[0]
    let todayAmountRegistered: DayAmountRegistered = {
        date: currentDay,
        values: {
            AmountByCountryTotal: registeredByCountry,
            AmountByCountryWithTraction: registeredByCountryWithTraction,
            AmountByCountryWithoutTraction: registeredByCountryWithoutTraction,
            AmountNotEntrepreneurs: registeredNotEntrepreneurs
        }
    }

    let resp: ResponseAmountRegistered = {
        TotalDays: 1,
        Days: [todayAmountRegistered]
    }


    return Response.json(resp)
}