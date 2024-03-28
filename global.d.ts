declare namespace NodeJS {
    interface ProcessEnv {
        readonly AIRTABLE_KEY: string;
        readonly AIRTABLE_BASE: string;
    }
}