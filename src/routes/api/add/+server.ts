import { error, json } from '@sveltejs/kit';
import { Redis } from "@upstash/redis";
import { env } from "$env/dynamic/private"
import { compare } from 'bcrypt';

const redis = new Redis({
    url: import.meta.env.VITE_URL,
    token: import.meta.env.VITE_STORE,
})

var errormessage:string

export async function POST( {request} ) {
    console.log("request received, processing")
    const { accessa, sluga, urla } = await request.json()

    const match = await compare(env.SECRET_APP_ACCESS, accessa)

    if (!match) {
        errormessage = "Access key is invalid"
        throw error(403, errormessage)
    } else if ((!urla || !sluga) && match) {
        errormessage = "No url to add to database"
        throw error(400, errormessage)
    } else if (urla && sluga && match) {
        console.log("upload")
        await redis.set(sluga, urla)
    }

    if(!errormessage) {
        return(json({status:'OK'}))
    } else {
        return(json({status:errormessage}))
    }
}
