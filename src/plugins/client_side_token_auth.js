import JSCookie from "js-cookie";
import Vue from 'vue'

// we use $axios.setHeader to set the global auth token, but this is done in the
// auth Vuex store instead of here so that other parts of the application (e.g: SSR middleware)
// can also set the auth token. This plugin is purely for client-side usage, to ensure that the 
// client side has a consistent way of setting cookies/removing after login/logout (loginUser, logoutUser) 
// and for setting the global auth token to $axios after page load (verifyUserToken)
Vue.use((Vue) => {
   Vue.prototype.$loginUser = async function ({username, password}){
      let { login_success, token } = await this.$store.dispatch("auth/login", { username: this.username, password: this.password });
      if (login_success) {
         this.$setLoginTokenInCookie({ token })         
      }
      return login_success
   }

   Vue.prototype.$logoutUser = async function () {
      this.$removeLoginTokenFromCookie();
      await this.$store.dispatch("auth/logout");
   }

   Vue.prototype.$verifyUserToken = async function () {
      if (this.$store.state.auth.is_logged_in) {
         await this.$store.dispatch("auth/verifyToken")
      }
   }

   Vue.prototype.$setLoginTokenInCookie = function ({ token, expires = 30 }) {
      JSCookie.set("auth_token", token, { expires: expires })
   }

   Vue.prototype.$removeLoginTokenFromCookie = function () {
      JSCookie.remove("auth_token");
   }
})