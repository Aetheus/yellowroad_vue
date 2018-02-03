<template>
  <chapter-base-form
      v-on:submit="onSubmit"
      v-on:cancel="onCancel"
      :initialFormState = "initialFormState"
      :formSettings = "formSettings"
  >
  </chapter-base-form>
</template>


<script>
import ChapterBaseForm from "~/components/chapters/forms/ChapterBaseForm"

export default {
   name: "chapter-create-form",
   props : ["initialFormState", "formSettings"],
   components : {ChapterBaseForm},
   data (){
     return {

     }
   },
   methods : {
      async onSubmit(form_state){         
         let {success,message,chapter} = await this.$store.dispatch("chapters/create", form_state)
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
