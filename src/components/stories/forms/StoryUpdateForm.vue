<template>
   <story-base-form
      v-if="isLoaded(this.story)"
      :initialFormState="safeFormState"
      @submit="onSubmit"
      @cancel="onCancel"
   >
   </story-base-form>
   <div v-else >
      <!-- TODO: show a proper "loading ... " sign and use the "requests" feature of store instead of this v-if check -->
      <div v-if="isFailed(this.story)">
         Failed to load!
      </div>
      <div v-else-if="isLoading(this.story)">
         Loading ... 
      </div>
   </div>
</template>

<script>
import StoryBaseForm from "@/components/stories/forms/StoryBaseForm";
import ResourceStateMixin from "@/mixins/ResourceState"
import ALERT_TYPES from "@/constants/alert-types"

export default {
   name: "StoryUpdateForm",
   components: {StoryBaseForm},
   mixins: [ResourceStateMixin],
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
            this.$store.commit("alert/add",{message: "Successfully edited story" ,type: ALERT_TYPES.INFO})
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


