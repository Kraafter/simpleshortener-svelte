<script lang="ts">
    import { onMount } from 'svelte';

    export let data;
    let slug: string = data.slug;

    console.log('Slug:', slug);

    let linkGot: string;
    let putHeader: string;
    let putBody: string;

    onMount(() => {
        console.log('Component mounted');

        async function getLink() {
            try {
                const response = await fetch('/api/get', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ slug })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const jsonres = await response.json();
                    console.log('Response JSON:', jsonres);
                    if ((jsonres['status'] == 'OK') && jsonres['link'] != null) {
                        linkGot = jsonres['link'];

                        putHeader = `<meta http-equiv='refresh' content='1; url=${linkGot}' />`;
                        putBody = `<p>Redirecting to ${linkGot}, click <a href="${linkGot}">here</a> if you are not being redirected.</p>`;
                    } else {
                        putBody = `<p>${slug} is not a valid shortened link, please check again</p>`;
                    }
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        getLink();
    });
</script>

<svelte:head>
    {@html putHeader}
</svelte:head>

<main>
    {@html putBody}
</main>