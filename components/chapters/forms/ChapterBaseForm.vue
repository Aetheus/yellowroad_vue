<template>
   <div>
      <div class="field">
         <label class="label" for="chapter-title">Title</label>
         <div class="control">
            <input name="chapter-title" class="input" type="text" placeholder="Chapter Title" v-model="title">
         </div>
      </div>
      <div class="field">
         <label class="label" for="chapter-body">Body</label>
         <div class="control">
            <!--TODO: replace with a proper Markdown editor with a preview, buttons for common styles, etc -->
            <textarea 
               name="chapter-body" 
               class="textarea" 
               v-model="body"
               placeholder="It all began with ... ">
            </textarea>
         </div>
      </div>
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
   props : ["initialFormState"],
   data(){
	   return Object.assign({
         title : "",
         body  : "",
         sample:""
      }, this.initialFormState)
   },
   methods:{
      emitSubmit(){
         this.$emit("submit", this.$data)
      },
      emitCancel(){
         this.$emit("cancel", this.$data)
      }
   },
   computed: {
   }
}
</script>

<style>

</style>


