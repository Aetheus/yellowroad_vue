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
   }
}

export const actions = {
   async fetchSearchResult({ commit, dispatch }, { page, perpage, is_replace_list = true, search_options}){
      try {
         const queryString = (page || perpage ? "?" : "") + (page ? `page=${page}` : "") 
            + (perpage && page ? "&" : "") + (perpage ? `perpage=${perpage}` : ""); 

         //TODO: using axios with our API structure is awkward, since we need to do "data.data" twice. Look into this
         //TODO: use the search options, if any were provided
         let results = (await this.$axios.get(`/stories${queryString}`)).data

         commit("setStoriesUsingSearchResults", {
            search_results: results.data,
            is_replace_list: is_replace_list
         });
      }catch(err){         
         throw err;
      }
   }
}  
