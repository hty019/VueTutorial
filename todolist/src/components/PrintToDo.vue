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
				:class="{ 'text-decoration-line-through': todoItem.state }"
				prepend-icon="V"
				@click:prepend="chkTodo"
				append-outer-icon="X"
				@click:append-outer="delTodo"
			/>
		</v-col>
	</v-list-item>
</template>

<script lang="ts">
import { Component, Emit, PropSync, Vue } from 'vue-property-decorator';
import { Todo } from '@/types/options';

@Component
export default class PrintToDo extends Vue {
	@PropSync('todo')
	todoItem!: Todo;

	writable = false;
	origin!: string;

	mounted(): void {
		this.origin = this.todoItem.content;
	}

	/**
	 * 완료 항목이 아닐 때에만 수정하기
	 */
	toggleWritable(): void {
		if (!this.todoItem.state) {
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
	chkTodo(): void {
		this.cancel();
		this.todoItem = { ...this.todoItem, state: !this.todoItem.state };
	}
	/**
	 * 할 일 편집
	 */
	editTodo(): void {
		if (!this.todoItem.content) {
			alert('잘못된 입력입니다.');
		} else {
			this.origin = this.todoItem.content;
			this.writable = false;
			this.todoItem = { ...this.todoItem };
		}
	}
	/**
	 * 항목 삭제
	 */
	@Emit('del-to-do')
	delTodo(): Todo {
		return this.todoItem;
	}
}
</script>

<style scoped></style>
