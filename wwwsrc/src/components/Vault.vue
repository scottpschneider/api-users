<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2>{{vault.name}}</h2>
      </div>
    </div>
    
    <div class="keeps row">
      <form @submit.prevent="getVaultKeeps">
        <button type="submit" class="btn btn-primary">Vault Keeps</button>
      <div v-for="keep in keeps" class="col-4" :key="keep.id">
        {{keep.name}}
      </div>
      </form>
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
  mounted() {
    //fire off requst to get vault keeps
    this.$store.dispatch({ getVaultKeeps: dispatch }, id);
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
    //this.$store.dispatch(getVaultKeeps, vaultKeeps)
  }
};
</script>

<style>
</style>
