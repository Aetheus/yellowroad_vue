<template>
   <chapter-path-base-form
      header="Updating [x]"
      :storyId="storyId"
      :initialFormState="{
         effects : {'/health': {'op': 'SET', 'arg': -5}},
         requirements : {'paste2':'ace2'},
         description : 'wasted'
      }"
   >
   </chapter-path-base-form>
</template>

<script>
import ChapterPathBaseForm from "@/components/chapter_paths/forms/ChapterPathBaseForm"

export default {
   name:"ChapterPathUpdateForm",
   components: {ChapterPathBaseForm},
   props:["storyId"]
}
</script>

<style>

</style>


