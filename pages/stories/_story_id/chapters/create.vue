<template>  
  <div class="columns">            
    <chapter-create-form
        v-on:success="onSuccess" 
        v-on:fail="onFail"
        :initial-form-state="{title : '', body: '', book_id : story_id}"
        :form-settings="{
            header: header
        }"
        class="column column is-10 is-offset-1"
    >
    </chapter-create-form>
  </div>  
</template>

<script>
import ChapterCreateForm from "~/components/chapters/forms/ChapterCreateForm"

export default {
  async asyncData({ params, error, store }) {
    return {
      story_id: parseInt(params.story_id)
    }
  },
  components:{ChapterCreateForm},  
  methods : {
     onSuccess(form_data){
        console.log("success",form_data)
        // console.log(form_data.title, form_data.body)
     },
     onFail({message}) {
        console.log("failure",message)
     }
  },
  computed : {
    story(){
      return this.$store.state.stories.map[this.story_id]
    },
    header(){
      return (this.story ? `Create a new chapter in '${this.story.title}'` : 'Create a new chapter')
    }
  },
  async fetch({store,params}){
    await store.dispatch("stories/fetchStory",{story_id:params.story_id})
  }
}
</script>

<style>

</style>


