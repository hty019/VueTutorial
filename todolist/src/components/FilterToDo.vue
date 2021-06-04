<template>
  <v-col cols="8" class="d-flex justify-center">
    <div v-show="!hideBtn">
      <v-btn v-for="(item, index) in btnName"
             :class="{'blue':typeNumber===index}"
             @click="typeNumber=index"
             v-text="item"
             :key="index"/>
      <v-btn @click="delDone">완료 삭제</v-btn>
    </div>
  </v-col>
</template>

<script lang="ts">
import {Component, Emit, Prop, PropSync, Vue} from 'vue-property-decorator'

@Component
export default class FilterToDo extends Vue{

  @PropSync('type')
  typeNumber!:number
  @Prop({required:true})
  hideBtn!:boolean

  btnName=['전체','할 일','완료']

  @Emit('del-done')
  delDone():void {return;}
}
</script>

<style scoped>

</style>