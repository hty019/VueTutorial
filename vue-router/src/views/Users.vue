<template>
  <div>
    <h1>Users</h1>
    <v-flex xs12>
      <v-text-field
          v-model="userId"
          label="유저 번호를 입력하세요."
      ></v-text-field>
      <v-btn
          @click="$router.push({
          name:'users-detail',
          params:{
            id:userId
          }})"
      >디테일
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <router-view></router-view>
    </v-flex>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: null
    }
  }
}
</script>

<style scoped>

</style>
