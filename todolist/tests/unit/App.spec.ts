import { shallowMount } from '@vue/test-utils'
import InputToDo from '@/components/InputToDo.vue';

describe('컴포넌트 테스트', () => {
    it('인풋투두 테스트', () => {
        const userInput = 'new message'
        const wrapper = shallowMount(InputToDo)
        expect(wrapper.vm.addToDo()).toMatch(userInput)
    })
})
