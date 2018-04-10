export const state = () => ({
   stories : {
      /*
         [story_id] : {
            states : [
               {save : {}, current_chapter_id : 1, chapter_path_id: null},
               {save : {job:"knight"}, current_chapter_id : 2, chapter_path_id: 1},
            ]
            cursor : 1
         }
      */
   }
})

export const mutations = {
   ensureStory(store, story_id){
      if (!store.stories[story_id]){
         store.stories[story_id] = {
            states : [
               //{save : {}, current_chapter_id : 2, chapter_path_id: 1},
            ],
            cursor: 0
         }
      }
   },
   pushNewState(store, { story_id, chapter_id, chapter_path_id, save }){
      let cursor = store.stories[story_id].cursor;
      let branch = store.stories[story_id].states.slice(0,cursor+1);

      branch.push({ 
         save, 
         chapter_path_id, 
         current_chapter_id: chapter_id 
      })

      store.stories[story_id].states = branch;
      store.stories[story_id].cursor = branch.length - 1;
   },
   moveCursor(store, {cursor}){
      
   }
}

export const actions = {
   async advanceGame(
      {commit, dispatch}, 
      { story_id, chapter_path, current_save}
   ){
      let { to_chapter_id, chapter_path_id} = chapter_path;

      let result = await this.$axios.post(`/stories/${story_id}/chapters/${to_chapter_id}/game`,{
         save: current_save,
         chapter_path_id
      })      

      commit("pushNewState", {
         story_id,
         chapter_id: to_chapter_id,
         chapter_path_id,
         save: current_save
      })
      commit("chapters/setChapter", result.data.chapter)
   },
   async beginGame(
      {commit, dispatch},
      {story_id, first_chapter_id, starting_save}
   ){
      commit("ensureStory", story_id)
      commit("pushNewState", {story_id, chapter_id: first_chapter_id, save: starting_save})
   }
}