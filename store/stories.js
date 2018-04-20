import ALERTS from "@/constants/alert-types"

export const state = () => ({
   map: {}, //key : {story's id}, value: {story as JSON}
   list : [], //will only hold the story ids - story data will be in "map" so we don't store redundant data
})

export const mutations = {
   setStoriesUsingSearchResults(store, { search_results, is_replace_list}) {      
      let result_map = {};
      let result_list = [];

      for (let result of search_results){
         result_map[result.id] = result;
         result_list.push(result.id);
      }      

      //merge into the store
      store.map = Object.assign({},store.map,result_map)
      store.list = (is_replace_list) ? result_list : store.list.concat(result_list);
   },

   setStory(store, story) {
      store.map[story.id] = story
   }
}

export const actions = {
   async fetchSearchResult({ commit, dispatch }, { page, perpage, is_replace_list = true, search_options}){
      try {
         const queryString = (page || perpage ? "?" : "") + (page ? `page=${page}` : "") 
            + (perpage && page ? "&" : "") + (perpage ? `perpage=${perpage}` : ""); 

         let results = (await this.$axios.$get(`/stories${queryString}`)).data

         commit("setStoriesUsingSearchResults", {
            search_results: results,
            is_replace_list: is_replace_list
         });
      }catch(err){         
         throw err;
      }
   },

   async fetchStory({commit,dispatch}, {story_id}) {
      //TODO: implement request statuses (see chapters store)
      let book = (await this.$axios.$get(`/stories/${story_id}`)).data

      commit("setStory", book)
   },

   async create({commit, dispatch}, story_details){
      try {
         let response = (await this.$axios.$post(`/stories`, story_details)).data
         commit("setStory", response.book)

         return {
            success: true,
            story : response.book
         }
      } catch(err) {
         //TODO: this catch block is duplicated in several places. Centralize it.
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
   },

   async update({ commit, dispatch }, {story_id, update_form}) {
      try {
         let response = (await this.$axios.$put(`/stories/${story_id}`, update_form)).data
         commit("setStory", response.book)

         return {
            success: true,
            story: response.book
         }
      } catch (err) {
         //TODO: this catch block is duplicated in several places. Centralize it.
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
