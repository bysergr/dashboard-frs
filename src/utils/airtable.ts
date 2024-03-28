import Airtable, { FieldSet, Records } from "airtable";

var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY, }).base(process.env.AIRTABLE_BASE);

export const airtableApplicationProcess = base('Fundraising School - Application Process')

export function getAirtableRegistered(): Promise<Records<FieldSet>> {
    return new Promise((resolve, reject) => {
        airtableApplicationProcess.select({
        }).all().then((records) => {
            resolve(records);
        }).catch((error) => {
            console.log("Error Airtable: ", error)

            reject(error);
        })
    })
}

