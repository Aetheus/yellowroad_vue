<template>
   <div id="content-container" class="container is-fluid">
      <div class="container">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name:"content-container",
}
</script>

<style>
   #content-container {
      min-height:100%;
   }
</style>

