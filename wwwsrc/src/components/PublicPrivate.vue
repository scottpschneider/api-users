<template>
  <div class="card text-center">
    <div class="container">
      <img class="card-img-top" :src="keep.img">
      <div class="buttons">
        <button v-if="viewable" class="btn btn-success" @click="selectKeep(keep)">view</button>
        <button type="button" v-if="user.id" class="btn btn-primary" @click="activeKeep(keep)">keep</button>
        <button v-if="user.id == keep.authorId && !keep.public" class="btn btn-warning" @click="makePublic(keep)">public</button>
        <button v-if="user.id == keep.authorId && keep.public" class="btn btn-warning" @click="makePublic(keep)">private</button> 
        <button v-if="activeVault.id && deletable" class="btn btn-danger" @click="deleteShare(keep)">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PublicPrivate',
    props: {
      keep: {
        type: Object,
        required: true 
      },
      viewable: {
        type: Boolean, 
        required: true
      },
      tags: {
        type: Array
      },
      deletetable: {
        type: Boolean, 
        default: true
      },
      data(){
        return {
          vault: {}
        }
      }
    },
    computed: {     
      user() {
        return this.$store.state.userModule.user
      },
      vaults() {
        return this.$store.state.vaultModule.vaults
      },
      activeVault() {
        return this.$store.state.vaultModule.activeVault
      },
      currentKeep() {
        return this.$store.state.keepsModule.activeKeep
      }
    },
    methods: {
      deleteShare(keep) {
        if (!this.viewable) {
          this.$router.push({ name: "Dashboard" })
        }
        this.checkLogin()
        keep.vaultId = this.activeVault.id
        this.$store.dispatch("deleteShare", keep)
      },
      makePublic(keep) {
        this.checkLogin()
        keep.public = !keep.public
        this.$store.dispatch("editKeep", keep)
      },
      selectKeep(keep) {
        this.$store.dispatch("selectKeep", keep)
      },
      addShare(keep) {
        this.checkLogin()
        this.currentKeep.keeps++
        var share = {
          vaultId: this.vault.id,
          keepId: this.currentKeep.id
        }
        this.$store.dispatch("addShare", share)
      },
      checkLogin() {
        if (!this.user.id) {
          this.$router.push({ name: "Login" })
        }
      },
      activeKeep(keep) {
        this.$store.dispatch("activeKeep", keep)
      }
    }
  }

</script>

<style>


</style>
 