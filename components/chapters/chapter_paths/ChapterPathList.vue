<template>
   <ul>
      <chapter-path
         v-for="chapter_path in chapter_paths" 
         :key="chapter_path.id"
         :chapterPath="chapter_path"
         :story="story"
      />
   </ul>
</template>

<script>
import ChapterPath from "@/components/chapters/chapter_paths/ChapterPath"

export default {
   name:"ChapterPathList",
   props: ["chapterId", "storyId"],
   components:{ChapterPath},
   computed:{
      story(){
         let book = this.$store.state.stories.map[this.storyId];
         return book ? book : {};
      },
      chapter_paths(){
         let chapter = this.$store.state.chapters.map[this.chapterId];
         if (chapter && chapter.paths_away) {
            return chapter.paths_away;
         } else {
            return [];
         }
      }
   }
}
</script>

<style>

</style>


