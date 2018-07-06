<template>
  <div class="app">
    <Header class="app__header"/>
    <Screen class="app__screen"/>
    <BG type="4"/>
    <Copyright/>
  </div>
</template>

<script>
import Header from '@/layout/Header.vue';
import Screen from '@/layout/Screen.vue';
import Copyright from '@/layout/Copyright.vue';

import BG from '@/components/Common/BG.vue';
import Sound from '@/utils/sounds.js';

export default {
  name: 'App',
  components: {
    Header,
    Screen,
    BG,
    Copyright
  },
  mounted(){
    Sound.bg.loop = true;
    // Sound.play('bg');
  },
  destroyed(){
    Sound.stop('bg');
  }
}
</script>

<style lang="scss">
  h1,h2,h3,h4,h5,h6{
    padding:0;
    margin:0;
  }
  html,
  body,
  .app{
    position:relative;
    height:100%;
  }

  .app{
    &__header{
      position:relative;
      z-index:10;
    }
    &__screen{
      position:absolute;
      top:0;
      bottom:0;
      right:0;
      left:0;
      z-index:10;
    }
  }
</style>
