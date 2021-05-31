<template>
  <v-col cols="8" class="d-flex justify-center">
    <div v-show="todolist.length>0">
      <v-btn :class="{'type':type===0}" @click="$emit('change-filter',0)">전체</v-btn>
      <v-btn :class="{'type':type===1}" @click="$emit('change-filter',1)">할 일</v-btn>
      <v-btn :class="{'type':type===2}" @click="$emit('change-filter',2)">완료</v-btn>
      <v-btn v-show="!todolist.every((v)=>!v.state)" @click="delDone">완료 삭제</v-btn>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "FilterToDo",
  props: [
      'todolist','type'
  ],
  methods: {
    delDone() {
      this.$emit('del-done')
    }
  }
}
</script>

<style scoped>
.type {
  color: dodgerblue;
}
</style>