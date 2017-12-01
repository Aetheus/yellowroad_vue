<template>
   <div class="modal-card">
      <header class="modal-card-head">
         <p class="modal-card-title">Modal title</p>
         <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
         <div>
            <input type="text" name="username" v-model="username" />
            <input type="text" name="password" v-model="password" />
            <button @click="login">
               Login
            </button>
         </div>
      </section>
   </div>
</template>

<script>
export default {
   data(){
      return {
         "username" : "", 
         "password" : ""
      }
   },
   methods : {
      async login() {
         let isNowLoggedIn = await this.$store.dispatch("auth/login", {username:this.username,password: this.password});
         if(isNowLoggedIn){
            this.close();
         }
      },
      close(){
         this.$store.commit("modal/close_modal");
      }
   }
}
</script>

