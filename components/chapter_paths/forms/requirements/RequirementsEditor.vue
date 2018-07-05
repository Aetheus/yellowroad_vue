<template>
   <div>
      <properties-editor :value="value.properties">
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
            "title": "A registration form",
            "description": "A simple form example.",
            "type": "object",
            "properties": {},
            "required": []
         }
      }
   },
   methods: {
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


