<script lang="ts">
    import { enhance } from '$app/forms';
    import { syncMapWithLocalStorage } from '$lib/localstorehandle.js';
    import { urls } from '$lib/urls-list';
	import { onMount } from 'svelte';

    onMount(() => {
        syncMapWithLocalStorage(urls, 'urls');
    });

    console.log($urls)
    let entries = Object.entries($urls)
    console.log(entries)
</script>

<h1>Extremely basic SvelteKit link shortener</h1>
<h2>Currently shortened links (Slug, Url)</h2>
<ul>
    {#each entries as [key, value]}
        <li>{key} = {value}</li>
    {/each}
</ul>
<h2>Insert key and url</h2>
<form
    use:enhance
    action="?/upload"
    method="POST"
    enctype="multipart/form-data"
>
    <p>Accesskey</p>
    <input type="password" name="accesskey" required /><br><br>
    <p>slug</p>
    <input type="text" name="slug" required /><br><br>
    <p>url to shorten</p>
    <input type="text" name="url" required /><br><br>
    <button>Upload</button>
</form>
<br>
<h2>Delete key and url</h2>
<form
    use:enhance
    action="?/upload"
    method="POST"
    enctype="multipart/form-data"
>
    <p>Accesskey</p>
    <input type="password" name="accesskey" required /><br><br>
    <p>slug to delete</p>
    <input type="text" name="slug" required /><br><br>
    <button>Upload</button>
</form>
<p>Brought to you by <a target="_blank" href="https://kraafter.me/">Kraafter</a></p>
