<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  import Sound from '@/utils/sounds.js';
  export default {
    methods: {
      handleClick(e){
        Sound.play('button');
        this.$emit('click', e);

        setTimeout(() => {
          Sound.stop('button');
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  button{
    margin:0;
    padding:0;
    border:0;

    border-radius:0;
    background-color:transparent;

    -webkit-appearance: none;

    cursor:pointer;
  }
</style>