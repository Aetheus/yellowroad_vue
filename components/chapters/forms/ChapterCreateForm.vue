<template>
  <chapter-base-form
      v-on:submit="onSubmit"
      v-on:cancel="onCancel"
      :form-settings = "formSettings"
      :header = "header"
  >
  </chapter-base-form>
</template>


<script>
import ChapterBaseForm from "~/components/chapters/forms/ChapterBaseForm"

export default {
   name: "chapter-create-form",
   props : ["formSettings", "storyId"],
   components : {ChapterBaseForm},
   created(){      
      let storyIsLoaded = this.$store.state.stories.map[this.storyId]
      if (!storyIsLoaded) {
          this.$store.dispatch("stories/fetchStory",{story_id:this.storyId})
      }
   },
   computed : {
      story(){
        return this.$store.state.stories.map[this.storyId]
      },
      header(){
        return (this.story ? `Create a new chapter in '${this.story.title}'` : 'Create a new chapter')
      }
   },
   methods : {
      async onSubmit(form_state){         
         let {success,message,chapter} = await this.$store.dispatch("chapters/create", { 
            story_id : this.storyId, 
            chapter_details: form_state 
         })
         if (success) {
            this.$emit("success", chapter)
         } else {
            this.$emit("fail", {message})
         }
      },
      onCancel(){
         //bubble this back up
         this.$emit("cancel",this.form_state)
      }
   }
}
</script>
