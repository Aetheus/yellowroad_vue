<template>
   <div class="requirements-properties-editor">
      <button @click="addProperty">Add Property</button>
      <table class="table">
         <tr v-for="(val, key) in value" :key="key">
            <td> {{key}} </td>
            <td> {{ JSON.stringify(val) }} </td>
         </tr>
      </table>
   </div>
</template>

<script>
export default {
   name: "PropertiesEditor",
   props: {
      value: {type:Object}
   },
   computed :{
      latestDefaultPropName(){
         const properties = this.value;

         let counter = 1;
         let pathname = `prop_${counter}`;
         while(properties[pathname]){
            counter++;
            pathname = `prop_${counter}`
         }

         return pathname;
      }
   },
   method:{
      addProperty(){
         const properties = { ...this.value };
         const latestPropName = this.latestDefaultPropName;

         properties[latestPropName] = {};
         
         this.$emit("input", properties)
      },
   }
}
</script>

<style>

</style>


