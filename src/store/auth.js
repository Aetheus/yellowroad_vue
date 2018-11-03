import ALERTS from "@/constants/alert-types"

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
         let data = (await this.$axios.$post("/tokens", { username: username, password:password })).data
         
         commit("setLoggedInUser", {
            user: data.user, 
            auth_token: data.token
         })
         commit("clearLoginAttemptFailed")

         //globally remove the login token
         this.$axios.setToken(data.token)

         return {
            login_success : true,
            token : data.token
         };
      } catch(err){         
        let message = await dispatch("alert/errorAlert", err, { root: true })
        commit("setLoginAttemptFailed", message);

        return { login_success: false };
      }
   },

   //TODO: don't duplicate the logic of Login - centralize it instead
   async verifyToken( {state,commit}, token){
      try {
          token = token ? token : state.auth_token;
          let data = (await this.$axios.$post("/tokens/verify", { auth_token: token })).data

         commit("setLoggedInUser", {
            user: data.user,
            auth_token: data.token
         })
         commit("clearLoginAttemptFailed");
         
         this.$axios.setToken(data.token)

         return true;
      } catch (err) {
         //globally remove the login token
         this.$axios.setToken(false)

         commit("removeLoggedInUser");
         return false;
      }
   },

   async logout({ commit, dispatch} ){
      //async because we may want to log logouts on server side someday
      commit("removeLoggedInUser");
      commit("clearLoginAttemptFailed");

      //globally remove the login token
      this.$axios.setToken(false)

      return true;
   }   
}  