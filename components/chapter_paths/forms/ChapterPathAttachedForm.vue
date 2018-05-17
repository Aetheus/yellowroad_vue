<template>
   <div>
      <div class="field">
         <label class="label">Description</label>
         <div class="control">
            <span>
               <input type="checkbox" v-model="useCustomDescription" /> Use custom description for action (if unchecked, will use chapter's title).
            </span>
            <input v-if="useCustomDescription" name="description" class="input" type="text" placeholder="Description" v-model="description">
         </div>
      </div>

      <div class="field">
         <label class="label">From Chapter</label>
         <div class="select">
            <chapter-dropdown
               :chapters="fromChaptersDropdown"
               @change="onFromChapterSelected"
            />
         </div>
      </div>

      <div class="field">
         <label class="label">Effects</label>
         <div class="control">
            <input name="effects" class="input" type="text" placeholder="Effects" v-model="effects">
         </div>
       </div>

      <div class="field">
         <label class="label">Requirements</label>
            <div class="control">
               <input name="requirement" class="input" type="text" placeholder="Requirements" v-model="requirements">
            </div>
          </div>
      </div>
</template>

<script>
import ChapterDropdown from "~/components/chapters/ChapterDropdown";

// Used only to create chapter paths that are attached to a chapter that is also being newly created
export default {
   name: "ChapterPathAttachedForm",
   components: { ChapterDropdown },
   props: ["storyId"],
   data() {
      return {
         fromChaptersDropdown: [],
         selectedFromChapterId: null,
         effects: "{}",
         requirements: "{}",
         description: "",
         useCustomDescription: false,
      };
   },
   watch: {
      "$data": {
         handler: function(newValue, oldValue) {
            let newEffects = {};
            let newRequirements = {};
            let isValid = true;

            try {
               newEffects = JSON.parse(newValue.effects)
               newRequirements = JSON.parse(newValue.requirements)
            }catch (e){
               isValid = false;
            }

            let form = {
               from_chapter_id: newValue.selectedFromChapterId,
               effects: newEffects,
               requirements: newRequirements,
            }
            if (this.useCustomDescription) {
               form.description = newValue.description
            }

            this.$emit("change", {
               form,
               isValid
            });
         },
         deep:true
      }
   },
   async created() {
      let results = await this.$axios.$get(`stories/${this.storyId}/chapters`);
      this.fromChaptersDropdown = results.data.chapters;
   },
   methods: {
      onFromChapterSelected(selectedFromChapterId) {
         this.selectedFromChapterId = selectedFromChapterId;
      }
   }
};
</script>
