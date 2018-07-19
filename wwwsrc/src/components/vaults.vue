<template>
  <div class="container-fluid">
    <div class="vaults row">
      <div class="col-4" v-for="vault in vaults" :key="vault.id">
        <div class="text-center">
          <router-link :to="{name: 'Vault', params: {vaultId: vault.id}}">
            <p>{{vault.name}}</p>
          </router-link>
          <div>
            <button class="btn btn-danger" @click="deleteVault(vault)">Delete Vault</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Vaults",
  mounted() {},
  //does this need a mounted to getvaultkeeps? or am i confused with vaults
  data() {
    return {};
  },
  computed: {
    vaults() {
      return this.$store.state.vaults;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    // selectVault(vault) {
    //   this.$store.dispatch("selectVault", vault);
    // },
    deleteVault(vault) {
      this.$store.dispatch("deleteVault", vault);
    }
  }
};
</script>

<style>
</style>
