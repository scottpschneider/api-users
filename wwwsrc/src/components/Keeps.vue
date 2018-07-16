<template>
  <div class="container-fluid">
    <div class="keeps row">
        <div v-for="keep in keeps" class="col-4" :key="keep.id">
            {{keep.name}}
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
    return {};
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
