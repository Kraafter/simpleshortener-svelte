import { urls } from '$lib/urls-list.js'
var url:string

export async function load({ params }) {
	urls.subscribe((value) => {
		const slug = params.slug
		url = value.get(slug)
	})
	return {
		url
	}
}
