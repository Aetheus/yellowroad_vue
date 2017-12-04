<template>
  <div class="user-navbar-widget is-outlined button" :title="username">
      <img class="image user-navbar-widget_photo" :src="photo_url" alt="">
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
         return `https://previews.123rf.com/images/triken/triken1608/triken160800028/61320729-Male-avatar-profile-picture-Default-user-avatar-guest-avatar-Simply-human-head-Vector-illustration-i-Stock-Vector.jpg`;
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