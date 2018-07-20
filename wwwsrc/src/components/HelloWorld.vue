<template>
<div class="container-fluid" id="background">
    <div class="row d-flex justify-content-center"> 
     <h1>Keepr</h1> 
      </div>
       
        <div class="user form-inline my-2 my-lg-0">
          {{user.userName}}
        </div>
        <button class="button" @click="logout">Log Out of Keepr</button>
            <div class="row -flex justify-content-center">
      <div class="HelloWorld">
        <div class="desc container-fluid">
          <h3>{{user.username}} Submit fav URLs</h3>
          <h4>Share/Keep in your own vault</h4>
        </div>
         <div class="container">
    <div>
      
      <form @submit.prevent="createVault">
        <input type="text" v-model="vault.name" placeholder="vaultname">
        <input type="text" v-model="vault.body" placeholder="body">
        <button type="submit" class="btn btn-primary">Create Vault</button>
      </form>

      <form @submit.prevent="createKeep">
        <input type="text" v-model="keep.name" placeholder="keepname">
        <input type="text" v-model="keep.imgUrl" placeholder="URL">
        <input type="text" v-model="keep.description" placeholder="description">
        <button type="submit" class="btn btn-primary">Create Keep</button>
      </form>

        <!-- <form @submit.prevent="getVaults">
      <button class="btn btn-primary" @click="getVaults">All Vaults</button>
      
      </form> -->

    </div>

    </div>
    <div>
      <vaults></vaults>
    </div>
    <div>
      <keeps></keeps>
    </div>
  </div>
        
      </div>

      </div>
      
  
</template>

<script>
import vaults from "./Vaults";
import keeps from "./Keeps";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your KEEPR App",
      query: "",
      vault: {
        name: "",
        body: ""
      },
      keep: {
        name: "",
        imgUrl: ""

      }
    };
  },
  components: {
    vaults,
    keeps
  },
  mounted() {
    this.getVaults();
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    createKeep() {
      this.$store.dispatch("createKeep", this.keep);
    },
    createVault() {
      this.$store.dispatch("createVault", this.vault);
    },
    getVaults() {
      this.$store.dispatch("getVaults");
    },
    logout() {
      this.$store.dispatch("logout");
    },
    selectVault() {
      this.$store.dispatch("selectVault", this.vault);
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
    height: 100vh;
  }
}
</style>
