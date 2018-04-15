<template>
   <div class="story-viewer">
      <h1> {{story.title}} </h1>
      <div> {{story.description}} </div>
      <router-link
         :to="{ path:`/stories/${storyId}/game`}"
         class="button is-primary"
      >
         Play
      </router-link>
      <br>

      <!--TODO: only show below links if user has required permissions -->
      <router-link
         :to="{ path:`/stories/${storyId}/edit`}"
         class="button is-primary"
      >
         Edit Story
      </router-link>
      <br>
      <router-link
         :to="{ path:`/stories/${storyId}/chapters/create`}"
         class="button is-primary"
      >
         Write New Chapter
      </router-link>
      <br>
   </div>
</template>

<script>
export default {
  name: "StoryViewer",
  props:["storyId"],
  computed:{
     story(){
        return this.$store.state.stories.map[this.storyId];
     }
  }
}
</script>

<style>
   .story-viewer {

   }
</style>
