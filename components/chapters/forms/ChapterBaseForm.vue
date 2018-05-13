<template>
   <div>
      <div v-if="header" class="field">
         <h1 class="title">
            {{header}}
         </h1>
      </div>

      <div class="field">
         <label class="label" for="chapter-title">Title</label>
         <div class="control">
            <input name="chapter-title" class="input" type="text" placeholder="Chapter Title" v-model="form_state.title">
         </div>
      </div>
      <div class="field">
         <label class="label" for="chapter-body">Body</label>
         <div class="control">
            <!--TODO: replace with a proper Markdown editor with a preview, buttons for common styles, etc -->
            <textarea 
               name="chapter-body" 
               class="textarea" 
               :rows="settings.initial_body_rows"
               v-model="form_state.body"
               placeholder="It all began with ... ">
            </textarea>
         </div>
      </div>
      <slot></slot>
      <div class="field is-grouped">
         <p class="control">
            <a v-on:click="this.emitSubmit" class="button is-primary"> Submit </a>
         </p>
         <p class="control">
            <a v-on:click="this.emitCancel" class="button is-light"> Cancel </a>
         </p>
      </div>
   </div>
</template>

<script>
export default {
   name : "chapter-base-form",
   components :{},
   props : ["initialFormState", "formSettings", "header", "chapterId", "storyId"],
   data(){
      return {
         settings : Object.assign({
            initial_body_rows : 18
         },this.formSettings),
         form_state : (
            this.initialFormState ? this.initialFormState : {
                  title : "",
                  body  : "",
            }
         )
      }
   },
   methods:{
      emitSubmit(){
         this.$emit("submit", this.form_state)
      },
      emitCancel(){
         this.$emit("cancel", this.form_state)
      }
   },
   computed: {
   }
}
</script>

<style>

</style>


