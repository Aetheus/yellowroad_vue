<template>
   <section>
      <story-card v-for="temp in [1,2,3,4,5,6,7,8,9,10]" :key="temp">
      </story-card>
   </section>
</template>

<script>
import StoryCard from "~/components/stories/StoryCard"

export default {
  name:"stories-listing",
  components:{StoryCard}
}
</script>

