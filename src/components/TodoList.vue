<template>
  <section class="todo-list">           
    <div class="state">
        <label class="all-done" :class="{'completed':allDoneChangeCheck}">
        <input type="checkbox"              
            @change="checkCompleted({mode:'all', allDone:allDoneChangeCheck})" 
            v-model="allDoneChangeCheck" >
        <font-awesome-icon icon="check" />        
      </label>
      <button class="btn-shuffle" @click="shuffle"> <i class="fas fa-random"></i></button>
      <div class="todo-count">
        <span>all</span> {{allCount}} 
        <span>active</span> {{activeCount}} 
        <span>completed</span> {{completedCount}}
      </div>
    </div>    
    <div class="filters">
      <button :class="{on:visibility == 'all'}" @click="filters('all')">All</button>
      <button :class="{on:visibility == 'active'}" @click="filters('active')">Active</button>
      <button :class="{on:visibility == 'completed'}" @click="filters('completed')">Completed</button>
    </div>   

    <div class="list">
      <transition-group name="list" tag="ul">           
        <li v-for="todo in filteredTodoList" :key="todo.id" :class="{ completed: todo.completed }">
          <label>
            <input type="checkbox" 
              @change="checkCompleted({mode:'one',id:todo.id})" 
              :checked="todo.completed" 
              :value="todo.item" >
            <i class="fas" 
              :class="{'fa-square':!todo.completed,'fa-check-square':todo.completed}"></i>
          </label>
          <span @click="todoDetailModal(todo)">{{todo.item}}</span>
          <button @click="removeTodo({id:todo.id})"><font-awesome-icon icon="trash" /></button>
        </li>      
      </transition-group>    
      <div class="no-list" v-if="this.$store.state.todoList.length==0">할일을 입력하세요.</div>
    </div>

    <Modal v-if="showModal" @modalClose="showModal=false">      
      <h3 slot="header">Todo Detail</h3>
      <div slot="body">{{todoDetail}}</div>      
    </Modal>
  </section>
</template>

<script>
import Modal from './Modal'
import { mapState, mapMutations } from "vuex";

export default {
  components:{ Modal },
  data() {
    return {      
      visibility:'all',
      allDoneChangeCheck:true,   
      showModal: false,    
      todoDetail:''     
    }
  },  
  computed:{   
    ...mapState(['todoList','allDone']),
    allCount() {
      return this.todoList.length;
    },
    activeCount() {
      return this.todoList.filter( todo => ! todo.completed ).length;      
    },
    completedCount() {
      return this.todoList.filter( todo =>  todo.completed ).length;
    },
    filteredTodoList:{      
      get() {        
        if(this.visibility=='all'){
          return this.todoList;
        }else if(this.visibility=='active'){
          return this.todoList.filter( todo => ! todo.completed );           
        }else{
          return this.todoList.filter( todo =>  todo.completed );
        }         
      }
    }    
  },
  created() {
    this.allDoneCheck();
  },
  watch: {
    activeCount:function() {
      this.allDoneCheck();
      this.todoListSet(this.todoList)  
    },
    allDone:function(){   
      this.allDoneCheck();
    }
  },
  methods: {
    ...mapMutations(['shuffle', 'removeTodo', 'checkCompleted', 'todoListSet', 'allDoneChange']),         
    filters:function(visibility){
      this.visibility=visibility;      
    },
    todoDetailModal:function (todo) {
      this.todoDetail=todo.item
      this.showModal=true   
    },
    allDoneCheck(){
      if(this.activeCount==0 && this.allCount!=0){
        this.allDoneChange({allDone:true})
        this.allDoneChangeCheck=true;
      }else{      
        this.allDoneChange({allDone:false})
        this.allDoneChangeCheck=false;
      }    
    }
  }
}
</script>

<style lang="scss" scoped>
  .all-done{
      display: inline-block;
      width: 30px;
      text-align: center;
      color:$dark-gray;
    &.completed{
      color:$primary;
    }
    .dark &{
      color:$white;
    }
    .dark &.completed{
      color:$primary;
    }
  }
  .btn-shuffle{
     color:$dark-gray;
    .dark &{
      color:$white;
    }
  }
  .state{
    line-height: 30px;
    .todo-count{
      float: right;
      color:$gray;
      span{
        color:$primary;
      }
    }
  }
  .filters{
    display: flex;    
    button{
      flex-grow:1;      
      height:30px;
      &.on{
        background-color:$primary;
        color:$white;
      }
      .dark &{
        color:$white;
      }
    }
  }
  .no-list{
    display: block;
    line-height: 50px;
    text-align: center;
  }

  .list{
    overflow: auto;
    height: calc(100vh - 265px);
    margin-top: 10px;
    background-color: $white;
  }
  li{
    display: flex;
    border-bottom:1px solid $light-gray;
    line-height: 40px; 
    transition: all 1s;
    overflow: hidden;
    height: 40px;
    box-sizing: border-box;
    &.list-enter-active, &.list-leave-active{
      opacity: 0;
      height: 0; 
      transform: translateY(-30px);
      transition: all 0.2s;
    }
    &list-enter, &.list-leave-to {
      opacity: 0;
      height: 0;    
      transform: translateY(30px);
    }
    &.list-move {
      transition: all 0.5s;
    }
    label{
      color:$gray;
    }   
    &.completed label{
      color:$primary;
    }
    &.completed span {
      color:$gray;
      text-decoration: line-through;
    }    
    label{
      flex: 1 0 30px;   
      text-align: center;
    }
    span{    
      width: 100%;
      text-align: left;
      @include ellipsis;
    }
    button{
      flex: 1 0 30px;           
      height: 40px;      
    }
  }    
  .modal-body div{
    font-size: 14px;
    text-align: left;
  }
  
</style>