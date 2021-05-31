<template>
  <v-col class="d-flex justify-center" cols="8">
    <slot></slot>
    <v-text-field v-model.trim="userInput" @keyup.enter="addToDo"/>
  </v-col>
</template>

<script>
  export default {
    name: 'InputToDo',
    data:()=> {
      return {
        userInput: "", //trim v-model
      }
    },
    methods: {
      addToDo() {
        if(this.userInput.length>0){
          this.$emit('add-to-do',this.userInput)
          this.$nextTick(

              ()=>{여기에}
          )
          this.userInput=''
        }
      }
    }
  }
</script>
