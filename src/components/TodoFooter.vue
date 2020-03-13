<template>
  <footer>
      <div class="btn-group">
        <button v-if="todoList.length!=0" @click="showModal=true">Remove All</button>
        <button v-if="isRemoveCompleted" @click="removeCompleted">Remove completed</button>      
      </div>
      <Modal v-if="showModal">      
        <div slot="header"></div>
        <div slot="body">할일을 모두 삭제하시겠어요?</div>
        <template v-slot:footer>                      
          <div class="btn-group">
            <button class="modal-primary-button" @click="removeAll">OK</button>
            <button class="modal-default-button" @click="showModal=false">Cancel</button>
          </div>          
        </template>
      </Modal>
  </footer>
</template>

<script>
import Modal from './Modal'
import { mapState, mapMutations } from "vuex";

export default {  
  data() {
    return {
      showModal:false
    }
  },
  components:{ Modal },
  computed: {
    ...mapState(['todoList']),
    // todoList(){
    //   return this.$store.state.todoList;
    // },    
    isRemoveCompleted:function(){
      var completedCount=this.todoList.filter( todo => todo.completed == true ).length;
      return completedCount ? true : false;            
    }
  },
  methods: {
    ...mapMutations(['removeCompleted', 'allDoneChange']),    
    removeAll:function(){
      this.showModal=false; 
      this.allDoneChange({allDone:false})    
      this.$store.commit('removeAll');
    },
  }
}
</script>

<style lang="scss" scoped>
  footer{
    width: calc(100% - 40px);
    @include pos-fix(auto, auto, 20px);
  }
  .flex{
    display: flex;
  }
  .btn-group{
    display: flex;
    button{
      width: 100%;
      height: 30px;
      background-color: #fff;
      color: $primary;
      &:last-child{border-left:1px solid $light-gray;}
      &.modal-primary-button{
          height: 30px;
          background-color: $primary;
          color: $white;
      }
    }
  }
</style>