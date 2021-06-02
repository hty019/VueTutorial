<template>
  <v-col class="d-flex justify-center" cols="8">
    <v-text-field v-model.trim="userInput" @keyup.enter="addToDo" clearable/>
  </v-col>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";

@Component
export default class InputToDo extends Vue{
    name: 'InputToDo',
    data:()=> {
      return {
        userInput: "", //trim v-model
      }
    },
    methods: {
      addToDo() {
        if(!this.userInput){
          alert('잘못된 입력입니다.')
        }else {
          this.$emit('add-to-do',this.userInput)
          this.$nextTick(()=>{this.userInput=''})
        }
      }
    }
  }
</script>
