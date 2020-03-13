<template>
  <div id="app" :class="theme">
    <TodoHeader />
    <TodoInput />
    <TodoList />    
    <TodoFooter />
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import { mapState, mapMutations } from "vuex";

export default {
  name: 'App',
  components: {
    TodoHeader, 
    TodoInput, 
    TodoList, 
    TodoFooter,
  },
  computed:{
    ...mapState(['todoList', 'theme']),
  },
  methods: {
    ...mapMutations(['todoListSet'])
  },
  watch: {
    todoList(todoList){      
      this.todoListSet(todoList)      
    }
  }
}
</script>

<style lang="scss">
  #app{
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    background: $light-gray;
    &.dark{
      background: $dark-gray;
    }
  }
</style>
