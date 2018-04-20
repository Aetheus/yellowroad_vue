<template>
   <story-update-form
      :story-id="storyId"
   >
   </story-update-form>
</template>

<script>
import StoryUpdateForm from "@/components/stories/forms/StoryUpdateForm"

export default {
   name:"StoryUpdatePage",
   components:{StoryUpdateForm},
   async asyncData(context){
      return {
         storyId : context.params.story_id
      }
   },
   async fetch({store,params}){
      await store.dispatch("stories/fetchStory",{story_id:params.story_id});
   }

}
</script>
