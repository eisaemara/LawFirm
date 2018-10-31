<template>
  <div id="app">
   <app-Template>
   <router-view></router-view>         
   </app-Template>
   
  </div>
</template>

<script>
import AppTemplate from "./components/shared/app-template.vue";
import Lookups from "./components/lookups/Lookups.vue";

export default {
  name: "app",
  components: {
    AppTemplate,
    Lookups
  }
};
</script>

<style>
</style>
