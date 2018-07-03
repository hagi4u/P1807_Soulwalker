<template>
  <div class="app">
    <Header class="app__header"/>
    <Screen class="app__screen"/>
    <BG type="4"/>
  </div>
</template>

<script>
import BG from './components/Common/BG.vue';
import Header from './layout/Header.vue';
import Screen from './layout/Screen.vue';

export default {
  name: 'App',
  components: {
    Header,
    Screen,
    BG,
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
