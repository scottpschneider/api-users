<template>
  <div class="container-fluid">
    <div class="keeps row">
        <div v-for="keep in keeps" class="col-4" :key="keep.id">
            {{keep.name}}
            Views: {{keep.viewCount}}
            Keeps: {{keep.keepCount}}
        <button @click="addKeepToVault(keep)">Add to vault</button>
        <button @click="viewKeep(keep)">View Keep</button>
            <!-- button with @click that will run method addKeeptoVault(keep) -->
        <select v-model="selectedVault">
        <!-- use a vif and say if not logged in, dont show the "addtovault" text. div v-if currentuser.id -->
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
      }
    };
  },
  computed: {
    keeps() {
      return this.$store.state.keeps;
    },
    vaults() {
      return this.$store.state.vaults;
    }, 
    activeVault(){
      return this.$store.state.activeVault;
    }
  },
  methods: {
    createVaultKeep(newVaultKeep){
        newVaultKeep.userId = this.user.id,
        newVaultKeep.vaultId = this.activeVault.id, 
        newVaultKeep.keepId = this.keep.Id
      this.$store.dispatch(newVaultKeep);
    },
    addKeepToVault(keep){
      keep.keepCount++
      this.$store.dispatch("editKeep", keep)
      this.$store.dispatch("createVaultKeep", {keepId: keep.id, vaultId: this.selectedVault.id})
    },
    viewKeep(keep){
      keep.viewCount++
      this.$store.dispatch("editKeep", keep)
    },
    //added this method, keep.viewCount++, then dispatched to editKeep(keep)
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
