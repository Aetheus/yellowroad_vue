<template>
<div class="chapter-path-base-form">
   <div v-if="header" class="field">
      <h1 class="title">{{header}}</h1>
   </div>

   <div class="field is-horizontal">
      <div class="field-label">
         <label class="label">Action</label>
      </div>
      <div class="field-body">
         <input 
            name="description" class="input" type="text" 
            placeholder="E.g: He took the left fork in the road" 
            :value="value.description"
            @input="(eve) => {updateField('description', eve.target.value)}"
         >
      </div>
   </div>

   <slot name="before-fromChapterDropdown"></slot>
   <div v-if="!settings.hide_from_chapter_id" class="field is-horizontal">
      <div class="field-label">
         <label class="label">From Chapter</label>
      </div>

      <div class="field-body">
         <div class="select">
            <chapter-dropdown 
               :chapters="chaptersIndex" 
               @change="(id) => {updateField('from_chapter_id', id)}"
            />
         </div>
      </div>
   </div>

   <slot name="before-toChapterDropdown"></slot>
   <div v-if="!settings.hide_to_chapter_id" class="field is-horizontal to-chapter-field">
      <div class="field-label">
         <label class="label">To Chapter</label>
      </div>

      <div class="field-body">
         <div class="to-chapter-field-body-wrapper">
            <div class="select">
               <chapter-dropdown 
                  :chapters="chaptersIndex" 
                  @change="(id) => {updateField('to_chapter_id', id)}"
               />
            </div>
         </div>
      </div>
   </div>
   <slot name="after-toChapterDropdown"></slot>

   <div class="field is-horizontal">
      <div class="field-label">
         <label class="label">Effects</label>
      </div>
      <div class="field-body">
         <effects-editor 
            :value="value.effects"
            @input="(val) => {updateField('effects', val)}"
         >
         </effects-editor>
      </div>
   </div>

   <div class="field is-horizontal">
      <div class="field-label">
         <label class="label">Requirements</label>
      </div>
      <div class="field-body">
         <input 
            name="requirement" class="input" type="text" placeholder="Requirements" 
            :value="value.requirements"
            @input="(eve) => {updateField('requirements', eve.target.value)}"
         >   
      </div>
   </div>

   <slot name="before-End"></slot>
   <br>
</div>
</template>

<script>
import ChapterDropdown from "@/components/chapters/ChapterDropdown"
import EffectsEditor from "@/components/chapter_paths/forms/EffectsEditor"

const DEFAULT_SETTINGS = {
   hide_to_chapter_id : false,
   hide_from_chapter_id: false,    
}

const DEFAULT_STATE = {
   effects : {},
   requirements : {},
   description : "",
   to_chapter_id: null,
   from_chapter_id: null
}

export default {
   name: "ChapterPathBaseForm",
   components: {ChapterDropdown,EffectsEditor},
   props : {
      value :{type: Object},
      storyId:{type: Number},
      header:{type:String},
      formSettings: {type: Object},
   },
   data(){      
      //ensure that the parent state has the default fields at least
      this.updateField();
      return {     
         chaptersIndex : [],
      }
   },
   computed: {
      settings() {
         return {  ...DEFAULT_SETTINGS, ...this.formSettings }
      },
      defaultFormState(){
         return {...this.generateDefaultState(this.settings), ...this.value};
      }
   },
   async created() {
      this.chaptersIndex = await this.fetchChaptersIndex();
   },
   methods : {
      updateField(fieldName,fieldValue) {
         const newState = {...this.defaultFormState, ...this.value};
         if(fieldName){
            newState[fieldName] = fieldValue
         }
         this.$emit("input",newState);
      },
      async fetchChaptersIndex(){
         let results = await this.$axios.$get(`stories/${this.storyId}/chapters`);
         return results.data.chapters;
      },
      generateDefaultState(settings){
         let default_state = { ...DEFAULT_STATE }

         if (settings.hide_to_chapter_id) {
            delete default_state.to_chapter_id;
         }
         if (settings.hide_from_chapter_id) {
            delete default_state.from_chapter_id;
         }

         return default_state
      }
   }
}
</script>

<style>
   .chapter-path-base-form .to-chapter-field .to-chapter-field-body-wrapper {
      width:100%;
   }
</style>


