<template>
  <div>
    <p>users Detail</p>
    <p>{{id}}</p>
    <v-btn @click="edit">수정</v-btn>
  </div>
</template>

<script>
export default {
  name: "UsersDetail",
  methods: {
    edit() {
      this.$router.push({name:"users-edit"})
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>
