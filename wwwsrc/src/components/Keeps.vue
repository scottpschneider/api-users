<template>
  <div class="container-fluid">
    <div class="keeps row">
      <div v-for="(keep, index) in keeps" class="col-4" :key="index">
        {{keep.name}} Views: {{keep.viewCount}} Keeps: {{keep.keepCount}}
        <!-- Image: {{<img :src="userViewKeep.imgURL" alt="">}}  -->
        <img :src="userViewKeep.imgURL" alt="">
          <button @click="addKeepToVault(keep)">Add to vault</button>

          <button @click="viewKeep(keep)">View Keep</button>

          <!-- button with @click that will run method addKeeptoVault(keep) -->
          <!-- use a vif and say if not logged in, dont show the "addtovault" text. div v-if currentuser.id -->
          <select v-model="selectedVault">
            <option v-for="vault in vaults" :value="vault" :key="vault.id">Add to {{vault.name}}</option>
          </select>

        </div>
      </div>
      <div class="modal" id="keepMyViewKeep" tabindex="-1" role="dialog">
        <div v-for= "(keep, index) in keeps" class="modal-dialog" :key="index" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{userViewKeep.name}}</h5>
              <img :src="userViewKeep.imgURL" alt="">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>{{userViewKeep}}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-for="(keep, index) in keeps" class="col-4" :key="index">
          {{keep.name}} 
            <button @click="deleteKeep">Delete {{keep.name}}</button>
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
        selectedVault: {},
        newVaultKeep: {},
        userViewKeep: {}
      };
    },
    computed: {
      keeps() {
        return this.$store.state.keeps;
      },
      vaults() {
        return this.$store.state.vaults;
      },
      activeVault() {
        return this.$store.state.activeVault;
      }
    },
    methods: {
      createVaultKeep(newVaultKeep) {
        (newVaultKeep.userId = this.user.id),
          (newVaultKeep.vaultId = this.activeVault.id),
          (newVaultKeep.keepId = this.keep.Id);
        this.$store.dispatch(newVaultKeep);
      },
      addKeepToVault(keep) {
        this.$store.dispatch("createVaultKeep", {
          keep: keep,
          keepId: keep.id,
          vaultId: this.selectedVault.id
        });
      },
      viewKeep(keep) {
        keep.viewCount++;
        this.$store.dispatch("editKeep", keep);
        this.userViewKeep = keep;
        console.log(this.userViewKeep);
        $("#keepMyViewKeep").modal("show");
      },
      //added this method, keep.viewCount++, then dispatched to editKeep(keep)
      // named addkeeptovaults(keep)
      //dispatch to store add keep to vault(keep.id, this.selectedvault.id)
      //check above before dispaticnig if selected vault exxcists, has an id.. if selectedvault.id, run this, if not, please selectevav
      createKeep() {
        this.$store.dispatch("createKeep", this.newKeep);
      }, 
      deleteKeep(keep){
        this.$store.dispatch("deleteKeep", {
          keep: keep,
          keepId: keep.id,
        });
      },
    }
  };
</script>

<style>
  .remove-tag {
    color: red;
    cursor: pointer;
  }
</style>