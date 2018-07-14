<template>
<div>
  <div class="row">
      <div class="offset-4 col-4">
        <public-private :keep="keep" :tags="tags" :viewable="false"></public-private>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2>Related Keeps</h2>
      </div>
      <div class="col-3" v-for="k in keeps" :key="k.id">
        <public-private v-if="k.id != keep.id" :keep="k" :viewable="true"></public-private>
      </div>
    </div>
    </div>
</template>

<script>
import publicPrivate from "./PublicPrivate";

export default {
  name: 'Keep',
  components: {
    publicPrivate
  },
  mounted() {
    this.$store.dispatch("getTags", this.keep.id);
  },
  data() {
    return {};
  },
  computed: {
    keep() {
      return this.$store.state.keepsModule.keep;
    },
    tags() {
      return this.$store.state.keepsModule.tags;
    },
    keeps() {
      return this.$store.state.keepsModule.keeps;
    }
  },
  methods: {}
};
</script>

<style>
</style>
