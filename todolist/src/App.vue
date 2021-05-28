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
            <input-to-do
                @addToDo="addToDo"
                @allChk="allChk"
            />
        </v-col>
      </v-row>
      <v-row class="text-center"> <!-- 리스트 구간 -->
        <v-col class="d-flex justify-center">
          <print-to-do
              :filteredList="filteredList"
              :edit="edit"
              :delBtn="delBtn"
              @showDelBtn="showDelBtn"
              @hideDelBtn="hideDelBtn"
              @editToDo="editToDo"
              @saveList="saveList"
              @editShow="editShow"
              @delTodo="delTodo"
          />
        </v-col>
      </v-row>
      <v-row> <!-- 필터 버튼 -->
        <v-col class="d-flex justify-center">
          <filter-to-do
              :todolist="todolist"
              :type="type"
              @showAllTodo="showAllTodo"
              @showTodo="showTodo"
              @showDone="showDone"
              @delDone="delDone"
          />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import InputToDo from '@/components/InputToDo';
import PrintToDo from "@/components/PrintToDo";
import FilterToDo from "@/components/FilterToDo";

export default {
  name: 'App',
  components : {
    FilterToDo,
    PrintToDo,
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
    if(localList!==null){
      this.todolist=JSON.parse(localList)
    }else {
      localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.todolist));
    }
  },
  methods:{
    /**
     * 할 일 추가 (Immutable 방식으로 변경)
     */
    addToDo(userInput) {
      if(userInput.length>0){
        const id=(this.todolist.length>0?this.todolist[this.todolist.length-1].id+1:0)
        this.todolist = [
          ...this.todolist,
          {
            id:id,
            content:userInput,
            state:false
          }
        ];
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
      if(this.todolist.every((v)=>v.state)){
        this.todolist=this.todolist.map((v)=>{
          return {
            id:v.id,
            content:v.content,
            state:false
          }
        });
      }else{
        this.todolist=this.todolist.map((v)=>{
          return {
            id:v.id,
            content:v.content,
            state:true
          }
        })
      }
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
    editToDo(content) {
      if(content===''){ //수정 후 공백이라면 해당 항목을 삭제
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
