<template>
  <div class="prompt" @click="handleClickPrompt()">
    <img :src="promptImage" alt="">
    <h3 class="prompt__user">{{user}}</h3>
    <div class="prompt__content">
      <vue-typed-js 
        v-if="!isToggleTypedComponent && !isClicked"
        :strings="[prompt]" 
        :typeSpeed="typeSpeed"
        :showCursor="false"
        @preStringTyped="handleStartTyping()"
        @onComplete="handleCompleteTyping()"
        ref="typedComponent"
      >
        <p class="prompt__typing typing"></p>
      </vue-typed-js>
      <p class="prompt__typing typing" v-else-if="isClicked" v-html="prompt">
      </p>
      <Button class="prompt__buttons prompt__buttons--prev" @click.stop="handlePrevButtonClick()" v-if="isShownPrevButton">
        <img :src="PrevButtonImage" alt="">
      </button>
      <Button class="prompt__buttons prompt__buttons--next" @click.stop="handleNextButtonClick()" v-if="isShownNextButton">
        <img :src="NextButtonImage" alt="">
      </Button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.js';
  import { VueTypedJs } from 'vue-typed-js'

  import ModelPromptImage from '@/assets/images/common/prompt_model.png';
  import MePromptImage from '@/assets/images/common/prompt_me.png';

  import ModelPrevButton from '@/assets/images/common/btn_model_prev.png';
  import ModelNextButton from '@/assets/images/common/btn_model_next.png';
  import MePrevButton from '@/assets/images/common/btn_me_prev.png';
  import MeNextButton from '@/assets/images/common/btn_me_next.png';

  import Button from '@/components/Buttons/Button';  
  import Sound from '@/utils/sounds';

  Vue.use(VueTypedJs);
  export default {
    components: {
      VueTypedJs,
      Button
    },
    props: {
      user: {
        type: String,
        default: '사용자'
      },
      prompt: {
        type: String,
        default: '야옹야옹야옹 <br> 줄바꾸고 야옹야옹'
      },
      promptIdx: {
        type: Number,
        default: 0
      },
      isMe: {
        type: Boolean,
        default: false
      },
      isLastScene: {
        type: Boolean,
        default: false
      },
      isLastPrompt: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        typeSpeed: 50,
        isClicked: false,
        isButtonsHide: true,
        isToggleTypedComponent: false
      }
    },
    computed:{
      isShownPrevButton(){
        return !this.isMe && !this.isButtonsHide;
      },
      isShownNextButton(){
        if(this.isLastScene && !this.isButtonsHide){
          return true;
        }
        if(this.isLastPrompt){
          return false;
        }
        return !this.isButtonsHide;
      },
      promptImage(){
        return this.isMe ? MePromptImage : ModelPromptImage
      },
      PrevButtonImage(){
        return this.isMe ? MePrevButton : ModelPrevButton
      },
      NextButtonImage(){
        return this.isMe ? MeNextButton : ModelNextButton
      }
    },
    updated(){
      if(this.isToggleTypedComponent){
        this.isToggleTypedComponent = false;
      }
    },
    methods: {
      handleStartTyping(){
        Sound.play('typeWritter');
      },
      handleCompleteTyping(){
        this.isButtonsHide = false;
        Sound.stop('typeWritter');
      },
      handleClickPrompt(){
        this.isClicked = true;
        this.handleCompleteTyping();
      },
      handleNextButtonClick(e){
        this.isToggleTypedComponent = true;
        this.isClicked = false;
        this.isButtonsHide = true;
        
        this.$emit('onNextButtonClick', e);
      },
      handlePrevButtonClick(e){
        this.isToggleTypedComponent = true;
        this.isClicked = false;
        this.isButtonsHide = true;

        this.$emit('onPrevButtonClick', e);
      }
    },
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';
  @import '@/utils/sass/layouts/mediaquery.scss';
  @import '@/utils/sass/typography/typography.scss';
  .prompt{
    position:absolute;
    width:661px;
    top:55%;
    left:50%;
    z-index:100;
    -ms-transform:translateX(-50%);
    transform:translateX(-50%);

    @include disabledDrag();
    @include breakpoint(max-width, 1440px){
      top:60%;
    }
    @include breakpoint(max-height, 720px){
      top:55%;
    }

    @include e('user'){
      position: absolute;
      top: 15px;
      left: 44px;
      width: 76px;
      font-size:20px;
      text-align: center;
      color: #FFF;
    }
    @include e('content'){
      position: absolute;
      width: 562px;
      height: 142px;
      top: 60px;
      left: 54px;
      color:#666;
      letter-spacing: -1px;
    }
    @include e('typing'){
      line-height: 1.45;
      font-size: 25px;
    }
    @include e('buttons'){
      position:absolute;
      bottom:0;
      @include m('prev'){
        left:0;
      }
      @include m('next'){
        right:0;
      }
    }
    p {
      margin:0;
      padding:0;
    }
  }
</style>