import Airtable, { FieldSet, Records } from "airtable";

var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY, }).base(process.env.AIRTABLE_BASE);

export function getAirtableRegistered(): Promise<Records<FieldSet>> {
    return new Promise((resolve, reject) => {
        airtableApplicationProcess.select({
        }).all().then((records) => {
            resolve(records);
        }).catch((error) => {
            reject(error);
        })
    })
}

export const airtableApplicationProcess = base('Fundraising School - Application Process')
