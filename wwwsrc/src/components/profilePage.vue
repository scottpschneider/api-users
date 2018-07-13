<template>
    <div class="container-fluid" id="background">
      <div class="row">
        <div class="col">
        </div>
        <div class="col"></div>
        <favorites></favorites>
      </div>
    </div>
  </template>

<script>
  import Favorites from './Favorites'
  export default {
    name: 'ProfilePage',
    data() {
      return {

      }
    },
    components: {
      Favorites,
    },
    computed: {},
    methods: {}
  }

</script>

<style scoped>
  #background {
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
  }


</style>
