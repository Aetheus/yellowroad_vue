<template>
   <div class="navbar-item">
      <div class="user-shortcuts-wrapper" v-if="isLoggedIn">	
			<user-pill @click.native="toggleDropdown" is-current-user="true" />
			<div class="user-shortcuts-dropdown box" tabindex="0" 
				v-show="dropdownOpen"				
			>
				<a href="#" @click="logout">Logout</a>
			</div>
		</div>
		<template v-else>
			<a href="#" @click="openLoginModal" class="navbar-item">
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
	props:[],
	components:{UserPill},
	data(){
		return {
			dropdownOpen : false
		}
	},
	methods: {
		openLoginModal(){
			this.$store.commit("modal/open_modal", "LOGIN")
		},
		async logout(){
			await this.$logoutUser()
		},
		toggleDropdown(){
			this.dropdownOpen = !this.dropdownOpen;
		}
	},
   computed:{
		isLoggedIn(){
			return this.$store.state.auth.is_logged_in;
		}
   }
}
</script>

<style>
.user-shortcuts-wrapper{
	position:relative;
}
.user-shortcuts-dropdown{
	position: absolute;
	top: 100%;
	left: 0px;
	width:100%;
}
</style>
