<template>
  <section class="input-box shadow">
    <input type="text" 
          v-model="newTodoItem" 
          @keyup.enter="addTodo" 
          @keyup="typingCheck">
    <button class="btn-add" @click="addTodo">
      <font-awesome-icon icon="plus" :spin="spin" />
    </button>    
    <Modal v-if="showModal" @modalClose="showModal=false">      
        <h3 slot="header">알림</h3>
        <div slot="body">할일을 입력하세요.</div>        
    </Modal>
  </section>  
</template>

<script>
import Modal from './Modal'

export default {
  components:{ Modal },
  data() {
    return {
      newTodoItem:'',   
      showModal:false,
      spin:false   
    }
  },
  methods: {
    addTodo:function () {
      this.spin=true;
      setTimeout( () => this.spin=false , 1000)
      if (this.newTodoItem == '') {
          this.showModal = true;
          return
      }
      this.$store.commit('addTodo', {newTodoItem:this.newTodoItem});
      this.clearInput();
    },
    clearInput:function(){
      this.newTodoItem='';
    },
    typingCheck(){      
      if(this.newTodoItem.length > 0){
        this.showModal=false;
      }      
    }
  },  
}
</script>

<style lang="scss" scoped>
  .shadow{
    box-shadow: 5px 10px 10px rgba(0,0,0,.03);
  }
  .input-box{
    display: flex;
  }
  .btn-add{
    flex: 1 0 30px;    
    background-color: $primary;
    color:#fff;
  }
</style>