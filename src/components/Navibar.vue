<template>
   <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container">
         <div class="navbar-brand">
            <div class="navbar-item">
               <h1 class="has-text-weight-bold is-size-4">The Library</h1>
            </div>
            
            <!-- navbar items, navbar burger... -->
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
            <!-- navbar items -->
            </div>
         </div>
      </div>      
   </nav>
</template>

<script>
export default {
   name : "navibar"
}
</script>

<style>

</style>


