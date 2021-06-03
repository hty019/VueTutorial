<template>
  <v-list-item>
      <v-col cols="10" class="text-left"> <!--내용-->
        <v-text-field @dblclick="toggleWritable"
                      :readonly="!writable"
                      @keyup.enter="editTodo"
                      @keyup.esc="cancel"
                      v-model.trim="todo.content"
                      :class="{'text-decoration-line-through':todo.state}"
                      prepend-icon="V"
                      @click:prepend="chkTodo"
                      append-outer-icon="X"
                      @click:append-outer="delTodo"/>
      </v-col>
  </v-list-item>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue} from "vue-property-decorator";
import {Todo} from '@/types/options';


@Component
export default class PrintToDo extends Vue{

  @PropSync()
  private todo!: Todo

  writable = false
  origin!:string

  mounted() {
    this.origin=this.todo.content
  }

  /**
   * 완료 항목이 아닐 때에만 수정하기
   */
  toggleWritable() {
    if(!this.todo.state) {
      this.writable=true
    }
  }
  /**
   * 이벤트 취소
   */
  cancel() {
    this.todo.content=this.origin
    this.writable=false
  }
  /**
   * 완료 체크
   */
  chkTodo() {
    this.cancel()
    this.todo.state=!this.todo.state
  }
  /**
   * 할 일 편집
   */
  editTodo() {
    if(!this.todo.content) {
      alert('잘못된 입력입니다.')
    }else{
      this.origin=this.todo.content
      this.writable=false
    }
  }
  /**
   * 항목 삭제
   */
  delTodo(){
    this.$emit('del-to-do',this.todo)
  }
}
</script>

<style scoped>

</style>