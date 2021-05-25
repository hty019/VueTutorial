<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          ToDos
        </h1>

        <input type="text" ref="todoInput" @keydown="addToDo"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ToDos',
    data: () => ({
      todolist:[],
      STORAGE_KEY:'todos-demo'
    }),
    created() {
      this.todolist=JSON.parse(localStorage.getItem(this.STORAGE_KEY))
    },
    methods:{
      addToDo({key}) {
        const toDos=this.todolist
        const comment=this.$refs.todoInput
        if(key==='Enter'&&comment.value.length>0){
          const id=(toDos.length>0?toDos[toDos.length-1].id+1:0)
          toDos.push({
            id:id,
            content:comment.value,
            state:0
          })
          comment.value=''
        }
      },
    },
    watch:{
      todolist:{
        handler(todos){
          localStorage.setItem(this.STORAGE_KEY,JSON.stringify(todos))
        }
      }
    }
  }
</script>
