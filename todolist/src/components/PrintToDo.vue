<template>
  <v-list-item>
    <v-col cols="10" class="text-left">
      <!--내용-->
      <v-text-field
          @dblclick="toggleWritable"
          :readonly="!writable"
          @keyup.enter="editTodo"
          @keyup.esc="cancel"
          v-model.trim="todoItem.content"
          :class="{ 'text-decoration-line-through': todoItem.status }"
          prepend-icon="V"
          @click:prepend="chkTodo"
          append-outer-icon="X"
          @click:append-outer="delTodo"
      />
    </v-col>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Emit, PropSync, Vue } from "vue-property-decorator";
import { TwodoItem } from "@/definitions/entities";
import { patchApi } from "@/utils/apis";

@Component
export default class PrintToDo extends Vue {
  @PropSync("todo")
  todoItem!: TwodoItem;
  writable = false;
  origin!: string;
  userId!: number;
  mounted(): void {
    this.origin = this.todoItem.content;
    this.userId = this.todoItem.memberId;
  }
  /**
   * 완료 항목이 아닐 때에만 수정하기
   */
  toggleWritable(): void {
    if (this.todoItem.status) {
      alert("완료 상태에선 수정할 수 없습니다.");
    } else {
      this.writable = true;
    }
  }
  /**
   * 이벤트 취소
   */
  cancel(): void {
    this.todoItem.content = this.origin;
    this.writable = false;
  }
  /**
   * 완료 체크
   */
  async chkTodo(): Promise<void> {
    this.cancel();
    const payload = { ...this.todoItem, status: !this.todoItem.status };
    const response = await patchApi<TwodoItem>(`twodo/${this.userId}`, payload);
    if (response?.code?.startsWith("S")) {
      this.todoItem = response?.data || payload;
    }
  }
  /**
   * 할 일 편집
   */
  async editTodo(): Promise<void> {
    if (this.todoItem.content) {
      const response = await patchApi<TwodoItem>(`twodo/${this.userId}`, this.todoItem);
      if (response?.code?.startsWith("S")) {
        this.origin = this.todoItem.content;
        this.writable = false;
        this.todoItem = { ...this.todoItem };
      } else {
        alert("오류가 발생했습니다.");
      }
    } else {
      alert("잘못된 입력입니다.");
    }
  }
  /**
   * 항목 삭제
   */
  @Emit("del-to-do")
  delTodo(): TwodoItem {
    return this.todoItem;
  }
}
</script>

<style scoped></style>
