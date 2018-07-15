<template>
   <div class="requirements-properties-editor">
      <button @click="addProperty">Add Property</button>
      <table>
         <tr v-for="(property, propertyName) in value" :key="propertyName" 
            class="table is-bordered is-stripped"
         >
            <td> {{propertyName}} </td>
            <td>
               <any-property                   
                  :value="property"
                  @input="(val) => { updateProperty(propertyName, val) }"
               > 
               </any-property>
            </td>
         </tr>
      </table>      
   </div>
</template>

<script>
import AnyProperty from "./properties/AnyProperty"

export default {
   name: "PropertiesEditor",
   components: {AnyProperty},
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
   methods:{
      addProperty(){
         const properties = { ...this.value };
         const latestPropName = this.latestDefaultPropName;

         properties[latestPropName] = { "const": "" };
         this.$emit("input", properties)
      },
      updateProperty(propertyName, newValue) {
         const properties = { ...this.value };
         properties[propertyName] = newValue;

         this.$emit("input", properties);
      }
   }
}
</script>

<style>

</style>


