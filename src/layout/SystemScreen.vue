<template>
  <div class="system-screen" @click="handleScreenClick">
    <slot></slot>
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
  .system-screen{
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index: 10;

    color:#FFF;

    background-color:rgba(0,0,0,.9);
  }
</style>