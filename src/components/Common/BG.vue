<template>
  <div id="app-background-wrapper" ref="bgWrapper">
    <div data-depth="0.05" class="app-background" :class="bgClassName"></div>
  </div>
</template>

<script>
  import Parallax from 'parallax-js';
  
  export default {
    name: "Background",
    props: {
      type: {
        type: String,
        default: '1'
      }
    },
    computed: {
      bgClassName(){
        return `app-background--i${this.type}` 
      }
    },
    mounted(){
      this.parallaxInstance = new Parallax(this.$refs.bgWrapper)
    }
  }
</script>

<style lang="scss">
@import '../../utils/sass/layouts/bem.scss';

#app-background-wrapper{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:1;
  overflow:hidden;
}
.app-background{
  width:120%;
  height:120%;
  margin-top:-5%;
  margin-left:-10%;
  background-position:center;
  background-repeat:no-repeat;
  background-size: auto 100%;

  @include m('istart'){
    background-image:url('../../assets/images/bg/start.jpg');
  }

  @include m('i0'){
    background-image:url('../../assets/images/bg/0.jpg');
  }
  @include m('i1'){
    background-image:url('../../assets/images/bg/1.jpg');
  }
  @include m('i2'){
    background-image:url('../../assets/images/bg/2.jpg');
  }
}
</style>