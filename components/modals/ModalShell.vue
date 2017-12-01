<template>
   <div :class='{ "modal" : true, "is-active":this.is_open }'>
      <div class="modal-background"></div>
      <login-modal></login-modal>
   </div>
</template>


<script>
import LoginModal from "~/components/modals/LoginModal";

export default {
   components : {LoginModal},
   methods : {
      close(){
         this.$store.commit("modal/close_modal");
      }
   },

   computed : {
      is_open(){
         return this.$store.state.modal.is_open;
      }
   }
}
</script>

