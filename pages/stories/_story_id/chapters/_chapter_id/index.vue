<template>
  <chapter-viewer 
      :story-id="story_id"
      :chapter-id="chapter_id"
  ></chapter-viewer>
</template>

<script>
import ChapterViewer from "@/components/chapters/ChapterViewer"

export default {
   name:"ChapterPage",
   components : {ChapterViewer},
   async asyncData(context){
      let { params, error, store } = context;
      return {
         story_id : parseInt(params.story_id),
         chapter_id : parseInt(params.chapter_id)
      }
   },
   async fetch(context){
      let {store,params} = context;
      let {story_id, chapter_id} = params;
      await store.dispatch("stories/fetchStory",{story_id:story_id}),
      await store.dispatch("chapters/fetchChapter",{story_id:story_id, chapter_id: chapter_id})
   }
}
</script>

<style>

</style>
