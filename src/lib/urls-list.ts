import { writable } from "svelte/store";
// import { Redis } from "@upstash/redis";

// export const redis = new Redis({
//     url: import.meta.env.VITE_URL,
//     token: import.meta.env.VITE_STORE,
// })

// const slugs = await redis.keys('*')
// const values = await Promise.all(slugs.map(key => redis.get(key)))
// const keyValuePairs = slugs.reduce((obj, key, index) => { obj[key] = values[index]; return obj; }, {});

// let url = new Map(Object.entries(keyValuePairs));

let url:Map<string,string> = new Map

export const urls = writable(url)
