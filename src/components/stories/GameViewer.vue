<template>
  <chapter-viewer
      :story-id="storyId"
      :chapter-id="current_chapter_id"
      :mode="mode"
   >     
  </chapter-viewer>
</template>

<script>
import ChapterViewer from "@/components/chapters/ChapterViewer";
import STORY_MODES from "@/constants/story_modes";

export default {
  name:"GameViewer",
  components: {ChapterViewer},
  props: ["storyId"],
  data () {
    return {mode : STORY_MODES.GAME}
  },
  computed :{
    game(){
        return this.$store.state.game.stories[this.storyId]
    },
    current_chapter_id(){
        return this.game.history[this.game.cursor].current_chapter_id;
    }
  }
}
</script>


