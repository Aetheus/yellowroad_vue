<template>
  <div>
     <h1 class="title is-5">
        {{this.chapter.title}}
     </h1>     
     <hr>
         {{this.chapter.body}}
     <hr>
     <chapter-path-list :chapter-id=this.chapterId :story-id=this.storyId />
  </div>  
</template>

<script>
import ChapterPathList from "@/components/chapters/chapter_paths/ChapterPathList"

export default {
  name:"ChapterViewer",
  components: {ChapterPathList},
  props: ["chapterId", "storyId"],
  computed : {
     chapter(){
        return this.$store.state.chapters.map[this.chapterId]
     },
     story(){
        return this.$store.state.stories.map[this.storyId]
     }
  }
}
</script>

<style>

</style>


