<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2>{{vault.name}}</h2>
      </div>
    </div>
    
    <div class="keeps row">
      <div v-for="keep in keeps" class="col-4" :key="keep.id">
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
  mounted(){
    //fire off requst to get vault keeps
  },
  computed: {
    vault(){
      return this.$store.state.activeVault;
    },
    keeps(){
      return this.$store.state.vaultKeeps;
    }
  },
  methods: {}
};
</script>

<style>
</style>
