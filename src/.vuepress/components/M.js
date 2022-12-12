import { h, defineComponent } from 'vue'

export default defineComponent({
    name: "M",
    setup() {
        return () => h('div', { id: 'foo' }, 'hello')
    }
})