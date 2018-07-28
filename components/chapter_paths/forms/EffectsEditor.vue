<template>
   <div class="effects-editor">      
      <button @click="addEffect">Add Effect</button>
      <table class="table">
         <tr 
            v-for="path in alphabeticallySortedPaths" 
            :key="path"
         >
            <td>
               <input type="text" :value="path"
                  @blur="(event) => {updatePathName(path,event.target.value)}" 
               >
            </td>
            <td>
               <input type="text" :value="value[path].op"
                  @blur="(event) => {updateEffect(path,{op:event.target.value})}" 
               >
            </td>
            <td>
               <input type="text" :value="value[path].arg"
                  @blur="(event) => {updateEffect(path,{arg:event.target.value})}" 
               >
            </td>
            <td>
               <button @click="deleteEffect(path)">Delete</button>
            </td>
         </tr>
      </table>      
   </div>
</template>


<script>
export default {
   name:"EffectsEditor",
   props : {       
      value : {type:Object},
   },
   data(){
      return {}
   },
   computed :{
      alphabeticallySortedPaths(){
         return Object.keys(this.value).sort()
      },
      latestDefaultPathname(){
         const effects = this.value;

         let counter = 1;
         let pathname = `/prop_${counter}`;
         while(effects[pathname]){
            counter++;
            pathname = `/prop_${counter}`
         }

         return pathname;
      }
   },
   methods:{
      addEffect(){
         const effects = {...this.value};
         const pathname = this.latestDefaultPathname;

         effects[pathname] = {op:"SET",arg:"your value here"};

         this.emitInput(effects)
      },
      updatePathName(originalPathName,newPathName){
         if (originalPathName != newPathName) {
            const effects = {...this.value};
            const effectAtPath = effects[originalPathName];

            effects[newPathName] = effectAtPath;
            delete effects[originalPathName];

            this.emitInput(effects)
         }
      },
      updateEffect(path, change){
         const effects = {...this.value};
         const currentEffectAtPath = effects[path];

         effects[path] = { ...currentEffectAtPath, ...change }

         this.emitInput(effects)
      },
      deleteEffect(path){
         const effects = {...this.value};

         delete effects[path];

         this.emitInput(effects)
      },
      emitInput(effects) {
         this.$emit("input", effects)
      }
   }

}
</script>

<style>
   .effects-editor{

   }
</style>
