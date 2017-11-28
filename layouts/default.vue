<template>
  <div id="app" class="has-navbar-fixed-top">
    <navibar></navibar>
    <content-container>
      <nuxt/>
    </content-container>
  </div>
</template>

<script>
import Navibar from '@/components/Navibar'
import ContentContainer from "@/components/ContentContainer"

export default {
  name: 'app',
  components:{Navibar, ContentContainer}
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  margin:0px;
  padding:0px;
}
/* need to add this here since Bulma only accepts it if its added to HTML, which is what we're not doing */
#app.has-navbar-fixed-top {
  padding-top: 3.25rem;
}
</style>
