<template>
   <chapter-path-base-form
      class="chapter-path-create-form"
      header="Creating Chapter Path"
      :storyId="storyId"
      :formSettings="{ hide_to_chapter_id : isToNewChapter}"
      :initialFormState="{
         effects : {}, requirements : {}, description : ''
      }"
   >
      <template slot="before-toChapterDropdown">
         <div class="field is-horizontal">
            <div class="field-label">
               <label class="label">Is Path To New Chapter?</label>
            </div>
            <div class="field-body">
               <div class="tabs is-toggle">
                  <ul>
                     <li @click.stop.prevent="setToChapterSetting(true)" :class="{'is-active':isToNewChapter}"><a>New Chapter</a></li>
                     <li @click.stop.prevent="setToChapterSetting(false)" :class="{'is-active':!isToNewChapter}"><a>Existing Chapter</a></li>
                  </ul>                        
               </div>
            </div>
         </div>
      </template>

      

      <template v-if="isToNewChapter" slot="after-toChapterDropdown">
         <hr>
         <div class="embedded-chapter-form-wrapper has-background-light box">
            <chapter-base-form            
               class="embedded-chapter-form"
               v-on:submit="onChapterSubmit"
               v-on:cancel="onChapterCancel"
               :form-settings = "formSettings"
               header = "New Chapter"
            >              
            </chapter-base-form>
         </div>
         <hr>
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
         isToNewChapter : true
      }
   },
   methods:{
      setToChapterSetting(isToNewChapter){
         this.isToNewChapter = isToNewChapter;
      }
   }

}
</script>

<style>
 .chapter-path-create-form .embedded-chapter-form-wrapper{
    width:100%;
 }
 .chapter-path-create-form .embedded-chapter-form-wrapper > .embedded-chapter-form{
    width:90%;
    margin:auto;
 }
</style>


