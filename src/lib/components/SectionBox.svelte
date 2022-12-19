<script lang="ts">
  import {PortableText} from "@portabletext/svelte";
  import isOnScreen, { stopWatching } from "$lib/isOnScreen";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  import type {Block} from "$lib/types/sections";
  let offScreen = true;
  export let box:Array<Block>,list=false, boxStyle:  'bordered' | 'none' | 'boxed' | 'eachBoxed' | 'simple'= 'boxed' ;

</script>

<div class:offScreen class="box" use:isOnScreen on:onscreen={(e)=> {offScreen = false;  stopWatching(e.target);}} class:list class:boxed={boxStyle=='boxed'} class:eachBoxed={boxStyle =='eachBoxed'} class:bordered={boxStyle=='bordered'} class:simple={boxStyle=='simple'}>
  <PortableText value={box} components={{listItem: {normal: LiNormal}}}/>
</div>
