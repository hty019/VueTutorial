<template>
  <v-list-item @mouseenter.stop="showDelBtn(todo.id)"
               @mouseleave.stop="hideDelBtn"
  >
    <v-text-field v-if="edit===todo.id"
                  v-model="userInput"
                  @keyup.enter="editToDo(todo)"
                  @keyup.esc="editCancel"
                  autofocus
    /> <!-- 수정 입력 행 -->
    <template v-else>
      <v-col cols="1"> <!--체크박스-->
        <v-checkbox v-model="todo.state" @change="chkToDo(todo)"></v-checkbox>
      </v-col>
      <v-col
          cols="10"
          class="text-left"
          :class="{'done':todo.state}"
      > <!--내용-->
        <span @dblclick="editShow(todo)">
          {{todo.content}}
        </span>
      </v-col>
      <v-col cols="1"><!--삭제버튼-->
        <v-btn v-show="delBtn===todo.id"
               @click="delTodo(todo.id)"
        >삭제</v-btn>
      </v-col>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: "PrintToDo",
  data:()=>{
    return {
      edit:0,
      delBtn:0,
      userInput:''
    }
  },
  props:[
    'todo'
  ],
  methods: {
    editCancel() {
      this.edit=0
      this.userInput=''
    },
    /**
     * 완료 체크
     */
    chkToDo(todo) {
      this.$emit('chk-todo',todo)
    },
    /**
     * 삭제 버튼 보이기
     */
    showDelBtn(id) {
      this.delBtn=id
    },
    /**
     * 삭제 버튼 숨기기
     */
    hideDelBtn() {
      this.delBtn=''
    },
    /**
     * 할 일 편집
     */
    editToDo(todo) {
      if(this.userInput===''){ //수정 후 공백이라면 해당 항목을 삭제
        this.delTodo(todo.id)
      }else {
        todo.content=this.userInput
        this.$emit('edit-to-do',todo)
        this.edit=0
        this.userInput=''
      }
    },
    /**
     * 항목 삭제
     */
    delTodo(id){
      this.$emit('del-to-do',id)
    },
    /**
     * 수정 폼 출력
     */
    editShow(todo){
      if(!todo.state){
        this.userInput=todo.content
        this.edit=todo.id
      }
    },
    /**
     * 완료 목록 삭제
     */
    delDone() {
      this.$emit('del-done')
    }
  }
}
</script>

<style scoped>
.done {
  background-color: rgba(0,0,0,0.1);
}
.done span {
  text-decoration: line-through;
  color:rgba(0,0,0,0.5);
}
</style>