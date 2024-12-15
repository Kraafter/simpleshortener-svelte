<!--
READ ME

For styling, you can put css within the <style> block below. It's not adviced
to edit form action, method, type, and name as well as code inside {} as it could
break adding, deleting, and listing links. Unless ofcourse, you understand what
the code does and you know what you are doing.

It's also unadviced to edit code under /src/routes/api for the same reason.

Other pages you could style are listed in src/routes/alert. The contents can be
modified freely but it's adviced that the main point per page is retained.
-->


<script lang="ts">

// Shortened Links (code)

    import { onMount } from 'svelte'
    import { PUBLIC_SITE_URL } from '$env/static/public'
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

// this is the code to show all shortened
// links, you can comment (ctrl + /) the
// entire part to disable it.

</script>


<main>
    <h1>Simple Svelte Link Shortener</h1>


    <!-- Shortened links -->

    <h2>Currently shortened links (Slug, Url)</h2>
    <ul>
        {#each Object.entries(entries) as [key, value]}
            <li><a href="https://{PUBLIC_SITE_URL}/{key}">{key}</a> = {value}</li>
        {/each}
    </ul>

    <!--
    this is used to show all shortened links
    you can comment (ctrl + /) the entire part
    to disable it.
    -->


    <h2>Insert key and url</h2> <!-- Form to add link to database -->
    <form
        action="?/submitAdd"
        method="POST"
    >
        <p>Access key</p>
        <input type="password" name="accessa" placeholder="case sensitive" required /><br><br>
        <p>slug</p>
        <input type="text" name="sluga" placeholder="(eg. invite, pet-album, nightmare-ep1)" required /><br><br>
        <p>url to shorten</p>
        <input type="text" name="urla" placeholder="(eg. https://www.youtube.com/watch?v=dQw4w9WgXcQ)" required/><br><br>
        <button formaction="?/submitAdd">Submit</button>
    </form>
    <br>


    <h2>Delete key and url</h2> <!-- Form to remove link from database -->
    <form
        action="?/submitDel"
        method="POST"
    >
        <p>Access key</p>
        <input type="password" name="accessd" placeholder="case sensitive" required /><br><br>
        <p>slug to delete</p>
        <input type="text" name="slugd" placeholder="refer to list" required /><br><br>
        <button formaction="?/submitDel">Submit</button>
    </form>
    <br>
    <p>Simple Svelte Link Shortener, view source on <a href="https://github.com/Kraafter/simpleshortener-svelte" target="_blank">Github</a></p>
    <p>Brought to you by <a target="_blank" href="https://kraafter.me/">Kraafter</a></p>
</main>

<!-- For styling, treat this like conventional css -->
<style>
    p {
        font-size: initial;
    }
</style>