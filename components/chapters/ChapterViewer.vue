<template>
  <div>
     <h1 class="title is-5">
        {{chapter.title}}
     </h1>     
     <hr>
         {{chapter.body}}
     <hr>
     <chapter-path-list :mode=mode :chapter-id=chapterId :story-id=storyId />
  </div>  
</template>

<script>
import ChapterPathList from "@/components/chapters/chapter_paths/ChapterPathList"

export default {
  name:"ChapterViewer",
  components: {ChapterPathList},
  props: ["chapterId", "storyId", "mode"],
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


