<template>
  <game-viewer 
      :story-id="story_id"
  ></game-viewer>
</template>

<script>
import GameViewer from "@/components/chapters/GameViewer"

export default {
   name:"GamePage",
   components : {GameViewer},
   async asyncData(context){
      let { params, error, store } = context;
      return {
         story_id : parseInt(params.story_id),
         chapter_id : parseInt(params.chapter_id)
      }
   },
   async fetch(context){
     console.log("fetch called")
      let {store,params} = context;
      let {story_id, chapter_id} = params;
      await store.dispatch("game/beginGame",{ story_id, first_chapter_id: chapter_id, starting_save: {} }),
      await store.dispatch("stories/fetchStory",{story_id:story_id}),
      await store.dispatch("chapters/fetchChapter",{story_id:story_id, chapter_id: chapter_id})
   }
}
</script>

<style>

</style>
