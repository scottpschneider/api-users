<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2>{{vault.name}}</h2>
      </div>
    </div>
    
    <div class="keeps row">
      <div v-for="(keep, index) in keeps" class="col-4" :key="index">
        {{keep.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vault",
  components: {},
  data() {
    return {};
  },
  props: ["vaultId"],
  mounted() {
    //fire off request to get vault keeps
    this.$store.dispatch("getVaultKeeps", this.vaultId);
    this.$store.dispatch("selectVault", this.vaultId)
  },
  computed: {
    vault() {
      return this.$store.state.activeVault;
    },
    keeps() {
      return this.$store.state.vaultKeeps;
    }
  },
  methods: {
    //dont need to uncomment this method because i created a mounted that loads this info upon page render. no user input, or submit required. 
    //this.$store.dispatch(getVaultKeeps, vaultKeeps)
  }
};
</script>

<style>
</style>
