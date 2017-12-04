<template>
   <div class="navbar-item">
      <template v-if="isLoggedIn">			
			<user-pill is-current-user="true" />
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
import UserPill from "~/components/UserPill"

export default {
	name:"user-shortcuts-widget",
	components:{UserPill},
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

