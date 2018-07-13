<template>
  <div class="system-screen" @click="handleScreenClick">    
    <slot class="system-screen__content"></slot>
  </div>
</template>

<script>
  export default {
    name: 'SystemScreen',
    methods: {
      handleScreenClick(){
        this.$emit('click');
      }
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';
  .system-screen{
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index: 10;

    color:#FFF;

    background-color:rgba(0,0,0,.85);
    @include e('content'){
      position:relative;
      top:50%;
      left:50%;
      width:100%;
      max-width: 1000px;

      text-align:center;
      font-size:20px;
      transform:translate(-50%, -50%);
    }
  }
</style>