<template>
   <div :class="['notification', alertStyle, 'column is-10', 'is-offset-1']">
      <button class="delete is-large"
        v-on:click="this.emitClose">        
      </button>
      {{alert.message}} 
   </div>
</template>

<script>
export default {
  name : "alert-box",
  props: ["alert"],
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
    }
  }
}
</script>

