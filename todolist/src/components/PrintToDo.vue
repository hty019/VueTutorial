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
                        @change="saveList"></v-checkbox>
          </v-col>
          <v-col
              cols="10"
              class="text-left"
              :class="{'done':todo.state}"
          > <!--내용-->
            <span
                @dblclick="editShow(todo)"
            >
              {{todo.content}}
            </span>
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
    editShow(todo) {
      if(!todo.state){ //완료 상태일 때에는 수정이 될 수 없도록 함
        this.$emit('editShow',todo.id)
      }
    },
    delTodo(id){
      this.$emit('delTodo',id)
    }
  }
}
</script>

<style scoped>
.done {
  background-color: rgba(0,0,0,0.1);
}
.done span {
  text-decoration: line-through;
  color:rgba(0,0,0,0.5);
}
</style>