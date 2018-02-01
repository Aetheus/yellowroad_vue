<template>
   <div class="columns">      
      <chapter-base-form
         v-on:submit="onSubmit" 
         :initial-form-state="{title : 'testT', body: 'testB'}"
         class="column column is-10 is-offset-1"
      >
      </chapter-base-form>
   </div>  
</template>

<script>
import ChapterBaseForm from "~/components/chapters/forms/ChapterBaseForm"

export default {
  components:{ChapterBaseForm},  
  methods : {
     onSubmit(){
        
     }
  }
}
</script>

<style>

</style>


