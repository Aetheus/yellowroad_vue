<template>
   <div class="effects-editor">
      <!-- {"/health": {"op": "SET", "arg": -5}, "/morale": {"op": "SET", "arg": 50}} -->
      <table class="table">
         <tr 
            v-for="path in alphabeticallySortedPaths" 
            :key="path"
         >
            <td>
               <input type="text" :value="path"
                  @blur="(event) => {onPathChange(path,event.target.value)}" 
               >
            </td>
            <td>
               <input type="text" :value="effects[path].op"
                  @blur="(event) => {updateEffect(path,{op:event.target.value})}" 
               >
            </td>
            <td>
               <input type="text" :value="effects[path].arg"
                  @blur="(event) => {updateEffect(path,{arg:event.target.value})}" 
               >
            </td>
         </tr>
      </table>
      <button @click="addEffect">Add Effect</button>
   </div>
</template>


<script>
export default {
   name:"EffectsEditor",
   props : {       
      initialEffects : {type:Object}
   },
   data(){
      return {
         effects : { ...this.initialEffects }
      }
   },
   watch:{
      effects(newEffects){         
         // TODO: investigate custom v-models as potential replacement for this (https://alligator.io/vuejs/add-v-model-support/)
         this.$emit("change", newEffects)
      }
   },
   computed :{
      alphabeticallySortedPaths(){
         return Object.keys(this.effects).sort()
      }
   },
   methods:{
      addEffect(){
         let counter = 1;
         let pathname = `path_${counter}`
         while(this.effects[pathname]){
            counter++;
            pathname = `path_${counter}`
         }

         this.$set(this.effects,pathname,{op:"SET",arg:"your value here"})
      },
      onPathChange(originalPathName,newPathName){
         let effectAtPath = this.effects[originalPathName]

         this.$delete(this.effects,originalPathName)
         this.$set(this.effects,newPathName,effectAtPath)
      },
      updateEffect(path, change){
         const currentEffectAtPath = this.effects[path];
         const updatedEffectAtPath = { ...currentEffectAtPath, ...change }         
         
         this.effects = {
            ...this.effects,
            [path] : updatedEffectAtPath
         }         
      }
   }

}
</script>

<style>
   .effects-editor{

   }
</style>
