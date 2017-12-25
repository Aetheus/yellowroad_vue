<template>
   <section>
      <story-card v-for="story_id in storyIds" :key="story_id" :story-id="story_id">
      </story-card>
   </section>
</template>

<script>
import StoryCard from "~/components/stories/StoryCard"

export default {
  name:"stories-listing",
  props : ["story-ids"],
  components:{StoryCard}
}
</script>

