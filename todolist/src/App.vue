<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-row class="text-center">
        <v-col class="pa-5">
          <h1 class="display-2 font-weight-bold mb-3"> <!--제목-->
            ToDos
          </h1>
        </v-col>
      </v-row>
      <v-row class="pa-5 align-center"> <!-- 입력 행 -->
        <v-col class="d-flex justify-center">
            <input-to-do @addToDo="addToDo" @allChk="allChk"/>
        </v-col>
      </v-row>
      <v-row class="text-center"> <!-- 리스트 구간 -->
        <v-col class="d-flex justify-center">
          <v-col cols="8">
            <ul>
              <v-list-item v-for="todo in filteredList"
                           :key="todo.id"
                           @mouseenter.stop="showDelBtn(todo.id)"
                           @mouseleave.stop="hideDelBtn()"
              >
                <v-text-field v-if="edit===todo.id"
                              v-model="todo.content"
                              @keyup.enter="editToDo"
                              @focusout="editDone(todo.content)"
                              autofocus/> <!-- 수정 입력 행 -->
                <template v-else>
                  <v-col cols="1"> <!--체크박스-->
                    <v-checkbox v-model="todo.state"
                                @click="saveList"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="10" class="text-left"> <!--내용-->
                    <span @dblclick="editShow(todo.id)">{{todo.content}}</span>
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
        </v-col>
      </v-row>
      <v-row> <!-- 필터 버튼 -->
        <v-col class="d-flex justify-center">
          <v-col cols="8" class="d-flex justify-center">
            <div v-show="todolist.length>0">
              <v-btn @click="showAllTodo">전체</v-btn>
              <v-btn @click="showTodo">할 일</v-btn>
              <v-btn @click="showDone">완료</v-btn>
              <v-btn v-show="!todolist.every((v)=>!v.state)" @click="delDone">완료 삭제</v-btn>
            </div>
          </v-col>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import InputToDo from '@/components/InputToDo';

export default {
  name: 'App',
  components : {
    InputToDo,
  },
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
    if(localList!=='null'){
      this.todolist=JSON.parse(localList)
    }
  },
  methods:{
    /**
     * 할 일 추가 (Immutable 방식으로 변경)
     */
    addToDo(userInput) {
      const toDos=Object.assign([],this.todolist)
      if(userInput.length>0){
        const id=(toDos.length>0?toDos[toDos.length-1].id+1:0)
        toDos.push({
          id:id,
          content:userInput,
          state:false
        });
        this.todolist=toDos
      }
    },
    /**
     * 항목 삭제
     */
    delTodo(id){
      this.todolist=this.todolist.filter((v)=>v.id!==id)
    },
    /**
     * 리스트 로컬스토리지 저장
     */
    saveList() {
      localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.todolist))
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
     * 전체 완료 체크 or 전체 완료 해제 (Immutable 적용)
     */
    allChk() {
      const toDos=Object.assign([],this.todolist)
      if(toDos.every((v)=>v.state)){
        toDos.forEach((v)=>v.state=false)
      }else{
        toDos.forEach((v)=>v.state=true)
      }
      this.todolist=toDos
    },
    /**
     * 전체 목록 출력
     */
    showAllTodo(){
      this.type=0
    },
    /**
     * 할 일 목록 출력
     */
    showTodo(){
      this.type=1
    },
    /**
     * 완료 목록 출력
     */
    showDone(){
      this.type=2
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
    editToDo(evt) {
      if(evt.target._value===''){ //수정 후 공백이라면 해당 항목을 삭제
        this.delTodo(this.edit)
      }
      this.edit=''
      this.saveList()
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
        case 1: return this.todolist.filter((v)=>!v.state)
        case 2: return this.todolist.filter((v)=>v.state)
        default: return null
      }
    }
  }
};
</script>
