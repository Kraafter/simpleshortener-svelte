<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	
	export let data
	const redir = data.url
</script>

<svelte:head>
	<meta http-equiv="refresh" content="3; url={redir}" />
</svelte:head>

<p>Redirecting to {redir} in 3 seconds, click <a href="{redir}">here</a> if you are not being redirecting.</p>