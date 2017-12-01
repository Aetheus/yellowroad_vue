export const state = () => ({
   is_open : false,
   type : "",
})

export const mutations = {
   open_modal(state, type) {
      state.is_open = true;
      state.type = type;
   },
   close_modal(state){
      state.is_open = false;
      state.type = "";
   }
}

export const actions = {
}  