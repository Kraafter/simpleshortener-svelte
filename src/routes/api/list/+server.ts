import { json } from '@sveltejs/kit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: import.meta.env.VITE_URL,
    token: import.meta.env.VITE_STORE,
})

export async function GET() {

    console.log("Grab from kv")
    const slugs = await redis.keys('*')
    const values = await Promise.all(slugs.map(key => redis.get(key)))
    const keyValuePairs = slugs.reduce((obj, key, index) => { obj[key] = values[index]; return obj; }, {});
    
    console.log(keyValuePairs)

    return json(keyValuePairs);
}
