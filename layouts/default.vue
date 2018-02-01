<template>
  <div id="app" class="has-navbar-fixed-top">
    <navibar></navibar>
    <content-container>
      <nuxt/>
    </content-container>
    <modal-shell></modal-shell>
  </div>
</template>

<script>
import Navibar from '@/components/Navibar'
import ContentContainer from "@/components/ContentContainer"
import ModalShell from "~/components/modals/ModalShell";

export default {
  name: 'app',
  components:{Navibar, ContentContainer,ModalShell}
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  margin:0px;
  padding:1rem;
}
/* need to add this here since Bulma only accepts it if its added to HTML, which is what we're not doing */
#app.has-navbar-fixed-top {
  padding-top: 3.3rem;
}
</style>
