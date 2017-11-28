<template>
   <div class="navbar-item">
      <template v-if="isLoggedIn">
			<a href="#" class="navbar-item">
			   Logout
			</a>
		   </template>
		   <template v-else>
			<a href="#" class="navbar-item">
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
   computed(){
	   return {
         isLoggedIn(){
            return false;
         }
	   }
   }
}
</script>

