<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2>{{vault.title}}</h2>
      </div>
    </div>
    
    <div class="keeps row">
      <div v-for="keep in keeps" class="col-4" :key="keep.id">
        <public-private :keep="keep" :viewable="true"></public-private>
      </div>
    </div>
  </div>
</template>

<script>
import publicPrivate from './PublicPrivate'

export default {
  name: "Vault",
  components: {
    publicPrivate
  },
  data() {
    return {};
  },
  computed: {
    vault(){
      return this.$store.state.vaultModule.activeVault;
    },
    keeps(){
      return this.$store.state.keepsModule.userKeeps;
    }
  },
  methods: {}
};
</script>

<style>
</style>
