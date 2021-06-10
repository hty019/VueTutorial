<template>
     <v-container style="max-width:1080px">
       <v-card>
         <v-row class="text-center">
            <v-col class="pa-5">
             <h1 class="display-2 font-weight-bold mb-3">
               <!--제목-->
               ToDos
             </h1>
            </v-col>
          </v-row>
          <v-row class="pa-5 align-center">
             <!-- 입력 행 -->
            <v-col class="d-flex justify-center">
              <v-btn class="align-self-center" @click="allChk">
                all
              </v-btn>
              <input-to-do @add-to-do="addToDo" />
            </v-col>
          </v-row>
          <v-row class="text-center">
            <!-- 리스트 구간 -->
            <v-col class="d-flex justify-center">
              <v-col cols="8">
                <ul>
                  <template v-for="(item, index) in filteredList">
                    <print-to-do
                        :todo.sync="filteredList[index]"
                        :key="filteredList[index].id"
                        @del-to-do="delTodo"
                        @del-done="delDone"
                    />
                  </template>
                </ul>
                <v-row>
                  <!-- 필터 버튼 -->
                  <v-col class="d-flex justify-center">
                    <filter-to-do
                        :type.sync="type"
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TwodoItem } from "@/definitions/entities";
import { deleteApi, getApi, postApi, putApi } from "@/utils/apis";

import InputToDo from "@/views/twodolist/InputToDo.vue";
import PrintToDo from "@/views/twodolist/PrintToDo.vue";
import FilterToDo from "@/views/twodolist/FilterToDo.vue";
import { defaultTwodo } from "@/definitions/defaults";

@Component({
  components: {
    PrintToDo,
    InputToDo,
    FilterToDo,
  },
})

export default class TwodoMain extends Vue {
  // data
  todoList: TwodoItem[] = [];
  type = 0;
  loading=false;
  saving=false;
  userId!: number;
  newItem: TwodoItem = defaultTwodo();
  /**
   * 페이지 진입 시 로컬 스토리지 로드
   */
  protected async created(): Promise<void> { // 객체를 넘긴다면, Id를 넘긴다면, TwodoId 넘길 때, memberId 넘길 때
    this.userId = this.$store.getters.user.id;
    const response = await getApi<TwodoItem[]>(`twodo/${this.userId}`);
    this.todoList = response?.data || [];
  }
  // computed
  get filteredList(): TwodoItem[] {
    switch (this.type) {
      case 0:
        return this.todoList;
        case 1:
          return this.todoList.filter(v => !v.status);
          case 2:
            return this.todoList.filter(v => v.status);
            default:
              return []; // 빈배열 반환
        }
  }
  get hideBtn(): boolean {
    return !this.todoList.some(v => v.status);
  }
  /**
   * 할 일 추가 (Immutable 방식으로 변경)
   */
  protected async addToDo(userInput: string): Promise<void> {
    this.loading = true;
    const payload = { ...this.newItem, memberId: this.userId, content: userInput };
    const response = await postApi<TwodoItem>("twodo/", payload);
    this.loading = false;
    if (typeof response.data === "undefined") {
      return;
    } else {
      this.todoList = [
          ...this.todoList,
        response.data,
      ];
    }
    this.type = 0;
  }
  /**
   * 전체 완료 체크 or 전체 완료 해제 (Immutable 적용)
   */
  protected async allChk(): Promise<void> {
    const status = !this.todoList.every(item => item.status);
    const payload = this.todoList.map(item => {
      return {
        ...item,
        status: status,
      };
    });
    const response = await putApi<TwodoItem[]>("twodo/", payload);
    if (response?.code?.startsWith("S")) {
      this.todoList = response?.data || [];
    }
  }
  /**
   * 항목 삭제
   */
  protected async delTodo(todo: TwodoItem): Promise<void> {
    this.saving = true;
    const response = await deleteApi<TwodoItem>(`twodo/${todo.id}`);
    this.saving = false;

    if (response?.code?.startsWith("S")) {
      this.todoList = this.todoList.filter(todo => {
        return todo.id !== (response.data?.id || 0);
      });
    }
  }
  /**
   * 완료항목 삭제
   */
  protected async delDone(): Promise<void> {
    const response = await deleteApi<TwodoItem[]>(`twodo/all/${this.userId}`);
    if (response?.code?.startsWith("S")) {
      this.todoList = this.todoList.filter(v => !v.status);
    }
  }
}
</script>
