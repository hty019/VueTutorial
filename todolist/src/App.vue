<template>
  <v-app>
    <v-main>
    <v-container style="max-width:1080px">
      <v-card>
      <v-row class="text-center">
        <v-col class="pa-5">
          <h1 class="display-2 font-weight-bold mb-3"> <!--제목-->
            ToDos
          </h1>
        </v-col>
      </v-row>
      <v-row class="pa-5 align-center"> <!-- 입력 행 -->
        <v-col class="d-flex justify-center">
          <v-btn class="align-self-center" @click="allChk">
            all
          </v-btn>
            <input-to-do @add-to-do="addToDo"/>
        </v-col>
      </v-row>
      <v-row class="text-center"> <!-- 리스트 구간 -->
        <v-col class="d-flex justify-center">
          <v-col cols="8">
            <ul>
              <template v-for="todo in filteredList">
                <print-to-do :todo="todo"
                             :key="todo.id"
                             @edit-to-do="editToDo"
                             @del-to-do="delTodo"
                             @del-done="delDone"
                             @chk-todo="chkToDo"
                />
              </template>
            </ul>
            <v-row> <!-- 필터 버튼 -->
              <v-col class="d-flex justify-center">
                <filter-to-do :type.sync="type"
                              :hide-del-btn="hideBtn"
                              @del-done="delDone"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>
      </v-card>
    </v-container>
    </v-main>
  </v-app>
</template>

<script>
import InputToDo from '@/components/InputToDo';
import PrintToDo from "@/components/PrintToDo";
import FilterToDo from "./components/FilterToDo";

export default {
  name: 'App',
  components : {
    PrintToDo,
    InputToDo,
    FilterToDo
  },
  data: () => ({
    todolist:[],
    type:0,
    STORAGE_KEY:'todos-demo',
    id:1,
  }),
  /**
   * 페이지 진입 시 로컬 스토리지 로드
   */
  created() {
    const localList=localStorage.getItem(this.STORAGE_KEY);
    if(localList!==null){
      this.todolist=JSON.parse(localList)
    }
  },
  methods:{
    /**
     * 완료 체크하기
     */
    chkToDo(todo) {
      const idx = this.todolist.findIndex((v)=>v.id===todo.id)
      this.todolist.splice(idx,1,todo)
    },
    /**
     * 할 일 추가 (Immutable 방식으로 변경)
     */
    addToDo(userInput) {
      this.todolist = [
        ...this.todolist,
        {
          id:this.newId,
          content:userInput,
          state:false
        }
      ]
      this.type=0
    },
    /**
     * 항목 삭제
     */
    delTodo(todo){
      this.todolist=this.todolist.filter((v)=>v.id!==todo.id)
    },
    /**
     * 리스트 로컬스토리지 저장
     */
    saveList() {
      localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.todolist))
    },
    /**
     * 전체 완료 체크 or 전체 완료 해제 (Immutable 적용)
     */
    allChk() {
      const state=!this.todolist.every((v)=>v.state)
        this.todolist=this.todolist.map((v)=>{
          return {
            ...v,
            state:state
          }
        });
    },
    /**
     * 엔터 입력 & 포커스 아웃 시 수정 완료
     */
    editToDo(todo) {
      const idx = this.todolist.findIndex((v)=>v.id===todo.id)
      this.todolist.splice(idx,1,todo)
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
        case 1: return this.todolist.filter((v)=>!v.state)
        case 2: return this.todolist.filter((v)=>v.state)
        default: return [] // 빈배열 반환
      }
    },
    todoIsNull() {
      return !(!this.todolist===false&&this.todolist.length>0)
    },
    newId() {
      if(this.todoIsNull){
        return 1
      }else {
        return this.todolist[this.todolist.length-1].id+1
      }
    },
    hideBtn() {
      if(this.todoIsNull) {
        return true
      }else {
        return !this.todolist.some(v=>v.state===true)
      }
    }
  }
};
</script>
