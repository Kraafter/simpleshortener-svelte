<script lang="ts">
    import { onMount } from 'svelte'
    let entries = {}

    onMount(() => {
        async function getList() {
            try {
                const response = await fetch('/api/list')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                entries = await response.json()
            } catch (error) {
                console.error('Fetch error:', error)
            }
        }

        getList();

    });
</script>

<h1>Extremely basic SvelteKit link shortener</h1>
<h2>Currently shortened links (Slug, Url)</h2>
<ul>
    {#each Object.entries(entries) as [key, value]}
        <li>{key} = {value}</li>
    {/each}
</ul>


<h2>Insert key and url</h2>
<form
    action="?/submitAdd"
    method="POST"
>
    <p>Accesskey</p>
    <input type="password" name="accessa" required /><br><br>
    <p>slug</p>
    <input type="text" name="sluga" required /><br><br>
    <p>url to shorten</p>
    <input type="text" name="urla" required /><br><br>
    <button formaction="?/submitAdd">Submit</button>
</form>
<br>


<h2>Delete key and url</h2>
<form
    action="?/submitDel"
    method="POST"
>
    <p>Accesskey</p>
    <input type="password" name="accessd" required /><br><br>
    <p>slug to delete</p>
    <input type="text" name="slugd" required /><br><br>
    <button formaction="?/submitDel">Submit</button>
</form>
<br>
<p>Simple Svelte Link Shortener, view source on <a href="https://github.com/Kraafter/simpleshortener-svelte" target="_blank">Github</a></p>
<p>Brought to you by <a target="_blank" href="https://kraafter.me/">Kraafter</a></p>
