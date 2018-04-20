<template>
  <div>
      <div v-if="header" class="field">
         <h1 class="title">
            {{header}}
         </h1>
      </div>

     <div class="field">
        <label for="title" class="label"></label>
        <div class="control">
           <input 
               type="text" 
               class="input" name="title"
               placeholder="Story Title"
               v-model="form_state.title"
           >
        </div>
     </div>
     <div class="field">
        <label for="description" class="label"></label>
        <div class="control">
            <textarea 
               name="description"
               class="textarea"
               :rows="7"
               v-model="form_state.description"
               placeholder="It all began with ... ">
            </textarea>
        </div>
     </div>
      <div class="field is-grouped">
         <p class="control">
            <a v-on:click="$emit('submit',form_state)" class="button is-primary"> Submit </a>
         </p>
         <p class="control">
            <a v-on:click="$emit('cancel',form_state)" class="button is-light"> Cancel </a>
         </p>
      </div>
  </div>
</template>

<script>
export default {
  name:"StoryBaseForm",
  props :["initialFormState", "header"],
  data(){
     return {
        form_state : this.initialFormState
     }
  }
}
</script>

