<script context="module">
  /** @type {import('./__types/__layout').Load} */
  export async function load({ fetch }) {
    const url = '/site.json';
    try {
      const res = await fetch(url);
      const data = await res.json();

      return {
        status: res.status,
        props: {
          codes: data.codes,
        },
        stuff: {
          seo: data.seo,
          contact: data.contact,
          footer: data.news,
          header: data.header
        }}
    } catch(e) {
      return {
        status: 500
      }
    }``

  }
</script>

<script lang="ts">
  // import "$lib/styles/ress";
  // import "$lib/styles/app";
  // your script goes here
  import Header from "$lib/sections/Header.svelte";
  import Footer from "$lib/sections/Footer.svelte";
</script>
<a class="skip-main" href="#MainContent">Skip to main content</a>
<Header />
<main id="MainContent" style="">
<slot></slot>
</main>
<Footer />
<style lang="scss" global>
  @use "../lib/styles/ress";
  @use "../lib/styles/app";
  @use "../lib/styles/abstracts" as *;

  .skip-main {
    @include resetButton;
    @include buttonStyles;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(var(--color-background));
    border: 2px solid;
    color: rgb(var(--color-text));

    &:not(:focus):not(:active) {
      @include visually-hidden;
    }
  }
</style>
