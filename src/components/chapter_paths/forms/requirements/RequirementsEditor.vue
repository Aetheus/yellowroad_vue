<template>
   <div>
      <properties-editor
         :value="value.properties"
         @input="updateProperties"
      >
      </properties-editor>
   </div>
</template>

<script>
import PropertiesEditor from "./PropertiesEditor";

export default {
   name: "RequirementsEditor",
   props: { value: { type: Object } },
   components:{PropertiesEditor},
   data(){
      return {
      }
   },
   computed: {
      defaultJsonSchema(){
         return {
            "title": "Default title",
            "description": "Default description",
            "type": "object",
            "properties": {},
            "required": []
         }
      }
   },
   methods: {
      updateProperties(properties){
         const requirements = {...this.value};
         requirements.properties = properties;
         requirements.required = Object.keys(properties)
         this.emitSchema(requirements);
      },
      emitSchema(requirements){
         this.$emit("input", {
            ...this.defaultJsonSchema,
            ...requirements
         });
      }
   }

}
</script>

<style>

</style>


