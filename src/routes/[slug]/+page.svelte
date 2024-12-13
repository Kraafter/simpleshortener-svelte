<script lang="ts">
	import { onMount } from 'svelte'

	let entries = {}
	export let data
	var slug:string = data.slug

	onMount(() => {

		async function getList() {
			try {
				const response = await fetch('/api/list')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				entries = await response.json()
				console.log(entries)
			} catch (error) {
				console.error('Fetch error:', error)
			}
		}

		getList();

	});
	
</script>

<svelte:head>
	{#each Object.entries(entries) as [key, value]}  <!--quite an unconventional way to redirect IDK IM STUPID AND GAY-->
        {#if key === slug}
		<meta http-equiv="refresh" content="0; url='{ value }'" />
		{/if}
    {/each}
</svelte:head>

{#each Object.entries(entries) as [key, value]}
	{#if key === slug}
	<p>Redirecting to {value}, click <a href={value}>here</a> if you are not being redirecting.</p>
	{/if}
{/each}