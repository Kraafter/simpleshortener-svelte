import { error, json } from '@sveltejs/kit';
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: import.meta.env.VITE_URL,
    token: import.meta.env.VITE_STORE,
})

var errormessage:string

export async function POST( {request} ) {
    console.log("request received, processing")
    const { accessd, slugd } = await request.json()

    if (accessd != import.meta.env.VITE_ACCESS) {
        errormessage = "Access key is invalid"
        throw error
    } else if (!slugd && accessd == import.meta.env.VITE_ACCESS) {
        errormessage = "No url to add to database"
        throw error
    } else if (slugd && accessd == import.meta.env.VITE_ACCESS) {
        console.log("upload")
        await redis.del(slugd)
    }

    if(!errormessage) {
        return(json({status:'OK'}))
    } else {
        return(json({status:errormessage}))
    }
}