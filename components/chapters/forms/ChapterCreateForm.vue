<template>
   <chapter-base-form
      v-on:submit="onChapterSubmit"
      v-on:cancel="onChapterCancel"
      :form-settings = "formSettings"
      :header = "header"
   >
      <chapter-path-attached-form
         :storyId="storyId"
         @change="onChapterPathChange"
      >
      </chapter-path-attached-form>
   </chapter-base-form>
</template>


<script>
import ChapterBaseForm from "~/components/chapters/forms/ChapterBaseForm";
import ChapterDropdown from "~/components/chapters/ChapterDropdown";
import ChapterPathAttachedForm from "~/components/chapter_paths/forms/ChapterPathAttachedForm";

export default {
   name: "chapter-create-form",
   props: ["formSettings", "storyId"],
   components: { ChapterBaseForm, ChapterDropdown,ChapterPathAttachedForm},
   data() {
      return {
        chapter_path_form: {}
      };
   },
   async created() {
      let storyIsLoaded = this.$store.state.stories.map[this.storyId];
      if (!storyIsLoaded) {
         this.$store.dispatch("stories/fetchStory", { story_id: this.storyId });
      }

      let results = await this.$axios.$get(`stories/${this.storyId}/chapters`);
      this.fromChaptersDropdown = results.data.chapters;
   },
   computed: {
      story() {
         return this.$store.state.stories.map[this.storyId];
      },
      header() {
         return this.story ? `Create a new chapter in '${this.story.title}'` : "Create a new chapter";
      }
   },
   methods: {    	
      onChapterPathChange({form, isValid}){
         this.chapter_path_form = form;
      },
      async onChapterSubmit(form_state) {
         let chapter_path = Object.assign({},this.chapter_path_form);
         if(!chapter_path.description){
            chapter_path.description = form_state.title
         }

         let { success, message, chapter } = await this.$store.dispatch("chapters/create",
            {
               story_id: this.storyId,
               chapter: form_state,
               chapter_path: chapter_path
            }
         );
         if (success) {
            this.$emit("success", chapter);
         } else {
            this.$emit("fail", { message });
         }
      },
      onChapterCancel() {
         //bubble this back up
         this.$emit("cancel", this.form_state);
      }
   }
};
</script>
