<template>
   <chapter-base-form
      v-if="chapter"
      v-model="chapter"
      :header = "header"
   >
      <template slot="before-End">
         <div class="field is-grouped">
            <p class="control"> <a @click="onSubmit" class="button is-primary"> Submit </a> </p>
            <p class="control"> <a @click="onCancel" class="button is-light"> Cancel </a> </p> 
         </div>
      </template>
   </chapter-base-form>
   <div v-else>
      <!-- TODO: show a proper "loading ... " sign and use the "requests" feature of store instead of this v-if check -->
      Not loaded yet
   </div>
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
   data(){
      return {
         form_state : null
      }
   },
   computed:{
      original_chapter(){
         return this.$store.state.chapters.map[this.chapterId];
      },
      chapter:{
         get(){
            return this.form_state ? this.form_state : this.original_chapter;
         },
         set(value){
            this.form_state = value
         }
      },
      header(){
         return `Editing '${this.chapter.title}'`
      }
   },
   methods: {
      async onSubmit(){
         let {success,message,updated_chapter} = await this.$store.dispatch("chapters/update",{
            story_id : this.storyId, 
            chapter_id:this.chapterId,
            chapter_details: this.chapter 
         })
         if (success) {
            this.$emit("success", updated_chapter)
         } else {
            this.$emit("fail", {message})
         }
      },
      onCancel(){
         this.$emit("cancel", this.chapter)
      }
   }
}
</script>


