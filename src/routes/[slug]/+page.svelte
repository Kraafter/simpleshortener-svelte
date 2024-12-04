<script lang="ts">
	export let data
	const redir = data.url
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0; url={redir}" />
</svelte:head>

<p>Redirecting to {redir}, click <a href="{redir}">here</a> if you are not being redirecting.</p>