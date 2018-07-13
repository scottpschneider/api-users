<template>
  <div id="app">
    De<img src="./assets/logo.png">elop
    <router-view/>
  </div>
</template>

<script>
import navBar from "./components/NavBar"

export default {
  name: 'App',
  components: {
    navBar
  },
  mounted(){
    this.$store.dispatch('authenticate')
  },
  data(){
    return{}
  },
  computed: {

  },
  methods:{

  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
img {
  height: 10px;
}
</style>
