import { scrapeAPI } from "./baseAxios";

export default async function getWebscrapping(name,doWBL,doOFAC) {
    try {
        let {data} = await scrapeAPI.get(`getRisk/${name}?doWBL=${doWBL}&doOFAC=${doOFAC}`)
        console.log(data)
        //If return is rateLimit, show error
        if (data == 'RATE_LIMIT') return {isSuccessful: false, message: "Rate limit was exceeded. Please try again in a minute"}
        else return data
    } catch (error) {
        console.log(error)
        return {isSuccessful: false, message: "Error with the service."}
    }
}