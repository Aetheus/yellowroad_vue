<template>
  <div class="user-navbar-widget is-outlined button" :title="username">
      <img class="image user-navbar-widget_photo" src="~/assets/img/hand.jpeg" alt="">
      <div class="user-navbar-widget_username has-text-centered">
         <span>{{ username }}</span>
      </div>
   </div>
</template>

<script>
export default {
   name:"user-pill",
   props : ["isCurrentUser" , "userId"],
   computed : {
      username() {
         if(this.isCurrentUser){
            return this.$store.state.auth.user.username;
         } else if (this.userId) {
            //TODO : implement this
            return "Unimplemented"
            //get the user here from the user store
         } else {
            return "?";
         }
      },

      photo_url(){
         //TODO : implement this
         //this is temporary anyway, but for attribution, this was originally from : https://www.pexels.com/photo/adult-architecture-buildings-city-380283/
         return "~/assets/hand.jpeg"
      }

   }
}
</script>

<style>
	.user-navbar-widget{
		display: table;
      width:160px;
	}
	.user-navbar-widget_photo {
		border-radius: 50%;
		display:table-cell;
		vertical-align: middle;

      height: 28px;
      width: 28px;
	}
	.user-navbar-widget_username {
		display:table-cell;
		vertical-align: middle;

      width:105px;
      max-width: 105px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
	}
   .user-navbar-widget_username > span {
      margin-left:4px; margin-right: 4px;
   }
</style>