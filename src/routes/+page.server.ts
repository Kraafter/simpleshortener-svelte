import { urls } from "$lib/urls-list.js";
import { editLink, grabAllSlugs } from "$lib/index.js"

export const actions = {
  upload: async ({ request }) => {
    const form = await request.formData();
    const key = form.get("accesskey");
    const slug = form.get("slug");
    const url = form.get("url");

    editLink(key, slug, url)

    const links = await grabAllSlugs()
    console.log(links)

    urls.subscribe((val) => {
      val.clear()
      for (var key of Object.keys(links)) {
        val.set(key,links[key])
      }
      
    })
  }
}