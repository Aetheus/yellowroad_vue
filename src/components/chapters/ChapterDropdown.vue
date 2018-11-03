<template>
   <select name="" id=""
      v-model="selected_option"      
   >
      <option disabled value="">Select a Chapter</option>
      <option 
         v-for="chapter in chapters" 
         :key="chapter.id"
         :value="chapter.id"
      >
         {{chapter.title}}
      </option>
   </select>
</template>

<script>
export default {
   name:"ChapterDropdown",
   props:["chapters"],
   data(){
      return {
         selected_option : ""
      }
   },
   watch: {
      selected_option : function(newValue, oldValue){
         this.$emit('change', newValue)
      }
   }
}
</script>

<style>
   
</style>


