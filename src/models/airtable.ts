export type Country = "Colombia" | "Venezuela" | "Brazil" | "Argentina" | "Chile" | "Ecuador" | "México" | "Perú" | "Other" | "Panama" | "United States";

export type AmountRegisteredByCountry = {
    [key in Country]: number;
};

export type DayAmountRegistered = {
    date: string,
    values: {
        AmountByCountryTotal: AmountRegisteredByCountry,
        AmountByCountryWithTraction: AmountRegisteredByCountry,
        AmountByCountryWithoutTraction: AmountRegisteredByCountry,
        AmountNotEntrepreneurs: AmountRegisteredByCountry
    }
}

export function createAmountRegisteredByCountry(): AmountRegisteredByCountry {
    return {
        "United States": 0,
        "Colombia": 0,
        "Venezuela": 0,
        "Brazil": 0,
        "Argentina": 0,
        "Chile": 0,
        "Ecuador": 0,
        "México": 0,
        "Perú": 0,
        "Panama": 0,
        "Other": 0,
    };
}


export type ResponseAmountRegistered = {
    TotalDays: number,
    Days: DayAmountRegistered[]
}


