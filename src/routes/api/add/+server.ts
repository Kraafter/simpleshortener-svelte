import { json } from '@sveltejs/kit'
import { Redis } from "@upstash/redis"
import { env } from "$env/dynamic/private"
import { compare } from 'bcrypt'

const redis = new Redis({
    url: env.SECRET_KV_URL,
    token: env.SECRET_KV_TOKEN,
})

var errormessage:string

function safeSlug(input:string) {
    let slug = input.toLowerCase()
    slug = slug.replace(/\s+/g, '-') // spaces to hyphens
    slug = slug.replace(/[^a-z0-9-]/g, '') // remove invalid characters
    slug = slug.replace(/-+/g, '-') // no hyphen duplicates
    slug = slug.replace(/^-+|-+$/g, '') // trim leading trailing hyphens
    return slug
  }

export async function POST( {request} ) {
    const { accessa, sluga, urla } = await request.json()

    const match = await compare(env.SECRET_APP_ACCESS, accessa)

    if (!match) {
        errormessage = "accessDenied"
    } else if ((!urla || !sluga) && match) {
        errormessage = "noUrl"
    } else if (match && (sluga == 'api' || sluga == 'alert')){
        errormessage = "reserved"
    } else if (urla && sluga && match) {
        if(URL.canParse(urla)) {
            await redis.set(safeSlug(sluga), urla)
        } else {
            errormessage = "invalidUrl"
        }
    }

    if(!errormessage) {
        return(json({status:'OK'}))
    } else {
        return(json({status:errormessage}))
    }
}
