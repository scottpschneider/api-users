<template>
<div>
  <div class="row">
      <div class="offset-4 col-4">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2>Related Keeps</h2>
      </div>
      <div class="col-3" v-for="k in keeps" :key="k.id">
      </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'Keep',
  components: {
  },
  mounted() {},
  data() {
    return {};
  },
  computed: {
    keep() {
      return this.$store.state.keeps;
    },
    keeps() {
      return this.$store.state.keeps;
    }
  },
  methods: {}
};
</script>

<style>
</style>
