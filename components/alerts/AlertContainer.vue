<template>
   <div id="alert-container" class="columns is-mobile is-multiline">
      <alert-box 
         v-for="alertItem in availableAlerts"
         v-bind:key="alertItem.alert_id"
         :alert="alertItem" v-on:close="handleClose" 
      >
      </alert-box>
   </div>
</template>

<script>
import AlertBox from "~/components/alerts/AlertBox"

export default {
   name : "alert-container",
   components:{AlertBox},
   methods : {
      handleClose(alert){
         this.$store.commit("alert/remove", alert.alert_id)
      }
   },
   computed: {
      availableAlerts(){
         return this.$store.state.alert.queue;
      }
   }
}
</script>

<style>
   #alert-container {
      position: fixed;
      z-index: 9;
      margin-top:20px;
      width:100%;
   }

   #alert-container > .notification {
   }
</style>


