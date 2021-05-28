<template>
  <v-col cols="8" class="d-flex justify-center">
    <div v-show="todolist.length>0">
      <v-btn :class="{'type':type===0}" @click="showAllTodo">전체</v-btn>
      <v-btn :class="{'type':type===1}" @click="showTodo">할 일</v-btn>
      <v-btn :class="{'type':type===2}" @click="showDone">완료</v-btn>
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
    showAllTodo() {
      this.$emit('showAllTodo')
    },
    showTodo() {
      this.$emit('showTodo')
    },
    showDone() {
      this.$emit('showDone')
    },
    delDone() {
      this.$emit('delDone')
    }
  }
}
</script>

<style scoped>
.type {
  color: dodgerblue;
}
</style>