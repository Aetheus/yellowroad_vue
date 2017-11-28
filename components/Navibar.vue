<template>
   <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
	<div class="container">
	   <div class="navbar-brand">
		<div class="navbar-item">
		   <logo></logo>
		</div>
	   </div>

	   <div class="navbar-menu">
		<div class="navbar-start">
		   <router-link to="/" class="navbar-item">
			Home
		   </router-link>
		   <router-link to="/stories" class="navbar-item">
			Stories
		   </router-link>
		</div>

		<div class="navbar-end">
		   <user-login-panel></user-login-panel>
		</div>
	   </div>
	</div>      
   </nav>
</template>

<script>
import UserLoginPanel from "~/components/UserLoginPanel"
import Logo from "~/components/Logo"

export default {
   name : "navibar",
   components :{UserLoginPanel, Logo},
   data(){
	return {}
   },
   computed(){
	return {}
   }
}
</script>

<style>

</style>


