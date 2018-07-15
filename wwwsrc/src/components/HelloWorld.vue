<template>
<div class="container-fluid" id="background">
    <div class="row d-flex justify-content-center">
     <img class="logo1 animateBar1 animated rollIn" src="robot-vacuum.jpg" alt="">  
      </div>
       <div class="form-inline my-2 my-lg-0" v-if="!user._id">
          <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse" :to="{name: 'Auth'}">login/register</router-link>
        </div>
        <div class="user form-inline my-2 my-lg-0" v-else>{{user.userName}}
        </div>
        <button class="button" v-if="user._id" @click="logout">Log Out</button>
            <div class="row -flex justify-content-center">
      <div class="HelloWorld">
        <div class="desc container-fluid">
          <h1>"Keepr, keep in your vault {{user.userName}}</h1>
        </div>
         <div class="container">
    <div>
      <form @submit.prevent="createVault">
      <input type="text" v-model="vault.name" placeholder="vaultname">
      <input type="text" v-model="vault.body" placeholder="body">
      <button type="submit" class="btn btn-primary">Create Vault</button>
        </form>

        <form @submit.prevent="getVaults">
      <button class="btn btn-primary" @click="getVaults">Vaults</button>
      </form>

      <form @submit.prevent="toggle"></form>
      <button class="btn btn-primary" @click="toggle">Keeps</button>
    </div>

    </div>
    <div v-if="bool">
      <vaults></vaults>
    </div>
    <div v-if="!bool">
      <keeps></keeps>
    </div>
  </div>
        
      </div>

      </div>
      
  
</template>

<script>
import Vaults from "./Vaults";
import Keeps from "./Keeps";

export default {
  name: "HelloWorld",
  mounted() {
    this.$store.dispatch("authenticate");
  },
  data() {
    return {
      msg: "Welcome to Your KEEPR App",
      query: "",
      bool: true,
      vault: {
        name: "",
        body: ""
      }
    };
  },
  components: {
    Vaults,
    Keeps
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    toggle() {
      this.bool = !this.bool;
    },
    createVault() {
      this.$store.dispatch("createVault", this.vault);
    },
    getVaults() {
      this.$store.dispatch("getVaults", this.Vaults);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  font-family: "Jura", sans-serif;
  text-align: center;
}

@media only screen and (min-device-width: 415px) {
  #background {
    background-image: url("../assets/sunsetMountainLake.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: white;
    height: 100%;
  }
}
</style>
