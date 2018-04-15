<template>
   <story-base-form
      :initialFormState="{title:'',description:''}"
      header="Create New Story"
   >
   </story-base-form>
</template>

<script>
import StoryBaseForm from "@/components/stories/forms/StoryBaseForm";

export default {
   name:"StoryCreateForm",
   components:{StoryBaseForm},
   props: [""]
}
</script>

