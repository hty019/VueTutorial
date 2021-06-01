<template>
  <div>
    <v-col class="d-flex justify-center" cols="8">
      <slot></slot>
      <v-text-field v-model="userInput" @keyup.enter="addToDo"/>
    </v-col>
  </div>
</template>

<script>
  export default {
    name: 'InputToDo',
    data:()=> {
      return {
        userInput: "",
      }
    },
    methods: {
      addToDo() {
          this.$emit('add-to-do',this.userInput)
          this.$nextTick()
          this.userInput=''
        }
    }
  }
</script>
