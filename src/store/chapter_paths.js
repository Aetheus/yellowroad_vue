import ALERTS from "@/constants/alert-types"
import RESOURCE_STATES from "@/constants/resource_states"

export const state = () => ({
   byId: {}
})

export const mutations = {
   setChapterPath(store, chapterPath){
      // stories/:book_id/chapter_paths
      store.byId = { 
         ...store.byId,
         [chapterPath.id]: chapterPath
      }
   }
}

export const actions = {
   async createChapterPath({ commit, dispatch }, { story_id, chapter_path }){
      try {         
         const response = (await this.$axios.$post(`stories/${story_id}/chapter_paths`, chapter_path)).data
         commit("setChapterPath", response)
         return {
            success: true,
            chapter_path: response
         };
      } catch (err) {
         let message = await dispatch("alert/errorAlert", err, { root: true })
         return { success: false, message }
      }
   }
}
