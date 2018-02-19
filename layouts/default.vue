<template>
  <div id="app" class="has-navbar-fixed-top">
    <navibar></navibar>
    <alert-container> </alert-container>
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
import AlertContainer from "~/components/alerts/AlertContainer";

export default {
  name: 'app',
  components:{Navibar, ContentContainer,ModalShell,AlertContainer},
  async mounted() {
    await this.$verifyUserToken();
  },
  computed:{
    isLoggedIn(){
      return this.$store.state.auth.is_logged_in;
    }
  }
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
