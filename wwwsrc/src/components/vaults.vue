<template>
  <div class="container-fluid">
    <div class="vaults row">
      <div class="col-4" v-for="vault in vaults" :key="vault.id">
        <div class="text-center">
          <a @click="selectVault(vault)">
            <p>{{vault.name}}</p>
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
  name: "Vaults",
  mounted() {},
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
    selectVault(vault) {
      this.$store.dispatch("selectVault", vault);
    },
    deleteVault(vault) {
      this.$store.dispatch("deleteVault", vault);
    }
  }
};
</script>

<style>
</style>
