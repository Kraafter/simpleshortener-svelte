<script lang="ts">
	export let data
	const redir = data.url
	window.location.href = redir
</script>

<p>Redirecting to {redir}, click <a href="{redir}">here</a> if you are not being redirecting.</p>