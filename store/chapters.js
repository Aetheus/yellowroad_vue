import ALERTS from "@/constants/alert-types"
import RESOURCE_STATES from "@/constants/resource_states"

export const state = () => ({
   map: {}, //key : {chapter's id}, value: {chapter as JSON}
})

export const mutations = {
    setChapter(store, chapter){
        store.map[chapter.id] = chapter;
    },

    setStatus(store, { id, status }) {
        store.map = { ...store.map, [id]: status }
    }
}

export const actions = {
    async fetchChapter ({commit, dispatch}, {story_id, chapter_id}) {
        try {
            commit("setStatus", { id: chapter_id, status: RESOURCE_STATES.LOADING })
            let response = (await this.$axios.$get(`stories/${story_id}/chapters/${chapter_id}`)).data
            commit("setChapter", response.chapter)
        } catch (err) {
            commit("setStatus", { id: chapter_id, status: RESOURCE_STATES.FAILED })
        }
    },

    async create({ commit, dispatch }, { story_id,chapter,chapter_path } ){
        try{
            let response = (await this.$axios.$post(`stories/${story_id}/chapters`, { chapter, chapter_path})).data
            commit("setChapter", response.chapter)
         
            return {
                success: true,
                chapter: response.chapter
            };
        }catch (err) {

            let message = ""
            if (err.response && err.response.data && err.response.data.message) {
                message = err.response.data.message;
            } else {
                message = err.toString()
            }

        commit("alert/add", { type: ALERTS.ERROR, message: message }, { root: true })

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
         let message = ""
         if (err.response && err.response.data && err.response.data.message) {
            message = err.response.data.message;
         } else {
            message = err.toString()
         }

        commit("alert/add", { type: ALERTS.ERROR, message: message }, { root: true })

         return {
            success: false,
            message
         }
      }
   }
}