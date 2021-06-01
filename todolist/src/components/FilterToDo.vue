<template>
  <v-col cols="8" class="d-flex justify-center">
    <div v-show="!hideBtn">
      <v-btn v-for="(item, index) in btnName"
             :class="{'blue':type===index}"
             @click="$emit('update:type',index)"
             v-text="item"
             :key="index"/>
      <v-btn @click="delDone">완료 삭제</v-btn>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "FilterToDo",
  props: [
      'type','hideBtn'
  ],
  data:() => ({
   btnName:['전체','할 일','완료']
  }),
  methods: {
    delDone() {
      this.$emit('del-done')
    }
  }
}
</script>

<style scoped>

</style>