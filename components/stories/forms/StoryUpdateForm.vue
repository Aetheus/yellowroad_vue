<template>
   <story-base-form
      v-if="this.story"
      :initialFormState="safeFormState"
      @submit="onSubmit"
      @cancel="onCancel"
   >
   </story-base-form>
   <div v-else >
      <!-- TODO: show a proper "loading ... " sign and use the "requests" feature of store instead of this v-if check -->
      Not loaded yet
   </div>
</template>

<script>
import StoryBaseForm from "@/components/stories/forms/StoryBaseForm";

export default {
   name: "StoryUpdateForm",
   components: {StoryBaseForm},
   props: ["storyId"],
   created(){
      let storiesIsLoaded = this.$store.state.stories.map[this.storyId]
      if (!storiesIsLoaded) {
         this.$store.dispatch("stories/fetchStory",{
            story_id:this.storyId
         })
      }
   },
   computed: {
      story(){
         return this.$store.state.stories.map[this.storyId]
      },
      safeFormState(){
         let story = this.story
         return Object.assign({},story)
      }
   },
   methods: {
      async onSubmit(form_state){
         let {success,message,story} = await this.$store.dispatch("stories/update", {
            story_id:this.storyId, update_form:form_state
         })

         if (success) {
            this.$emit("success", story)
         } else {
            this.$emit("fail", {message})
         }
      },
      onCancel(form_state){
         this.$emit("cancel",form_state)
      }
   }
}
</script>

<style>

</style>


