<template>
  <div class="">

  </div>
</template>

<script>
  export default {
    name: 'SearchResults',
    data() {
      return {
        keep: {
          name: '',
          description: '',
          userId: '',
        },
        query: ''
      }
    },
    computed: {
      keeps(){
        return this.$store.state.keeps
      },
      activeKeep(){
        return this.$store.state.keep
      }
    },
    methods: {
      addToFavorites(keep) {
        console.log(keep)
        this.$store.dispatch('getKeepDetails', keep.userId)
        this.$store.dispatch('addToFavorites', this.activeKeep)
      },
      getSearchResults() {
        this.$store.dispatch('getSearchResults', this.query)
      },
    }
  }

</script>

<style>


</style>
