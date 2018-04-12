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
      },
      link_to_game(){
        return this.link_to_chapter + "/game";
      },
      current_save(){
        let game = this.$store.state.game.stories[this.story.id];
        let current_save = game.history[game.cursor].save
        return current_save;
      }
   },
   methods : {
     async onClick(event){
      event.preventDefault(); event.stopPropagation();
      
      switch (this.mode) {
        case STORY_MODES.GAME : {
          let story_id = this.story.id;
          let chapter_path = this.chapterPath;
          let current_save = this.current_save;
          await this.$store.dispatch("game/advanceGame", {story_id, chapter_path, current_save})
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


