<template>
  <div class="character-detail">
    <div class="inner">
      <h3 class="character-detail__title">
        <img :src="require(`@/assets/images/character/title_char${data.key}.png`)" alt="">
      </h3>
      <div class="character-detail__youtube">
        <youtube class="character-detail__embed" 
          :video-id="data.video" 
          :player-vars="{autoplay: 0}" 
          player-width="400" 
          player-height="240"
        />
      </div>
      <Button class="character-detail__btn" @click="handleOtherClick">
        <img src="@/assets/images/character/btn_other.png" alt="">
      </Button>
    </div>
    
    <!-- 성소 이미지 넣기 -->

    <transition 
      @before-enter="beforeEnterCharacter" 
      @enter="enterCharacter"
      appear
    >
      <div class="character-detail__bg-character" ref="character">
        <img data-depth="0.25" :src="require(`@/assets/images/character/img_char${data.key}.png`)" alt="">    
      </div>
    </transition>

    <transition
      @before-enter="beforeEnterLeft" 
      @enter="enterLeft"
      appear
    >
      <div class="character-detail__bg character-detail__bg--left"></div>
    </transition>

    <transition
      @before-enter="beforeEnterRight" 
      @enter="enterRight"
      appear
    >
      <div class="character-detail__bg character-detail__bg--right"></div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueYouTubeEmbed from 'vue-youtube-embed'
  import Parallax from 'parallax-js';
  import TweenLite from 'gsap/TweenLite';
  import Button from '@/components/Buttons/Button'

  Vue.use(VueYouTubeEmbed)

  export default {
    props: ['data'],
    components: {
      Button
    },
    data(){
      return {
        characterParallaxInstance: null
      }
    },
    methods: {
      beforeEnterLeft(el){
        TweenLite.set(el, {x: '-50%'})
      },
      enterLeft(el, done){
        TweenLite.to(el, 0.5, {x: '0%', delay: 0.2})
      },
      beforeEnterRight(el){
        TweenLite.set(el, {x: '50%'})
      },
      enterRight(el, done){
        TweenLite.to(el, 0.5, {x: '0%', delay: 0.2})
      },
      beforeEnterCharacter(el){
        TweenLite.set(el, {x: -30, opacity:0});
      },
      enterCharacter(el, done){
        TweenLite.to(el, 0.7, {x: 0, delay: 0.2, opacity:1});
      },
      handleOtherClick(){
        this.$emit('onOtherClick')
      }
    },
    mounted(){
      this.characterParallaxInstance = new Parallax(this.$refs.character)
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';
  .character-detail{
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    z-index:10;

    > .inner{
      position: absolute;
      top:90px;
      left:50%;

      width:615px;
      padding-right: 184px;

      transform:translateX(-50%);
      z-index:20;
    }

    @include e('bg'){
      position:absolute;
      top:0;
      bottom:0;
      width:100%;

      background-image:url('../../assets/images/character/bg_detail.png');
      
      background-repeat:no-repeat;
      background-size:200% 100%;

      @include m('left'){
        right:50%;
        background-position:0 center;
      }
      @include m('right'){
        left:50%;
        background-position:100% center;
      }
    }

    @include e('bg-character'){
      position:absolute;
      top:0;
      bottom:0;
      left:53%;
      z-index:11;
      > img{
        display:block;
        max-width:none;
        margin-top:-5%;
        height:120%;
      }
    }

    @include e('youtube'){
      width:442px;
      height:283px;

      background-image:url('../../assets/images/character/bg_youtube.png');
    }

    @include e('embed'){
      padding-top: 22px;
      padding-left: 21px;
    }

    @include e('btn'){
      display:block;
      float:right;
    }
  }
</style>