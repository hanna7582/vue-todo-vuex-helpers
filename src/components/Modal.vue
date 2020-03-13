<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
          
          <div class="modal-footer">
            <slot name="footer" class="btn-group">              
              <button class="modal-default-button" v-on:click="modalClose">OK</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    methods: {
        modalClose:function(){
            this.$emit('modalClose');
        }
    },
}
</script>

<style lang="scss" scoped>  
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    max-width: 260px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: $white;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    .modal-leave-active &{
      transform: scale(1.1);
    }
  }

  .modal-body {    
    margin: 20px 0;
    @include text-center;
  }
  
  .btn-group{
    display: flex;
  }

  .modal-default-button{
    @include btn;
  }

  .modal-leave-active {
      opacity: 0;
  }

</style>