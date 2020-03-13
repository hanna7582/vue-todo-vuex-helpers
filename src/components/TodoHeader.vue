<template>
  <header :class="{open:isNavShow}">
    <h1>{{this.$store.state.title}}</h1>  
    <button 
      class="btn-menu fas" 
      :class="toggleMenu" 
      @click="isNavShow=!isNavShow">
    </button> 
    <TodoMenu @navClose="isNavShow=false"/>
  </header>
</template>

<script>
import TodoMenu from './TodoMenu';
export default {
  data() {
    return {      
      isNavShow:false
    }
  },
  computed: {
    toggleMenu:function() {
      // 연결 안할 경우 :class="isNavShow?'fa-times':'fa-bars'"
      return this.isNavShow?{'fa-times':true}:{'fa-bars':true};
    }
  },
  components: {
    TodoMenu
  },
}
</script>

<style lang="scss" scoped>
  h1{
      @extend %text-center;
      color:$dark-gray;
      padding:1.5rem 0;
      .dark &{
        color:$white;
      }
  }
  .btn-menu{
    z-index: 101;
    transition: right 0.5s;
    font-size: 1.5em; 
    @include pos-abs(20px, 20px);
    .open &{
      right:220px;
    }     
    .dark &{
      color:$white;
    }
  }
</style>