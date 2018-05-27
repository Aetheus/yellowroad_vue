<template>
   <chapter-path-base-form
      class="chapter-path-create-form"
      header="Creating Chapter Path"
      :storyId="storyId"
      :formSettings="{ hide_to_chapter_id : isToNewChapter}"
      v-model="newChapterPath"
   >
      <template slot="before-fromChapterDropdown">
         <div class="field is-horizontal">
            <div class="field-label">
               <label class="label">Is Path To New Chapter?</label>
            </div>
            <div class="field-body">
               <div class="tabs is-toggle is-small">
                  <ul>
                     <li @click.stop.prevent="setToChapterSetting(true)" :class="{'is-active':isToNewChapter}">
                        <!-- <a>New Chapter</a> -->
                        <a>Yes</a>
                     </li>
                     <li @click.stop.prevent="setToChapterSetting(false)" :class="{'is-active':!isToNewChapter}">
                        <!-- <a>Existing Chapter</a> -->
                        <a>No</a>
                     </li>
                  </ul>                        
               </div>
            </div>
         </div>
      </template>

      <template v-if="isToNewChapter" slot="after-toChapterDropdown">
         <hr>
         <!-- embedded-chapter-form-wrapper  -->
         <div class="columns is-centered">
            <div class="column is-four-fifths has-background-light box">
               <chapter-base-form       
                  v-model="newChapter"
                  class="embedded-chapter-form"
                  :header = "newChapter.title ? newChapter.title : 'New Chapter'"
               >              
               </chapter-base-form>
            </div>
         </div>
         
         <hr>
      </template>

      <template slot="before-End">
         <div class="field is-grouped is-grouped-right">
            <p class="control">
               <a @click="onSubmit" class="button is-primary"> Submit </a>
            </p>
            <p class="control">
               <a @click="onCancel" class="button is-light"> Cancel </a>
            </p>
         </div>
      </template>
   </chapter-path-base-form>
</template>

<script>
import ChapterPathBaseForm from "@/components/chapter_paths/forms/ChapterPathBaseForm"
import ChapterBaseForm from "~/components/chapters/forms/ChapterBaseForm";

export default {
   name:"ChapterPathCreateForm",
   components: {ChapterPathBaseForm,ChapterBaseForm},
   props:["storyId"],
   computed : {
      hideToChapterDropdown() {
         return this.isCreateNewChapter;
      }
   },
   data(){
      return {
         isToNewChapter : true,
         newChapter:{},
         newChapterPath: {
            effects : {}, 
            requirements : {}, 
            description : ''
         }
      }
   },
   methods:{
      setToChapterSetting(isToNewChapter){
         this.isToNewChapter = isToNewChapter;
      },
      onSubmit(){

      },
      onCancel(){

      }
   }

}
</script>

<style> 
</style>


