<template>
   <div 
    @click="this.cancelAutoClose"
    :class="['notification', alertStyle, 'column is-10', 'is-offset-1']"
   >
      <button class="delete is-large"
        v-on:click="this.emitClose">        
      </button>
      {{alert.message}} 
   </div>
</template>

<script>
const disappearTimeout = 5000;

export default {
  name : "alert-box",
  props: ["alert", "autoClose"],
  data(){
    return {
      close_after_inactive: (typeof this.autoClose) !== "undefined" ? this.autoClose : true
    }
  },
  computed : {
    alertStyle(){
      //TODO: clean this up
      if(this.alert.type == "ERROR") {
        return "is-danger";
      } else {
        return "is-info"
      }
    }
  },
  methods : {
    emitClose(){
      this.$emit("close", this.alert)
    },
    cancelAutoClose(){
      this.close_after_inactive = false;
    }
  },
  mounted(){
    setTimeout(() => {
      if (this.close_after_inactive){
        this.emitClose();
      }
    }, disappearTimeout)
  }
}
</script>

