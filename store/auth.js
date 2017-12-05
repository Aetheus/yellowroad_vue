export const state = () => ({
   user : null,
   auth_token : null,
   is_logged_in : false,
   logged_in_at : null,

   login_attempt_failed : false,
   login_attempt_failed_reason : ""
})

export const mutations = {
   setToken(state,auth_token){
      state.auth_token = auth_token;
   },
   setLoggedInUser(state, {user, auth_token}){
      state.user = user;
      state.is_logged_in = true;
      state.auth_token = auth_token;
   },
   removeLoggedInUser(state){
      state.user = null;
      state.is_logged_in = null;
      state.auth_token = null;
   },
   setLoginAttemptFailed(state,reason){
      state.login_attempt_failed = true;
      state.login_attempt_failed_reason = reason;
   },
   clearLoginAttemptFailed(state){
      state.login_attempt_failed = false;
      state.login_attempt_failed_reason = "";
   }

}

export const actions = {
   async login( {commit, dispatch}, {username, password}){
      try{
         let data = (await this.$axios.$post("/users/login", { username: username, password:password })).data
         
         commit("setLoggedInUser", {
            user: data.user, 
            auth_token: data.token
         })
         commit("clearLoginAttemptFailed")

         return {
            login_success : true,
            token : data.token
         };
      } catch(err){         
         if (err.response && err.response.data && err.response.data.message){
            commit("setLoginAttemptFailed", err.response.data.message);
         } else {
            commit("setLoginAttemptFailed", "Unknown error occurred while attempting to login");
         }
         return {
            login_success: false
         };
      }
   },

   //TODO: don't duplicate the logic of Login - centralize it instead
   async verifyToken( {commit}, token ){
      try {
         let data = (await this.$axios.$post("/users/verify", { auth_token: token })).data

         commit("setLoggedInUser", {
            user: data.user,
            auth_token: data.token
         })
         commit("clearLoginAttemptFailed");

         return true;
      } catch (err) {
         commit("removeLoggedInUser");
         return false;
      }
   },

   async logout({ commit, dispatch} ){
      //async because we may want to log logouts on server side someday
      commit("removeLoggedInUser");
      commit("clearLoginAttemptFailed");

      if (isClient) {
         console.log(JSCookie.get())
         JSCookie.remove("auth_token");
      }

      return true;
   }   
}  