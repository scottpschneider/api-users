<template>
  <div class="container-fluid">
    <div class="keeps row">
        <div v-for="keep in keeps" class="col-4" :key="keep.id">
            {{keep.name}}
        <button @click="addKeeptoVault(keep)">Add to vault</button>
            <!-- button with @click that will run method addKeeptoVault(keep) -->
        <select v-model="selectedVault">
        <option v-for="vault in vaults" :value="vault" :key="vault.id">Add to {{vault.name}}</option>
        </select>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Keeps",
  mounted() {
    this.$store.dispatch("getKeeps");
  },
  data() {
    return {
      selectedVault:{},
      newVaultKeep:{
        userId: this.user.id,
        vaultId: selectedVault.id, 
        keepId: this.keep.Id
      }
    };
  },
  computed: {
    keeps() {
      return this.$store.state.keeps;
    },
    vaults() {
      return this.$store.state.vaults;
    }
  },
  methods: {
    createVaultKeep(newVaultKeep){
      this.$store.dispatch(newVaultKeep);
    },
    // named addkeeptovaults(keep)
    //dispatch to store add keep to vault(keep.id, this.selectedvault.id)
    //check above before dispaticnig if selected vault exxcists, has an id.. if selectedvault.id, run this, if not, please selectevav
    createKeep() {
      this.$store.dispatch("createKeep", this.newKeep);
    }
  }
};
</script>

<style>
.remove-tag {
  color: red;
  cursor: pointer;
}
</style>
