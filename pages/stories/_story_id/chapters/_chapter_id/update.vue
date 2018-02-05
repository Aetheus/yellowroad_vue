<template>  
  <div class="columns">            
    <chapter-edit-form
        v-on:success="onSuccess" 
        v-on:fail="onFail"
        :chapter-id="chapter_id"
        :story-id="story_id"
        class="column column is-10 is-offset-1"
    >
    </chapter-edit-form>
  </div>  
</template>

<script>
import ChapterEditForm from "~/components/chapters/forms/ChapterEditForm"

export default {
  async asyncData({ params, error, store }) {
    return {
      story_id    : parseInt(params.story_id),
      chapter_id  : parseInt(params.chapter_id)
    }
  },
  components:{ChapterEditForm},  
  methods : {
     onSuccess(form_data){
        console.log("success",form_data)
        // console.log(form_data.title, form_data.body)
     },
     onFail({message}) {
        console.log("failure",message)
     }
  },
  async fetch({store,params}){
      let {story_id, chapter_id} = params;
      await store.dispatch("stories/fetchStory",{story_id:story_id}),
      await store.dispatch("chapters/fetchChapter",{story_id:story_id, chapter_id: chapter_id})
  }
}
</script>

<style>

</style>


