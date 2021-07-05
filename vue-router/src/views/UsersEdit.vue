<template>
  <div>
    <p>usersEdit</p>
    <p>{{userId}}</p>
  </div>
</template>

<script>
export default {
  computed: {
    userId() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>
