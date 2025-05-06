<script lang="ts">
  import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  export let  subtitleLine1: string|null, subtitleLine2: string|null, anchor:string|null;
  import logo from '$lib/images/logo-tan.svg';

  let visible = false;
  let el:HTMLElement;

</script>
<section class="hero simple"
         id={anchor}>

  <div class="hero-content" bind:this={el} class:offscreen={!visible} use:isOnScreen
       on:onscreen={()=>{visible = true; stopWatching(el); }}>
    <h1><img src={logo} alt="Futureshirts"/>
    </h1>
    {#if subtitleLine1}
      <h2>
        <span class="line">
          {#each subtitleLine1 as letter}
            <span class="letter">{letter}</span>
          {/each}
        </span>
        {#if subtitleLine2}
          <span class="line">
{#each subtitleLine2 as letter}
            <span class="letter">{letter}</span>
          {/each}          </span>
        {/if}
      </h2>
    {/if}
  </div>
</section>

<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    --box-li-line-height : 1;
    position: relative;
    height: clamp(250px, calc(90 * var(--vh, 1vh)), 500px);
    @include media-query($medium-up) {
      height: clamp(300px, calc(90 * var(--vh, 1vh)), 800px);
    }
    overflow: hidden;
    --color-background: 25,29,37;
    --color-foreground: 230, 223, 209;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: rgb(var(--color-foreground));
    /** Plusses */

    background: rgb(var(--color-background)) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADdSURBVHgB7di9CsIwEADgqwpuboK+/zu5ufkEboKlplBQNOLoJXwfhP5lypHLXSMAAAAAAAAAAAAAAAAAAAAAoEtDdGCapn257JfH8zAMt2jUJvqwLWMXHVgFqQhIMgKSjIAk09ShvlRT28qn1wP9WObdK3Oupfq6RnKtVVlzQH5VU4cv7y9lpA+IlJVMU41hSUXzjl5XPh3juTNOZdQaw7GkrFoqS6WplLUs6Meivp0Zt5Y7dSkrGQFJRkCSEZBkevnbO/cXl+V+DAAAAAAAAAAAAAAAAAAAAIB/eAD+niIr1k3GcwAAAABJRU5ErkJggg==);
    background-size: 50px;
    &::before {
      @include psuedo;
      background-image: radial-gradient(circle closest-corner, rgba(0,0,0,0), rgba(0,0,0,0.2));
    }
  }

  .letter {
    animation: pulse 1s infinite alternate-reverse ease-in-out;
    opacity: 0.7;

    &:nth-child(20n + 1) {
      animation-delay: 100ms;
    }
   &:nth-child(20n + 2) {
      animation-delay: 200ms;
    }
   &:nth-child(20n + 3) {
      animation-delay: 300ms;
    }
   &:nth-child(20n + 4) {
      animation-delay: 400ms;
    }
   &:nth-child(20n + 5) {
      animation-delay: 500ms;
    }
   &:nth-child(20n + 6) {
      animation-delay: 600ms;
    }
   &:nth-child(20n + 7) {
      animation-delay: 700ms;
    }
    &:nth-child(20n + 8) {
      animation-delay: 800ms;
    }
    &:nth-child(20n + 9) {
      animation-delay: 900ms;
    }
    &:nth-child(20n + 10) {
      animation-delay: 1000ms;
    }
    &:nth-child(20n + 11) {
      animation-delay:1100ms;
    }
    &:nth-child(20n + 12) {
      animation-delay: 1200ms;
    }
    &:nth-child(20n + 13) {
      animation-delay: 1300ms;
    }

    &:nth-child(20n + 14) {
      animation-delay: 1400ms;
    }
&:nth-child(20n + 15) {
      animation-delay: 1500ms;
    }
&:nth-child(20n + 16) {
      animation-delay: 1600ms;
    }
&:nth-child(20n + 17) {
      animation-delay: 1700ms;
    }
    &:nth-child(20n + 18) {
      animation-delay: 1800ms;
    }
    &:nth-child(20n + 19) {
      animation-delay: 1900ms;
    }

  }

  .line {
    @include mono();
    letter-spacing: -0.01em;
    font-weight: 500;
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
    opacity: 1;
    transform: translateY(0);
    font-size: 19px;
    text-transform: uppercase;
    display: block;
    line-height: 1.4;
    margin-block: 0.2em;
    &:first-child {
      margin-top: 1em;
    }
    @include media-query($medium-up) {
      font-size: 24px;
      &:first-child {
        margin-top: 0
      }
    }
    @include media-query($large-up) {
      font-size: 29px;
    }


  }

  .line + .line {
    transition-delay: 300ms;
  }
  .offscreen .line {
    opacity: 0;
    transform: translateY(100%);
  }

  img {
    width: clamp(200px, 75vw, 650px);
    max-width: 100%;
    height: auto;
    margin-bottom: 0;
    @include media-query($medium-up) {
    width: clamp(200px, 65vw, 700px);

    }
    @include media-query($widescreen) {
      width: clamp(200px, 55vw, 800px);

    }
  }

  @keyframes pulse {
    from {
      opacity: 1;
    } to {
      opacity: 0.6;
    }
  }
</style>
