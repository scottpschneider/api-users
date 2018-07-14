<template>
  <div class="container-fluid">
    <div>
     
    </div>
    
    <div class="vaults row">
      <div class="col-4" v-for="vault in vaults" :key="vault.id">
        <div class="card text-center">
          <a @click="selectVault(vault)">
            <h2 class="card-title">{{vault.title}}</h2>
          </a>
          <div>
            <button class="btn btn-danger" @click="deleteVault(vault)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Vaults',
    mounted(){
        //this.$store.dispatch("getVaults")
    },
    data() {
      return {
        newVault:{
          title: ''
        }
      }
    },
    computed: {
      vaults(){
        return this.$store.state.vaults
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      createVault(){
        this.$store.dispatch("createVault", this.newVault)
      }, 
      selectVault(vault){
        this.$store.dispatch("selectVault", vault)
      },
      deleteVault(vault){
        this.$store.dispatch("deleteVault", vault)
      }
    }
  }

</script>

<style>


</style>
