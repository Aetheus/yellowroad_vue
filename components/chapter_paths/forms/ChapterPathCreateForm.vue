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
         <div class="tabs is-toggle">
            <ul>
               <li @click.stop.prevent="setToChapterSetting(true)" :class="{'is-active':isToNewChapter}"><a>New Chapter</a></li>
               <li @click.stop.prevent="setToChapterSetting(false)" :class="{'is-active':!isToNewChapter}"><a>Existing Chapter</a></li>
            </ul>                        
         </div>

         <chapter-base-form
            class="embedded-chapter-form"
            v-if="isToNewChapter"
            v-on:submit="onChapterSubmit"
            v-on:cancel="onChapterCancel"
            :form-settings = "formSettings"
            :header = "header"
         >              
         </chapter-base-form>
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
 .chapter-path-create-form .embedded-chapter-form{
    padding-left:5%;
    padding-right:5%;
 }
</style>


