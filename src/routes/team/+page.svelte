<script lang="ts">
    import type {TeamMember, TeamPageData} from "$lib/types/sanity";
    import PageHero from "$lib/sections/PageHero.svelte";
    import Button from "$lib/components/Button.svelte";
    import Image from "$lib/components/Image.svelte";
    import {fade} from "svelte/transition";

    import Fa from 'svelte-fa/src/fa.svelte'
    import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
    import {browser} from "$app/environment";

    let currentPerson:number|false = false;
    let modalOpen = false;

    function openMember(teamMember:TeamMember, i: number){
        if (browser){
            document.body.style.overflow = 'hidden';
        }
        currentPerson = i;
        modalOpen = true;
    }

    function closeMember(){
        if (browser){
            document.body.style.removeProperty('overflow');
        }
        currentPerson = false;
        modalOpen = false;
    }

    const noAnswers = ['No answer yet!', "We'll get back to you", "Check back soon!", "Getting our answers ready...", "Still a mystery!","Not quite sure yet." , "Still processing..."].sort(() => (Math.random() > .5) ? 1 : -1);

    $: currentPersonData = data && currentPerson ? data.teamMembers[currentPerson] : undefined;
    $: currentPersonValidQuestions = currentPersonData ? currentPersonData.questions.filter((q) => q.answer && q.answer !== '') : [];

    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    export const prerender = import.meta.env.NODE_ENV ? import.meta.env.NODE_ENV != 'development' : true;
    export let data:TeamPageData;
</script>
<div class="page">
    <div class="content">
        <PageHero>
            <h1>{data.title}</h1>
            {#if data.subtitle}
                <div class="h3">{data.subtitle}</div>
            {/if}
        </PageHero>

        <ul class="team-members">
            {#each shuffle(data.teamMembers) as teamMember, index}
                <li class="team-member">
                    <button on:click={()=>{openMember(teamMember, index)}} >
                        <span class="image-wrap" data-flip-id="{currentPerson === index ? 'personModal' : false}">
                            <Image image={teamMember.image} alt="{teamMember.title}" width={700}/>
                        </span>
                        <span class="hover-content">
                            <span class="h4 mono">{teamMember.title}</span>
                            <Button noAction underline>Learn More</Button>
                        </span>
                    </button>
                </li>
            {/each}
        </ul>
    </div>
</div>
{#if modalOpen && currentPerson !== false && currentPersonData}
<div class="personModal" transition:fade>
    <button class="personModal-close" aria-label="Close Popup" on:click={closeMember}><Fa icon={faTimesCircle}/></button>
    <div class="personModal-content">
        <button class="personModal-background" on:click={closeMember}></button>
        <div class="personModal-image image-wrap" data-flip-id="personModal">
            <Image bg image={currentPersonData.image} alt="{currentPersonData.title}" width={700}/>
        </div>
        <div class="personModal-text">
            <h3 class="personModal-name">{currentPersonData.title}</h3>
            {#if currentPersonValidQuestions.length > 0}
            <ul class="questions">
                {#each currentPersonValidQuestions as question, i}
                    <li class="question-item">
                        <div class="question">{question.question}</div>
                        {#if question.answer && question.answer !== '' }
                            <div class="answer">{@html question.answer}</div>
                        {:else}
                            <div class="answer">{ noAnswers[i] }</div>
                        {/if}
                    </li>
                {/each}
            </ul>
            {:else }
                <h4>We've asked {currentPersonData.title} some questions, but we're still working on getting their answers. Check back soon!</h4>
            {/if}
        </div>
    </div>
</div>
{/if}

<style lang="scss">
  @use "../../lib/styles/abstracts" as *;
    :global(div > header.site-header.stuck){
      color: rgb(var(--color-base-background));
    }

    .page{
      padding: 20px 0;
      background: radial-gradient( circle, rgb(var(--color-background)) 0, rgb(var(--color-base-accent-darkest)) 100%);
      color: rgb(var(--color-foreground));
      --color-background: var(--color-base-accent-darker);
      --color-foreground: var(--color-base-background);
    }
  .content {
    @include content-wrap;
  }

  .hover-content {
    @include psuedoish;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(50px);
    transition: transform 300ms ease, opacity 300ms ease;
  }
  .team-member > button {
    position: relative;
    display: block;
    transition: transform 300ms ease;
    @include resetButton;
    width: 100%;

    &:hover, &:focus-visible{
      transform: scale(1.04);
      .image-wrap {
        opacity: 0.3;
      }
      .hover-content {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  .personModal-name{
    //font-weight: 300;
    font-size:var(--font-title-long-size);
  }
  .h4 {
    @include mono;
    font-size: var(--font-mono-large-size);
  }
  .team-members {
    margin: 50px 0;
    padding: 0;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    @include media-query($marge){
      gap: 15px;
      grid-template-columns: repeat(3, 1fr);
    }
    @include media-query($widescreen){
      gap: 18px;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  li{
    list-style: none;
  }
  .team-member {
    position: relative;

    @include media-query($small){
      &:nth-child(2n-1){
        margin-top: -12%;
      }
    }
    @include media-query($marge){
      &:nth-child(3n+2){
        margin-top: -5%;
      }
      &:nth-child(3n-1){
        margin-top: -8%;
      }
    }
    @include media-query($widescreen){
      &:nth-child(4n+2){
        margin-top: -5%;
      }
      &:nth-child(4n+1){
        margin-top: -2%;
      }
      &:nth-child(4n-1){
        margin-top: -8%;
      }
    }



  }
  .image-wrap{
    overflow: hidden;
    transition: opacity 300ms ease;
    border-radius: var(--border-radius);
  }

  .personModal {
    @include psuedoish;
    position:fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 10001;

  }
  .personModal-content {
    height: 100%;
    width: 100%;
    padding: 5%;
    position: relative;
    z-index: 3;
    overflow-y: auto;
    display: flex;
        flex-wrap: wrap;
        align-items: center;
  }
  .personModal-background{
    @include psuedo;
    background-color:rgba(var(--color-base-accent-darkest), 0.75);
  }

  .personModal-text,.personModal-image{pointer-events: all}

  .personModal-image{
    flex: 2 1 500px;
    position: relative;
    margin: 0 auto -20px;
    max-width: 75vw;
    max-height: 60vh;
    z-index: 4;
    height: 100%;
    @include media-query($large-up){
      max-width: clamp(400px, calc(90vh - 60px), 700px);
      margin: 0 -20px -20px auto;
      max-height: min(80vh, 700px)
    }
  }
  .personModal-text {
    flex: 1 1 450px;
    z-index: 3;
    position: relative;
    max-width: 500px;
    background: rgb(var(--color-base-accent-darker));
    color: rgb(var(--color-base-background-off));
    padding: 40px 20px;
    border-radius: 35px;
     @include media-query($large-up){
        max-width: 600px;
       margin-right: auto;
       padding: 30px 55px;
     }
  }

  .questions {
    display:block;
  }

  .question{
    @include mono;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    opacity: 0.7;
    line-height: 1.5;
    margin: 0.3em 0;
    @include media-query($large-up){
        font-size:16px;
    }
  }
  .answer {
    font-weight: 400;
    font-size: 22px;
    line-height: 1.3;
    letter-spacing: -0.02em;
    @include media-query($large-up){
      font-size:24px;
    }
  }
  .question-item {
    margin: 1.5em auto 0.4em;
  }
  .personModal-close {
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 5;
    color: white;
    font-size: 24px;
  }
</style>
