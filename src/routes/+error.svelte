<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`,
      }
    };
  }
</script>


<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  export let title:string;
</script>
<section>
  <h1 class="mega">Oops!</h1>
  <h3>{title}</h3>
  <p class="large">Looks like something went wrong. Let's get you back on the right track!</p>
  <Button link="/">Back To Homepage</Button>

</section>

<style lang="scss">
  @use "../lib/styles/abstracts" as *;

  h3 {
    @include mono;
  }
  h3 {
    font-weight: 400;
  }

  section {
    @include content-wrap;
    display: block;
    text-align: center;
    padding-top: 220px;
    min-height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 120px;
  }
</style>