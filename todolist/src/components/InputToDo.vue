<template>
  <v-col class="d-flex justify-center" cols="8">
    <v-btn @click="allChk" class="align-self-center">
      <v-icon>fas fa-chevron-down</v-icon>
    </v-btn>
    <v-text-field @keyup.enter="addToDo"/>
  </v-col>
</template>

<script>
  export default {
    name: 'InputToDo',
    methods: {
      allChk() {
        this.$emit('allChk');
      },
      addToDo(e) {
        this.$emit('addToDo',e.target.value);
        e.target.value=''
      }
    }
  }
</script>
