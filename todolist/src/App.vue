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
            <input-to-do @add-to-do="addToDo">
              <v-btn @click="allChk" class="align-self-center">
                all
              </v-btn>
            </input-to-do>
        </v-col>
      </v-row>
      <v-row class="text-center"> <!-- 리스트 구간 -->
        <v-col class="d-flex justify-center">
          <print-to-do
              :to-do-list="todolist"
          />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import InputToDo from '@/components/InputToDo';
import PrintToDo from "@/components/PrintToDo";

export default {
  name: 'App',
  components : {
    PrintToDo,
    InputToDo,
  },
  data: () => ({
    todolist:[],
    STORAGE_KEY:'todos-demo',
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
    addToDo(userInput) {
      if (userInput.length > 0) {
        const id = (this.todolist.length > 0 ? this.todolist[this.todolist.length - 1].id + 1 : 1)
        this.todolist = [
          ...this.todolist,
          {
            id: id,
            content: userInput,
            state: false
          }
        ]
      }
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
      const state=this.todolist.every((v)=>v.state)
        this.todolist=this.todolist.map((v)=>{
          return {
            id:v.id,
            content:v.content,
            state:state
          }
        });
    },
  },
  watch:{
    todolist:{
      handler(){
        this.saveList()
      }
    }
  }
};
</script>
