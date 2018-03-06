<template>
   <div class="modal-card">
      <header class="modal-card-head">
         <p class="modal-card-title">Login</p>
         <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
         <div class="field">
            <label class="label"> Username </label>
            <div class="control">
              <input 
                type="text" name="username" 
                v-model="username" 
                class="input" 
              />
            </div>           
         </div>
        <div class="field">
            <label class="label"> Password </label>
            <div class="control">
              <input 
                type="password" name="password" 
                v-model="password"
                class="input"  
              />
            </div>
        </div>
        <button 
          @click="login"
          class="button is-primary pull-right"
        >
            Login
        </button>
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

