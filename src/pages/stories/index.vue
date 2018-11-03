<template>
  <div>
    <h1 class="title">Placeholder for Stories</h1>
    <stories-listing :story-ids="resultsList"></stories-listing>
  </div>
</template>

<script>
import StoriesListing from "~/components/stories/StoriesListing"

export default {
  components:{StoriesListing},
  computed: {
    resultsList(){
      return this.$store.state.stories.list;
    }
  },
  async fetch({store,params}){
    //TODO : extract the params to get the page and perpage and search options
    await store.dispatch("stories/fetchSearchResult",{is_replace_list : true})
  }
}
</script>

