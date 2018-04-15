<template>
   <story-viewer :storyId="story_id">
      
   </story-viewer>
</template>

<script>
import StoryViewer from "@/components/stories/StoryViewer"

export default {
   name:"StoryInfoPage",
   components : {StoryViewer},
   async asyncData(context){
      return {
         story_id : context.params.story_id
      }
   },
   async fetch(context){
      let {store,params} = context;
      let story_id = params.story_id;
      await store.dispatch("stories/fetchStory",{story_id:story_id});
   }
}
</script>

