<script lang="ts">

    import type {TeamMember, TeamPageData} from "$lib/types/sanity";
    import PageHero from "$lib/sections/PageHero.svelte";
    import Button from "$lib/components/Button.svelte";
    import Image from "$lib/components/Image.svelte";
    import {writable} from "svelte/store";
    import {fade} from "svelte/transition";

    import Fa from "svelte-fa";
    import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
    import {browser} from "$app/environment";

    const currentPerson = writable<number|false>(false);
    const modalOpen = writable<boolean>(false);

    function openMember(teamMember:TeamMember, i: number){
    console.log('opening member')
        if (browser){
            document.body.style.overflow = 'hidden';
        }
        currentPerson.set(i);
        modalOpen.set(true);
    }

    function closeMember(){
        if (browser){
            document.body.style.removeProperty('overflow');
        }
        currentPerson.set(false);
        modalOpen.set(false);
    }


    const noAnswers = ['No answer yet!', "We'll get back to you", "Check back soon!", "Getting our answers ready...", "Still a mystery!","Not quite sure yet." , "Still processing..."].sort(() => (Math.random() > .5) ? 1 : -1);

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
            {#each data.teamMembers as teamMember, index}
                <li class="team-member">
                    <div role="button" on:click={()=>{console.log(index);openMember(teamMember, index)}} >
                        <div class="image-wrap" data-flip-id="{$currentPerson === index ? 'personModal' : false}">
                            <Image image={teamMember.image} alt="{teamMember.title}" width={700}/>
                        </div>
                        <div class="hover-content">
                            <h2 class="h4 mono">{teamMember.title}</h2>
                            <Button noAction underline>Learn More</Button>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</div>
{#if $modalOpen && $currentPerson !== false}
<div class="personModal" transition:fade>
    <button class="personModal-close" aria-label="Close Popup" on:click={closeMember}><Fa icon={faTimesCircle}/></button>
    <div class="personModal-background" on:click={closeMember}></div>
    <div class="personModal-content">
        <div class="personModal-image image-wrap" data-flip-id="personModal">
            <Image image={data.teamMembers[$currentPerson].image} alt="{data.teamMembers[$currentPerson].title}" width={700}/>
        </div>
        <div class="personModal-text">
            <h3 class="personModal-name">{data.teamMembers[$currentPerson].title}</h3>
            <ul class="questions">
                {#each data.teamMembers[$currentPerson].questions as question, i}
                    <li class="question-item">
                        <div class="question">{question.question}</div>
                        {#if question.answer !== ''}
                            <div class="answer">{question.answer}</div>
                        {:else}
                            <div class="answer">{ noAnswers[i] }</div>
                        {/if}
                    </li>
                {/each}
            </ul>
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
  [role=button] {
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
  h2.h4 {
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
  .personModal-content { padding: 60px 20px;
height: 100%;
    width: 100%;
    max-width: 1600px;
    position: relative;
    z-index: 3;
    overflow-y: auto;
      display: flex;
pointer-events: none;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
  }
  .personModal-background{
    @include psuedo;
    background-color:rgba(var(--color-base-accent-darkest), 0.75);
  }

  .personModal-text,.personModal-image{pointer-events: all}

  .personModal-image{
    flex: 2 1 500px;
    max-width: clamp(400px, calc(90vh - 60px), 700px);
    margin: 0 -20px -20px;
  }
  .personModal-text {
    flex: 1 1 450px;
    max-width: 500px;
    background: rgb(var(--color-base-accent-darker));
    color: rgb(var(--color-base-background-off));
    padding: 40px 20px;
    border-radius: 35px;
     @include media-query($large-up){
        max-width: 600px;
       padding: 30px 55px;
     }
  }

  .questions {
    display:block;
  }

  .question{
    @include mono;
    font-size: 13px;
    text-transform: uppercase;
    opacity: 0.6;
    line-height: 1.5;
    margin: 0.3em 0;
    @include media-query($large-up){
        font-size:14px;
    }
  }
  .answer {
    font-weight: 300;
  }
  .question-item {
    margin: 1.5em auto 0.4em;
  }
  .personModal-close {
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 3;
    color: white;
    font-size: 24px;
  }
</style>
