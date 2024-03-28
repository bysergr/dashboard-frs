import { ResponseAmountRegistered } from "@/models/airtable";

export async function getAmountRegistered(): Promise<ResponseAmountRegistered> {

    const resp = await fetch('/api/subscribers')

    const data = await resp.json() as ResponseAmountRegistered

    return data
}