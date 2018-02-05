export const state = () => ({
   map: {}, //key : {chapter's id}, value: {chapter as JSON}
   requests : {   
      loading : {},
      failed : {},
   }
})

export const mutations = {
   setChapter(store, chapter){
      store.map[chapter.id] = chapter;
   },
   setRequestStatus(store, {chapter_id, status}){
      switch(status){
         case "SUCCESS" : {
            delete store.requests.loading[chapter_id];
            delete store.requests.failed[chapter_id];    
            break;        
         }
         case "FAILED" : {
            delete store.requests.loading[chapter_id];
            store.requests.failed[chapter_id] = true;
            break;
         }
         case "LOADING" : {
            delete store.requests.failed[chapter_id];
            store.requests.loading[chapter_id] = true;
            break;
         }
      }
   }
}

export const actions = {
   async fetchChapter ({commit, dispatch}, {story_id, chapter_id}) {
      try {
         commit("setRequestStatus", { chapter_id, status: "LOADING" })         
         let response = (await this.$axios.$get(`stories/${story_id}/chapters/${chapter_id}`)).data
         commit("setChapter", response.chapter)
         commit("setRequestStatus", { chapter_id, status: "SUCCESS"})
      } catch (err) {
         commit("setRequestStatus", { chapter_id, status: "FAILED" })
      }
   },

   async create({ commit, dispatch }, { story_id, chapter_details } ){
      try{
         let response = (await this.$axios.$post(`stories/${story_id}/chapters`, chapter_details)).data
         commit("setChapter", response.chapter)
         
         return {
            success: true,
            chapter: response.chapter
         };
      }catch (err) {
         //TODO: create a notification store/system to actually display this
         //e.g: commit("notification/error",err)
         //bear in mind that we'd still need to return so that the component dispatching this can have a chance to handle it as well

         let message = ""
         if (err.response && err.response.data && err.response.data.message) {
            message = err.response.data.message;
         } else {
            message = err.toString()
         }

         return {
            success : false,
            message
         }
      }
   },

   async update({ commit, dispatch }, { chapter_id, story_id, chapter_details} ) {
      try {
         let response = (await this.$axios.$put(`stories/${story_id}/chapters/${chapter_id}`, chapter_details)).data
         commit("setChapter", response.chapter)

         return {
            success: true,
            chapter: response.chapter
         };
      } catch (err) {
         //TODO: create a notification store/system to actually display this
         // commit("notification/error", err)

         let message = ""
         if (err.response && err.response.data && err.response.data.message) {
            message = err.response.data.message;
         } else {
            message = err.toString()
         }

         return {
            success: false,
            message
         }
      }
   }
}