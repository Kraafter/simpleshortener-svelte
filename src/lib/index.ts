import { Redis } from "@upstash/redis";
import { error } from "@sveltejs/kit";

export const redis = new Redis({
    url: import.meta.env.VITE_URL,
    token: import.meta.env.VITE_STORE,
})

export async function editLink(key:string, slug:string, url:string) {
    if (key != import.meta.env.VITE_ACCESS) {
        console.log("bruh")
        throw error(403, { message: "Invalid key." });
    } else if (!url && key == import.meta.env.VITE_ACCESS) {
        console.log("delete")
        await redis.del(slug)
    } else if (url && key == import.meta.env.VITE_ACCESS) {
        console.log("upload")
        await redis.set(slug, url)
    }
}


export async function grabAllSlugs() {
    console.log("Grab from kv")
    const slugs = await redis.keys('*')
    const values = await Promise.all(slugs.map(key => redis.get(key)))
    const keyValuePairs = slugs.reduce((obj, key, index) => { obj[key] = values[index]; return obj; }, {});
    return keyValuePairs
}