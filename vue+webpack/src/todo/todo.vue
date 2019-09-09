<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <!-- v-model="textContent" -->
    <item v-for="todo in newtodos" 
          :key="todo.id" 
          :todo="todo" 
          v-on:del = "delId"
    />
    <Tabs 
      :todos="todoArray" 
      :filter="filter"
      v-on:togger = "toggerFilter"
      v-on:delcompleted = "delCompleteds"></Tabs>
  </section>
</template>

<script>
import Item from "./item.vue";
import Tabs from "./tabs.vue";
let id = 0;
export default {
  data() {
    return {
      todoArray: [],
      filter: 'all',
      // textContent: ''
    };
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    newtodos(params) {
      if (this.filter === 'all') {
        return this.todoArray
      }
      const completed = this.filter === 'active'
      return this.todoArray.filter(todo => completed !== todo.completed)
    }
  },
  methods: {
    addTodo(e) {
      this.todoArray.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false,
      })
      e.target.value = ''
      // let newPlane = {
      //   id: this.todoArray.length + 1,
      //   content: this.textContent,
      //   completed: false
      // }
      // this.todoArray.push(newPlane)
      // this.textContent = ''
    },
    toggerFilter(filter) {
      this.filter = filter
    },
    delCompleteds() {
      console.log("???")
      this.todoArray = this.todoArray.filter(todo => todo.completed !== true)
    },
    delId(id) {
      this.todoArray.splice(this.todoArray.findIndex(todo => todo.id === id),1)
    }
  },
};
</script>

<style lang="less" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
}
</style>
