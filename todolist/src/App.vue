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
              <template v-for="(item,index) in filteredList">
                <print-to-do :todo.sync="filteredList[index]"
                             :key="filteredList[index].id"
                             @del-to-do="delTodo"
                             @del-done="delDone"
                />
              </template>
            </ul>
            <v-row> <!-- 필터 버튼 -->
              <v-col class="d-flex justify-center">
                <filter-to-do :type.sync="type"
                              :hide-btn="hideBtn"
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

<script lang="ts">
import {Component,Watch,Vue} from "vue-property-decorator";
import {Todo} from '@/types/options';

import InputToDo from "@/components/InputToDo.vue";
import PrintToDo from "@/components/PrintToDo.vue";
import FilterToDo from "@/components/FilterToDo.vue";

@Component({
  components:{
    PrintToDo,
    InputToDo,
    FilterToDo
  }
})
export default class App_temp extends Vue {
  //data
  todoList: Todo[] = [];
  type = 0;
  STORAGE_KEY = 'todos-demo';

  /**
   * 페이지 진입 시 로컬 스토리지 로드
   */
  created(): void {
    const localList = localStorage.getItem(this.STORAGE_KEY);
    if (localList !== null) {
      this.todoList = JSON.parse(localList)
    }
  }

  @Watch("todoList")
  handler():void {
    this.saveList()
  }

  //computed
  get filteredList():Todo[] {
    switch (this.type) {
      case 0:
        return this.todoList
      case 1:
        return this.todoList.filter((v) => !v.state)
      case 2:
        return this.todoList.filter((v) => v.state)
      default:
        return [] // 빈배열 반환
    }
  }

  get todoIsNull():boolean {
    return !(!this.todoList === false && this.todoList.length > 0)
  }

  get newId():number {
    if (this.todoIsNull) {
      return 1
    } else {
      return this.todoList[this.todoList.length - 1].id + 1
    }
  }

  get hideBtn():boolean {
      return !this.todoList.some(v => v.state === true)
  }

  /**
   * 할 일 추가 (Immutable 방식으로 변경)
   */
  protected addToDo(userInput:string):void {
    this.todoList = [
      ...this.todoList,
      {
        id: this.newId,
        content: userInput,
        state: false
      }
    ]
    this.type = 0
  }

  /**
   * 항목 삭제
   */
  protected delTodo(todo:Todo):void {
    this.todoList = this.todoList.filter((v) => v.id !== todo.id)
  }

  /**
   * 리스트 로컬스토리지 저장
   */
  protected saveList():void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todoList))
  }

  /**
   * 전체 완료 체크 or 전체 완료 해제 (Immutable 적용)
   */
  protected allChk():void {
    const state = !this.todoList.every((v) => v.state)
    this.todoList = this.todoList.map((v) => {
      return {
        ...v,
        state: state
      }
    });
  }

  /**
   * 완료항목 삭제
   */
  protected delDone():void {
    this.todoList = this.todoList.filter((v) => !v.state)
  }
}
</script>
