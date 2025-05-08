
<script lang="ts">

    import {onDestroy, onMount} from "svelte";
    import {pdfLoaded} from "$lib/stores";
    import {writable} from "svelte/store";
    let unsub = ()=>{ //
        //
    }
    onMount(()=>{
        unsub = pdfLoaded.subscribe(v=>{
            if (v) {
                loadMe();
            }
        })
    })
    onDestroy(()=>{
        unsub()
    })
    let loaded = writable(false)

    function loadMe() {
        var adobeDCView = new window.AdobeDC.View({clientId: import.meta.env.ADOBE_EMBED_KEY, divId: key});

        adobeDCView.previewFile({
                content:{ location:
                        { url }},
                metaData:{fileName: title + '.pdf'}
            },
            {
                embedMode: "IN_LINE",
                showFullScreen: false,
                colorScheme: 'dark',
                // pageControls: true,
            });
        loaded.set(true);
    }
    export let url:string, title: string, key: string;

</script>
<div class="wrapper">
    {#if !loaded}
        <span>Loading...</span>
    {/if}
    <div class="pdf" id={key} style={`${!$loaded ? 'display: flex; opacity: 0.5' : 'display: block;'}`} >
    </div>
</div>

<style>
    .wrapper {
        width: 100%;
        background: black;
        text-align: center;
        font-size: 30px;
        align-items: center;
        justify-content: center;
    }
    .pdf {
        width: 100%;
        min-height: 60vh;
        overflow: hidden;
    }
    iframe {
        aspect-ratio: auto;
    }
</style>
