<template>
<div class="chapter-path-base-form">
   <div v-if="header" class="field">
      <h1 class="title">{{header}}</h1>
   </div>

   <div class="field">
      <label class="label">Description</label>
      <div class="control">
         <input name="description" class="input" type="text" placeholder="Description" v-model="formState.description">
      </div>
   </div>

   <div class="field">
      <label class="label">Requirements</label>
      <div class="control">
         <input name="requirement" class="input" type="text" placeholder="Requirements" v-model="formState.requirements">
      </div>
   </div>

   <div class="field">
      <label class="label">Effects</label>
      <div class="control">
         <effects-editor v-model="formState.effects">
         </effects-editor>
      </div>
   </div>



   <div class="field from-chapter-field">
      <label class="label">From Chapter</label>
      <div class="control">
         <slot name="before-fromChapterDropdown"></slot>
         <div v-if="!settings.hide_from_chapter_id" class="select">
            <chapter-dropdown :chapters="chaptersIndex" @change="onFromChapterSelected" />
         </div>
      </div>
   </div>

   <div class="field">
      <label class="label">To Chapter</label>

      <div class="control">
         <slot name="before-toChapterDropdown"></slot>
         <div v-if="!settings.hide_to_chapter_id" class="select">
            <chapter-dropdown :chapters="chaptersIndex" @change="onToChapterSelected" />
         </div>
      </div>
   </div>


   <div class="field is-grouped">
      <p class="control">
         <a v-on:click="this.emitSubmit" class="button is-primary"> Submit </a>
      </p>
      <p class="control">
         <a v-on:click="this.emitCancel" class="button is-light"> Cancel </a>
      </p>
   </div>
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
      initialFormState:{type: Object}, 
      storyId:{type: Number},
      header:{type:String},
      formSettings: {type: Object},
   },
   data(){      
      //computed properties aren't available yet at this point, so we'll have to manually merge the settings
      const settings = {...DEFAULT_SETTINGS, ...this.formSettings};

      return {         
         formState : {
            ...this.generateDefaultState(settings),
            ...this.initialFormState
         },
         chaptersIndex : [],
      }
   },
   computed: {
      settings() {
         return {  ...DEFAULT_SETTINGS, ...this.formSettings }
      }
   },
   async created() {
      this.chaptersIndex = await this.fetchChaptersIndex();
   },
   methods : {
      emitSubmit(){
         this.$emit("submit", this.formState)
      },
      emitCancel(){
         this.$emit("cancel", this.formState)
      },
      async fetchChaptersIndex(){
         let results = await this.$axios.$get(`stories/${this.storyId}/chapters`);
         return results.data.chapters;
      },
      onFromChapterSelected(id){
         this.formState = {  ...this.formState, from_chapter_id:id  } 
      },
      onToChapterSelected(id){
         this.formState = {  ...this.formState, to_chapter_id:id  } 
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
   .from-chapter-field > * {
      display:inline-block;
      margin-right:5px;
   }
</style>


