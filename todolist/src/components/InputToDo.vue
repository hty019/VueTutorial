<template>
  <v-col class="d-flex justify-center" cols="8">
    <v-text-field v-model.trim="userInput" @keyup.enter="addToDo" clearable/>
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
        if(!this.userInput){
          this.$emit('add-to-do',this.userInput)
          this.$nextTick(()=>{this.userInput=''})
        }
      }
    }
  }
</script>
