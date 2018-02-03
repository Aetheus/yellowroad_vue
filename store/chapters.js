export const state = () => ({
   map: {}, //key : {chapter's id}, value: {chapter as JSON}
   requests : {   
      loading : {},
      failed : {}
   }
})

export const mutations = {
   setChapter(store, chapter){
      store[chapter.id] = chapter;
   },
}

export const actions = {
   async create({ commit, dispatch }, chapter){
      try{
         let response = (await this.$axios.$post(`stories/${chapter.book_id}/chapters`, chapter)).data
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

   async update({ commit, dispatch }, { chapter }) {
      try {
         let response = (await this.$axios.$put(`stories/${chapter.book_id}/chapters/${chapter.id}`, chapter)).data
         commit("setChapter", response.chapter)
      } catch (err) {
         //TODO: create a notification store/system to actually display this
         commit("notification/error", err)
      }
   }
}