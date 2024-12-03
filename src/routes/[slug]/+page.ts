import { urls } from '$lib/urls-list.js'

export async function load({ params }) {
	const slug = params.slug
	const url = urls[slug]
	return {
		url
	}
}
