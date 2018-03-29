<template>
  <li>        
    <a :href="link_to_chapter"  @click="onClick">
      {{chapterPath.description}}
    </a>
  </li>
</template>

<script>
import STORY_MODES from "@/constants/story_modes"

export default {
   name:"ChapterPath",
   props:["chapterPath","story","mode"],
   computed : {
     link_to_chapter(){
       return `/stories/${this.story.id}/chapters/${this.chapterPath.to_chapter_id}`;
     }
   },
   methods : {
     onClick(event){
      event.preventDefault(); event.stopPropagation();
      
      switch (this.mode) {
        case STORY_MODES.GAME : {
          //TODO : post the savefile to the "game route" here
          break;
        }
        default : {
          this.$router.push(this.link_to_chapter)
          break;
        }
      }

     }
   }
}
</script>

<style>

</style>


