<template>
  <div class="start-screen">
    <transition name="model-anim" appear>
      <div class="start-screen__model" ref="model">
        <img src="@/assets/images/model/10.png" alt="" data-depth="0.2">
      </div>
    </transition>
    <transition
      name="blur-anim"

      @before-enter="beforeEnterBlur"
      @enter="enterBlur"

      appear
    >
      <div class="start-screen__blur"></div>
    </transition>
    <transition
      name="shape-anim"

      @before-enter="beforeEnterShape"
      @enter="enterShape"

      appear
    >
      <div class="start-screen__shape"></div>
    </transition>
    <div class="start-screen__title">
      <transition name="title-anim" appear>
        <img src="@/assets/images/start/title.png" alt="">
      </transition>
      <transition name="prompt-anim" appear>
        <div class="start-screen__start">
          <div class="start-screen__prompt">
            <img src="@/assets/images/start/prompt.png" alt="">
            <vue-typed-js
              :strings="['지금 저랑 데이트 할래요?', '게임을 시작하시겠습니까?']"
              :typeSpeed="50"
              :startDelay="700"
              :backSpeed="40"
              :smartBackspace="true"
              class="start-screen__prompt-content"
            >
              <p class="typing"></p>
            </vue-typed-js>
          </div>
          <Button class="start-screen__btn-start" @click="handleStartClick">
            <img src="@/assets/images/start/button.png" alt="">
          </Button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.js';
  import { VueTypedJs } from 'vue-typed-js'
  // import {TweenLite, TimelineMax, Power0} from 'gsap';

  import TweenLite from 'gsap/TweenLite';
  import TimelineMax from 'gsap/TimelineMax';
  import { Power0 }  from 'gsap/TweenMax';

  import Parallax from 'parallax-js';

  import EventBus from '@/utils/eventBus';
  import Button from '@/components/Buttons/Button.vue'

  Vue.use(VueTypedJs)
  export default {
    components: {
      Button,
      VueTypedJs
    },
    data(){
      return {
        shapeTimeline: new TimelineMax({repeat: -1}),
        blurTimeline: new TimelineMax({repeat: -1})
      }
    },
    methods: {
      beforeEnterShape(el){
        this.shapeTimeline.add(TweenLite.to(el, 3, {x: 10,y: -40}));
        this.shapeTimeline.add(TweenLite.to(el, 3, {x: 0,y: 0}));
      },
      enterShape(el){
        this.shapeTimeline.play();
      },

      beforeEnterBlur(el){
        this.blurTimeline.add(TweenLite.to(el, 7, {x: 60,y: 80}));
        this.blurTimeline.add(TweenLite.to(el, 7, {x: 0,y: 0}));
      },
      enterBlur(el){
        this.blurTimeline.play();
      },
      handleStartClick(){
        EventBus.$emit('toggleSound', false);
        this.$emit('onStartButtonClick');
      }
    },
    mounted(){
      this.parallaxInstance = new Parallax(this.$refs.model)
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';
  @import '@/utils/sass/layouts/mediaquery.scss';
  @import '@/utils/sass/typography/typography.scss';
  .start-screen{
    @include disabledDrag();
    @include e('model'){
      position:absolute;
      top:5px;
      right:0;
      left:0;
      bottom:0;

      width:100%;
      max-width:1185px;
      margin-right:auto;
      margin-left:auto;

      z-index:15;

      > img{
        // parallax-js 패키지가 inline 으로 top을 선점하기에 important 구문 작성
        position:absolute !important;
        top:auto !important;
        left:0 !important;
        right:0;
        bottom: -5%;
        margin-top:0;
      }
      
      @include breakpoint(max-width, 1024px){
        top:auto;
        bottom:-20px;
        width:110%;
        margin-left:-5%;
      }

      // ipad only
      @media only screen 
        and (min-device-width : 768px) 
        and (max-device-width : 1024px) 
        and (orientation : landscape) {
        
        top:0;
        bottom:auto;
      }
    }
    @include e('title'){
      position:absolute;
      top:50%;
      right:0;
      left:0;
      z-index:20;
      width:100%;
      max-width:1000px;
      margin-right:auto;
      margin-left:auto;

      transform:translateY(-30%);
    }
    @include e('start'){
      position:relative;
      width:100%;
      max-width:729px;
      margin-top: -32px;
      margin-right:auto;
      margin-left:auto;
    }
    @include e('prompt'){
      padding-top:30px;
      color:#666;
    }
    @include e('prompt-content'){
      position:absolute;
      top: 60px;
      left: 50px;
      font-size: 40px;
      display:block;
      >p{
        display:inline-block;
      }
    }
    @include e('btn-start'){
      position:absolute;
      right:0;
      top:0;
    }
    &__blur,
    &__shape{
      position:absolute;
      top:50px;
      z-index:13;
      width:1457px;
      height:936px;

      background-size:100% auto;
      background-repeat:no-repeat;
      background-position:center top;
    }

    @include e('blur'){
      background-image:url('../assets/images/start/bg-blur.png')
    }
    @include e('shape'){
      background-image:url('../assets/images/start/bg-shape.png')
    }

    .title-anim{
      &-enter{
        opacity:0;
        transform:translateY(-20px);
      }
      &-enter-active{
        transition:all 0.5s ease-in-out;
      }
      &-enter-to{
        opacity:1;
        transform:translateY(0);
      }
    }
    .prompt-anim{
      &-enter{
        opacity:0;
      }
      &-enter-active{
        transition:all 0.3s ease-in-out 0.5s;
      }
      &-enter-to{
        opacity:1;
      }
    }
    .model-anim{
      &-enter{
        opacity:0;
        transform:translateX(10px);
      }
      &-enter-active{
        transition:all 0.4s ease-in-out 1.1s;
      }
      &-enter-to{
        opacity:1;
        transform:translateX(0);
      }
    }
  }
</style>