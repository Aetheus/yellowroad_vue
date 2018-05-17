<template>
   <story-update-form
      :story-id="storyId"
      @success="onSuccess"
      @cancel="onCancel"
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
   },
   methods : {
      onSuccess(){
         this.$router.push({ path: `/stories/${this.storyId}` })
      },
      onCancel(){
         this.$router.push({ path: `/stories/${this.storyId}` })
      }
   }

}
</script>
