<template>
  <v-col class="d-flex justify-center" cols="8">
    <v-text-field v-model.trim="userInput" @keyup.enter="validation" clearable/>
  </v-col>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";

@Component
export default class InputToDo extends Vue{
  //data
  userInput="";

  validation():void {
    if(!this.userInput) {
      alert('잘못된 입력입니다.')
    }else{
      this.addToDo()
      this.$nextTick(() => this.userInput='');
    }
  }

  @Emit('add-to-do')
  addToDo():string {
      return this.userInput
  }
}
</script>
