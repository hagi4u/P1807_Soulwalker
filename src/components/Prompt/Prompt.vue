<template>
  <div class="prompt">
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
        <p class="prompt__typing typing" @click="handleClickPrompt()"></p>
      </vue-typed-js>
      <p class="prompt__typing typing" v-else-if="isClicked" v-html="prompt">
      </p>
      <Button class="prompt__buttons prompt__buttons--prev" @click="handlePrevButtonClick()" v-if="isShownPrevButton">PREV</button>
      <Button class="prompt__buttons prompt__buttons--next" @click="handleNextButtonClick()" v-if="isShownNextButton">NEXT</Button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.js';
  import { VueTypedJs } from 'vue-typed-js'
  
  import Button from '@/components/Buttons/Button';
  
  import EventBus from '@/utils/eventBus';
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
      isMe: {
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
        
        EventBus.$emit('nextPrompt', e);
      },
      handlePrevButtonClick(e){
        this.isToggleTypedComponent = true;
        this.isClicked = false;
        this.isButtonsHide = true;

        EventBus.$emit('prevPrompt', e);
      }
    },
    computed:{
      isShownPrevButton(){
        if(this.isLastPrompt){
          return false
        }
        return !this.isMe && !this.isButtonsHide;
      },
      isShownNextButton(){
        if(this.isLastPrompt){
          return false;
        }
        return !this.isButtonsHide;
      }
    }
  }
</script>

<style lang="scss">
  @import '../../utils/sass/layouts/bem.scss';
  .prompt{
    position:absolute;
    bottom:40px;
    left:50%;
    transform:translateX(-50%);
    @include e('content'){
      position:relative;
      width:400px;
      height:200px;

      background-color:#F0F0F0;
    }
    @include e('typing'){
      position:absolute;
      top:10px;
      right:10px;
      bottom:10px;
      left:10px;
    }
    @include e('buttons'){
      position:absolute;
      top:50%;
      transform:translateY(-50%);
      @include m('prev'){
        left:-20px;
      }
      @include m('next'){
        right:-20px;
      }
    }
    p {
      margin:0;
      padding:0;
    }
  }
</style>