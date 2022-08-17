<script lang="ts">
  import {PortableText} from "@portabletext/svelte";
  import isOnScreen,{ stopWatching } from "$lib/isOnScreen";
import { browser } from "$app/env";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  let offScreen = true;
  export let box:Array<Block>,list=false, style:  'bordered' | 'none' | 'boxed' | 'eachBoxed' = 'boxed';

</script>

<div class:offScreen class="box" use:isOnScreen on:onscreen={(e)=> browser ?  setTimeout(()=>{offScreen = false;  stopWatching(e.target);}, 150) : offScreen = false} class:list class:boxed={style=='boxed'} class:eachBoxed={style =='eachBoxed'} class:bordered={style=='bordered'}>
  <PortableText value={box} components={{listItem: {normal: LiNormal}}}/>
</div>
<style>

</style>