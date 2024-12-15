# Simple Svelte Link Shortener

A simple link shortener implementation designed to be self hosted or deployed to vercel.

## Setting up on Vercel

1. Create a Github repository from this template.
2. Connect to the newly made repository on Vercel and make a new project out of it.
3. Under the Storage section in the vercel projects page, create a free Upstash Redis KV store.
4. Under the Settings > Environment Variables section in the vercel projects page, add environments as listed
   > - SECRET_APP_ACCESS => The access key you wish to use in order to add and delete links (treat this like a password).
   > - SECRET_KV_URL => Value from KV_REST_API_URL.
   > - SECRET_KV_TOKEN => Value from KV_REST_API_TOKEN.
   > - PUBLIC_SITE_URL => The URL where the shortener will be at, without 'https://' or trailing slash (eg. simpleshortener-svelte.vercel.app)
5. Under the Deployment section in the vercel projects page, click on the 3 dot menu on the latest deployment and click on Redeploy, this will apply the newly set env variables.
6. You're done! You may customize the site's css to your liking but try not to touch any logics unless you know what you are doing.

Note: It's recommended to switch the adapter to [Vercel's](https://svelte.dev/docs/kit/adapter-vercel) for better customizability.

## Building

(Self-hosting on your own hardware requires knowledge to expose machine to the internet)

To create a production version of your app in case you wish to self host it:

```bash
npm run build
```

For the key-value storage, the project uses a Redis API based key-value database.

Redis servers are available on most cloud platforms and can be [hosted by yourself](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/) (Requires knowledge to expose machine to the internet). But you may opt for [Upstash](https://upstash.com/) if you prefer free.

You will also need to set up some env variables for API's and access
   > - SECRET_APP_ACCESS => The access key you wish to use in order to add and delete links (treat this like a password).
   > - SECRET_KV_URL => The https url to the kv database
   > - SECRET_KV_TOKEN => The read_write token to the kv datavase
   > - PUBLIC_SITE_URL => The URL where the shortener will be at, without 'https://' or trailing slash (eg. simpleshortener-svelte.vercel.app)