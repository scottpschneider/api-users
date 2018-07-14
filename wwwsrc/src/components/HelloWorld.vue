<template>
<div class="container-fluid" id="background">
    <div class="row d-flex justify-content-center">
      
      </div>
            <div class="row -flex justify-content-center">
      <div class="HelloWorld">
        <div class="desc container-fluid">
          <h1>"Keepr You'll find posted pics, and vids, and keep in your vault</h1>
        </div>
         <div class="">
    <div>
      <button class="btn btn-primary" @click="toggle">Vaults</button>
      <button class="btn btn-primary" @click="toggle">Keeps</button>
    </div>
    <div v-if="bool">
      <vaults></vaults>
    </div>
    <div v-if="!bool">
      <keeps></keeps>
    </div>
  </div>
        <div class="search container">
          <h3 class="search">What's Posted Today?</h3>
          <!-- <router-link :to="{name:'SearchResults'}"> -->
            <form @submit.prevent="getSearchResults" class="form-inline my-2 my-lg-0">
          <input class="input" type="text" v-model="query" placeholder="search any">
          <button class="button" data-toggle="collapse" data-target=".navbar-collapse" @click="getSearchResults">Search Posts</button>
        </form>
          <!-- </router-link> -->
        </div>

      </div>
       <div class="form-inline my-2 my-lg-0" v-if="!user._id">
          <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse" :to="{name: 'Auth'}">login/register</router-link>
        </div>
        <div class="user form-inline my-2 my-lg-0" v-else>{{user.userName}}
        </div>
        <button class="button" v-if="user._id" @click="logout">Log Out</button>
      </div>
      </div>
  
</template>

<script>
import SearchResults from "./SearchResults.vue";
import Vaults from "./Vaults";
import Keeps from "./Keeps";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your KEEPR App",
    query: '',
    bool:true
    };
  },
  components: {
    SearchResults, 
    Vaults,
    Keeps
  },
  computed: {
    user() {
        return this.$store.state.user
      }
  },
  methods: {
    toggle(){
      this.bool=!this.bool
    },
    goToSearchField() {
      router.push({
        name: "SearchResults"
      });
    },
    getSearchResults() {
        this.$store.dispatch('getSearchResults', this.query)
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{
  font-family: 'Jura', sans-serif;
    text-align: center
  }

   @media only screen and (min-device-width:415px ){
#background {
    background-image: url("../assets/sunsetMountainLake.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment:fixed;
    color: white;
    height: 100%;
  }
   }


</style>
