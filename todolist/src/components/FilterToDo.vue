<template>
  <v-col cols="8" class="d-flex justify-center">
    <div v-show="!hideBtn">
      <v-btn v-for="(item, index) in btnName"
             :class="{'blue':type===index}"
             @click="type=index"
             v-text="item"
             :key="index"/>
      <v-btn @click="delDone">완료 삭제</v-btn>
    </div>
  </v-col>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue} from 'vue-property-decorator'

@Component
export default class FilterToDo extends Vue{

  @PropSync({required:true})
  type!:number
  @Prop({required:true})
  hideBtn!:boolean

  btnName=['전체','할 일','완료']

  delDone() {
    this.$emit('del-done')
  }
}
</script>

<style scoped>

</style>