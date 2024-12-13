import { error, json } from '@sveltejs/kit';
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: import.meta.env.VITE_URL,
    token: import.meta.env.VITE_STORE,
})

var errormessage:string

export async function POST( {request} ) {
    console.log("request received, processing")
    const { accessa, sluga, urla } = await request.json()

    if (accessa != import.meta.env.VITE_ACCESS) {
        errormessage = "Access key is invalid"
        throw error(403, errormessage)
    } else if ((!urla || !sluga) && accessa == import.meta.env.VITE_ACCESS) {
        errormessage = "No url to add to database"
        throw error(400, errormessage)
    } else if (urla && sluga && accessa == import.meta.env.VITE_ACCESS) {
        console.log("upload")
        await redis.set(sluga, urla)
    }

    if(!errormessage) {
        return(json({status:'OK'}))
    } else {
        return(json({status:errormessage}))
    }
}
