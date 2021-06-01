<template>
    <v-col cols="8">
      <ul>
        <v-list-item v-for="todo in filteredList"
                     :key="todo.id"
                     @mouseenter.stop="showDelBtn(todo.id)"
                     @mouseleave.stop="hideDelBtn">

          <v-text-field v-if="edit===todo.id"
                        v-model="todo.content"
                        @keyup.enter="editToDo(todo.content)"
                        @focusout="editToDo(todo.content)"
                        autofocus/> <!-- 수정 입력 행 -->
          <template v-else>
            <v-col cols="1"> <!--체크박스-->
              <v-checkbox v-model="todo.state"
                          @change="saveList"></v-checkbox>
            </v-col>
            <v-col
                cols="10"
                class="text-left"
                :class="{'done':todo.state}"
            > <!--내용-->
              <span
                  @dblclick="editShow(todo)"
              >
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
      </ul>
    </v-col>
</template>

<script>
export default {
  name: "PrintToDo",
  props:['todolist'],
  data:()=>{
    return {
      type:0,
      edit:0,
      delBtn:0
    }
  },
  methods: {
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
      this.delBtn=0
    },
    /**
     * 수정 폼 출력
     */
    editShow(id){
      this.edit=id
    },
    /**
     * 엔터 입력 시 수정 완료
     */
    editToDo(content) {
      if(content===''){ //수정 후 공백이라면 해당 항목을 삭제
        this.delTodo(this.edit)
      }
      this.edit=0
      // this.saveList()
    },
    /**
     * 포커스 아웃 시 수정 완료
     */
    editDone(content) {
      if(content===''){ //수정 후 공백이라면 해당 항목을 삭제
        this.delTodo(this.edit)
      }
      this.edit=0
      // this.saveList()
    },
    /**
     * 항목 삭제
     */
    delTodo(id){
      this.todolist=this.todolist.filter((v)=>v.id!==id)
    },
  },
  computed:{
    filteredList() {
      console.log('진입')
      switch(this.type) {
        case 0: return this.todolist
        case 1: return this.todolist.filter((v)=>!v.state)
        case 2: return this.todolist.filter((v)=>v.state)
        default: return null
      }
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