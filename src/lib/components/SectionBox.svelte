<script lang="ts">
  import {PortableText} from "@portabletext/svelte";
  import isOnScreen, { stopWatching } from "$lib/isOnScreen";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  let offScreen = true;
  export let box:Array<Block>,list=false, style:  'bordered' | 'none' | 'boxed' | 'eachBoxed' | 'simple'= 'boxed' ;

</script>

<div class:offScreen class="box" use:isOnScreen on:onscreen={(e)=> {offScreen = false;  stopWatching(e.target);}} class:list class:boxed={style=='boxed'} class:eachBoxed={style =='eachBoxed'} class:bordered={style=='bordered'} class:simple={style=='simple'}>
  <PortableText value={box} components={{listItem: {normal: LiNormal}}}/>
</div>
<style>

</style>