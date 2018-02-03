<template>
   <div class="columns">      
      <chapter-create-form
         v-on:success="onSuccess" 
         v-on:fail="onFail"
         :initial-form-state="{title : 'testT', body: 'testB', book_id : story_id}"
         class="column column is-10 is-offset-1"
      >
      </chapter-create-form>
   </div>  
</template>

<script>
import ChapterCreateForm from "~/components/chapters/forms/ChapterCreateForm"

export default {
  async asyncData({ params, error }) {
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
  }
}
</script>

<style>

</style>


