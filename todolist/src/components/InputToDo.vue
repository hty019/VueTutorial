<template>
  <v-col class="d-flex justify-center" cols="8">
    <v-btn @click="allChk" class="align-self-center">
      <v-icon>fas fa-chevron-down</v-icon>
    </v-btn>
    <v-text-field v-model="userInput" @keyup.enter="addToDo"/>
  </v-col>
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
      allChk() {
        this.$emit('allChk');
      },
      addToDo() {
        this.$emit('addToDo',this.userInput);
        this.userInput='';
      }
    }
  }
</script>
