<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          ToDos
        </h1>
        <v-btn @click="allChk">allChk</v-btn>
        <v-text-field background-color="green" ref="todoInput" @keydown="addToDo"/>
        <ul>
          <li v-for="todo in filteredList" :key="todo.id" @dblclick="edit=todo.id" @mouseenter.stop="delBtn=todo.id" @mouseleave.stop="delBtn=''">
            <v-text-field autofocus v-if="edit===todo.id" background-color="green" v-model="todo.content" @keydown="editToDo" @focusout="editDone(todo.content)"/>
            <template v-else>
              <v-checkbox v-model="todo.state" @click="saveList"></v-checkbox>
                {{todo.content}}
              <v-btn v-show="delBtn===todo.id" @click="delTodo(todo.id)">삭제</v-btn>
            </template>
          </li>
        </ul>
      </v-col>
      <div v-show="todolist.length>0">
        <v-btn @click="type=0">전체</v-btn>
        <v-btn @click="type=1">할 일</v-btn>
        <v-btn @click="type=2">완료</v-btn>
        <v-btn v-show="!todolist.every((v)=>!v.state)" @click="delDone">완료 삭제</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ToDos',
    data: () => ({
      todolist:[],
      type:0,
      edit:'',
      STORAGE_KEY:'todos-demo',
      delBtn:''
    }),
    /**
     * 페이지 진입 시 로컬 스토리지 로드
     */
    created() {
      const localList=localStorage.getItem(this.STORAGE_KEY);
      if(localList!='null'){
        this.todolist=JSON.parse(localList)
      }
    },
    methods:{
      /**
       * 할 일 추가
       */
      addToDo({key}) {
        const toDos=this.todolist
        const comment=this.$refs.todoInput
        if(key==='Enter'&&comment.lazyValue.length>0){
          const id=(toDos.length>0?toDos[toDos.length-1].id+1:0)
          toDos.push({
            id:id,
            content:comment.lazyValue,
            state:false
          })
          comment.lazyValue=''
        }
      },
      /**
       * 항목 삭제
       */
      delTodo(id){
        this.todolist=this.todolist.filter((v)=>v.id!=id)
      },
      /**
       * 리스트 로컬스토리지 저장
       */
      saveList() {
        localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.todolist))
      },
      /**
       * 전체 완료 체크 or 전체 완료 해제
       */
      allChk() {
        if(this.todolist.every((v)=>v.state)){
          this.todolist.forEach((v)=>v.state=false)
        }else{
          this.todolist.forEach((v)=>v.state=true)
        }
      },
      /**
       * 엔터 입력 시 수정 완료
       */
      editToDo(evt) {
        if(evt.key==='Enter'){
          if(evt.target._value===''){ //수정 후 공백이라면 해당 항목을 삭제
            this.delTodo(this.edit)
          }
          this.edit=''
          this.saveList()
        }
      },
      /**
       * 포커스 아웃 시 수정 완료
       */
      editDone(content) {
        if(content===''){ //수정 후 공백이라면 해당 항목을 삭제
          this.delTodo(this.edit)
        }
        this.edit=''
        this.saveList()
      },
      /**
       * 완료항목 삭제
       */
      delDone() {
        this.todolist=this.todolist.filter((v)=>!v.state)
      },
    },
    watch:{
      todolist:{
        handler(){
          this.saveList()
        }
      }
    },
    computed:{
      filteredList() {
        switch(this.type) {
          case 0: return this.todolist
          case 1: return this.todolist.filter((v)=>v.state===false)
          case 2: return this.todolist.filter((v)=>v.state===true)
          default: return null
        }
      }
    }
  }
</script>
