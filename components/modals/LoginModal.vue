<template>
   <div class="modal-card">
      <header class="modal-card-head">
         <p class="modal-card-title">Modal title</p>
         <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
         <div>
            <input type="text" name="username" v-model="username" />
            <br>
            <input type="password" name="password" v-model="password" />
            <button @click="login">
               Login
            </button>
         </div>
      </section>
   </div>
</template>

<script>
import JSCookie from "js-cookie";
export default {
   data(){
      return {
         "username" : "", 
         "password" : ""
      }
   },
   methods : {
      async login() {
         try {
            let success = await this.$loginUser({username:this.username,password: this.password});
            if( success ){
               this.close();
            }
         } catch (e) {
            console.error(e)
         }
      },
      close(){
         this.username = "";
         this.password = "";
         this.$store.commit("modal/close_modal");
      }
   }
}
</script>

