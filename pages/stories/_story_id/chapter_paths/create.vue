<template>
   <chapter-path-create-form
      :storyId="story_id"
   >
   </chapter-path-create-form>
</template>


<script>
import ChapterPathCreateForm from "@/components/chapter_paths/forms/ChapterPathCreateForm"

export default {
   name:"ChapterPathsCreatePage",
   components:{ChapterPathCreateForm},
   async asyncData({ params, error, store }) {
      return {
         story_id: parseInt(params.story_id)
      }
   },
}
</script>

<style>

</style>


