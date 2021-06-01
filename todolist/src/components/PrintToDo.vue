<template>
  <v-list-item>
      <v-col cols="10" class="text-left"> <!--내용-->
        <v-text-field @dblclick="toggleWritable"
                      :readonly="!writable"
                      @keyup.enter="editTodo"
                      @keyup.esc="cancel"
                      v-model="todo.content"
                      :class="{'text-decoration-line-through':todo.state}"
                      prepend-icon="V"
                      @click:prepend="chkTodo"
                      append-outer-icon="삭제"
                      @click:append-outer="delTodo"
        />
      </v-col>
  </v-list-item>
</template>

<script>
export default {
  name: "PrintToDo",
  data:()=>{
    return {
      writable:false,
      origin:''
    }
  },
  mounted() {
    this.origin=this.todo.content
  },
  props:[
    'todo'
  ],
  methods: {
    /**
     * 완료 항목이 아닐 때에만 수정하기
     */
    toggleWritable() {
      if(!this.todo.state) {
        this.writable=true
      }
    },
    /**
     * 이벤트 취소
     */
    cancel() {
      this.todo.content=this.origin
      this.writable=false
    },
    /**
     * 완료 체크
     */
    chkTodo() {
      this.cancel()
      this.todo.state=!this.todo.state
      this.$emit('chk-todo',this.todo)
    },
    /**
     * 할 일 편집
     */
    editTodo() {
      if(!this.todo.content===false) {
        this.writable=false
        this.$emit('edit-to-do',this.todo)
        this.origin=this.todo.content
      }
    },
    /**
     * 항목 삭제
     */
    delTodo(){
      this.$emit('del-to-do',this.todo)
    },
    /**
     * 완료 목록 삭제
     */
    delDone() {
      this.$emit('del-done')
    }
  },
}
</script>

<style scoped>

</style>