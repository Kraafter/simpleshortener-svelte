import { json } from '@sveltejs/kit';
import { Redis } from "@upstash/redis";
import { env } from "$env/dynamic/private"
import { compare } from 'bcrypt';

const redis = new Redis({
    url: env.SECRET_KV_URL,
    token: env.SECRET_KV_TOKEN,
})

var errormessage:string

export async function POST( {request} ) {
    console.log("request received, processing")
    const { accessd, slugd } = await request.json()

    const match = await compare(env.SECRET_APP_ACCESS, accessd)

    if (!match) {
        errormessage = "accessDenied"
    } else if (!slugd && match) {
        errormessage = "noSlug"
    } else if (slugd && match) {
        console.log("upload")
        await redis.del(slugd)
    }

    if(!errormessage) {
        return(json({status:'OK'}))
    } else {
        return(json({status:errormessage}))
    }
}