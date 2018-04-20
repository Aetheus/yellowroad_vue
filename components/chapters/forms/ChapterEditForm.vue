<template>
   <chapter-base-form
      v-on:submit="onSubmit"
      v-on:cancel="onCancel"
      :header = "header"
      :initial-form-state = "safeFormState"
   >
   </chapter-base-form>
</template>

<script>
import ChapterBaseForm from "~/components/chapters/forms/ChapterBaseForm"

export default {
   name:"chapter-edit-form",
   props : ["storyId", "chapterId"],
   components : {ChapterBaseForm},
   created(){      
      let storiesIsLoaded = this.$store.state.stories.map[this.storyId]
      if (!storiesIsLoaded) {
         //TODO: show a "loading ... " sign while loading this
         this.$store.dispatch("stories/fetchStory",{
            story_id:this.storyId
         })
      }

      let chapterIsLoaded = this.$store.state.chapters.map[this.chapterId]
      if (!chapterIsLoaded) {
         this.$store.dispatch("chapters/fetchChapter",{
            story_id:this.storyId, 
            chapter_id: this.chapterId
         })
      }
   },
   computed:{
      chapter(){
         return this.$store.state.chapters.map[this.chapterId]
      },
      safeFormState(){
         //makes "chapter" safe to modify 
         return Object.assign({},this.chapter)
      },
      header(){
         return `Editing '${this.chapter.title}'`
      }
   },
   methods: {
      async onSubmit(form_state){
         let {success,message,chapter} = await this.$store.dispatch("chapters/update",{
            story_id : this.storyId, 
            chapter_id:this.chapterId,
            chapter_details: form_state 
         })
         if (success) {
            this.$emit("success", chapter)
         } else {
            this.$emit("fail", {message})
         }
      },
      onCancel(form_state){
         this.$emit("cancel", form_state)
      }
   }
}
</script>


