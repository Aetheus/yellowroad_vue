<template>
   <div class="navbar-item">
      <template v-if="isLoggedIn">
			<a href="#" class="navbar-item">
			   Logout
			</a>
		   </template>
		   <template v-else>
			<a href="#" @click="login" class="navbar-item">
			   Login
			</a>
			<a href="#" class="navbar-item">
			   Register
			</a>
      </template>
   </div>
</template>

<script>
export default {
	name:"user-login-panel",
	methods: {
		async login(){
			this.$store.commit("modal/open_modal", "LOGIN")
		}
	},
   computed:{
		isLoggedIn(){
			return this.$store.state.auth.is_logged_in;
		}
   }
}
</script>

