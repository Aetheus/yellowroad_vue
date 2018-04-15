<template>
  <div>
    <game-viewer 
      :story-id="story_id"
    ></game-viewer>
  </div>
  
</template>

<script>
import GameViewer from "@/components/stories/GameViewer"

export default {
   name:"GamePage",
   components : {GameViewer},   
   async asyncData(context){
      let { params, error, store } = context;
      return {
         story_id : parseInt(params.story_id)
      }
   },
   async fetch(context){
      let {store,params} = context;
      let {story_id} = params;

      await store.dispatch("stories/fetchStory",{story_id:story_id});
      let story = store.state.stories.map[story_id];
      await store.dispatch("chapters/fetchChapter",{story_id:story_id, chapter_id: story.first_chapter_id})

      await store.dispatch("game/beginGame",{ story_id, first_chapter_id: story.first_chapter_id, starting_save: {} })
   }
}
</script>

<style>

</style>
