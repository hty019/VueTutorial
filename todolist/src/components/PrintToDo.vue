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
                        @click="saveList"></v-checkbox>
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
</template>

<script>
export default {
  name: "PrintToDo",
  props:['filteredList','edit','delBtn'],
  methods: {
    showDelBtn(id) {
      this.$emit('showDelBtn',id)
    },
    hideDelBtn() {
      this.$emit('hideDelBtn')
    },
    editToDo(content) {
      this.$emit('editToDo',content)
    },
    saveList() {
      this.$emit('saveList')
    },
    editShow(id) {
      this.$emit('editShow',id)
    },
    delTodo(id){
      this.$emit('delTodo',id)
    }
  }
}
</script>

<style scoped>

</style>