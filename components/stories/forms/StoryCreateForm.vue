<template>
   <story-base-form
      :initialFormState="{title:'',description:''}"
      header="Create New Story"
      @submit="onSubmit"
      @cancel="onCancel"
   >
   </story-base-form>
</template>

<script>
import StoryBaseForm from "@/components/stories/forms/StoryBaseForm";

export default {
   name:"StoryCreateForm",
   components:{StoryBaseForm},
   props: [""],
   methods: {
      async onSubmit(form_state){
         let {success,message,story} = await this.$store.dispatch("stories/create", form_state)
         if(success){
            this.$emit("success",story)
         } else {
            this.$emit("fail", {message})
         }
      },
      onCancel(form_state){
         
      }
   }
}
</script>

