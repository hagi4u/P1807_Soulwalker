<template>
  <div class="prompt">
    <h3 class="prompt__user">{{user}}</h3>
    <div class="prompt__content">
      <vue-typed-js 
        v-if="!isToggleTypedComponent && !isClicked"
        :strings="prompt" 
        :typeSpeed="typeSpeed"
        :showCursor="false"
        @preStringTyped="handleStartTyping()"
        @onComplete="handleCompleteTyping()"
        ref="typedComponent"
      >
        <p class="prompt__typing typing" @click="handleClickPrompt()"></p>
      </vue-typed-js>
      <p class="prompt__typing typing" v-else-if="isClicked" v-html="prompt[0]">
      </p>
      <button class="prompt__buttons prompt__buttons--prev" @click="handlePrevButtonClick()" v-if="!isMe && !isButtonsHide">PREV</button>
      <button class="prompt__buttons prompt__buttons--next" @click="handleNextButtonClick()" v-if="!isButtonsHide">NEXT</button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.js';
  import { VueTypedJs } from 'vue-typed-js'

  Vue.use(VueTypedJs)

  export default {
    components: {
      VueTypedJs
    },
    props: {
      user: {
        type: String,
        default: '사용자'
      },
      prompt: {
        type: Array,
        default() {
          return ['야옹야옹야옹 <br> 줄바꾸고 야옹야옹']
        }
      },
      isMe: {
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
      console.log('updated')

      if(this.isToggleTypedComponent){
        this.isToggleTypedComponent = false;
      }

      // if(this.isClicked){
      //   this.isClicked = false;
      // }
    },
    methods: {
      handleStartTyping(){
        console.log('키보드 두드리는 소리 시작')
      },
      handleCompleteTyping(){
        console.log('키보드 두드리는 소리 끝')
        this.isButtonsHide = false;
      },
      handleClickPrompt(){
        this.isClicked = true;
        this.isButtonsHide = false;
      },
      handleNextButtonClick(){
        this.isToggleTypedComponent = true;
        this.isClicked = false;
        this.isButtonsHide = true;
        this.$emit('changedPrompt', {copy : '카피넥스트카피넥스트카피넥스트카피넥스트카피넥스트카피넥스트카피넥스트카피넥스트카피넥스트카피넥스트카피넥스트'});
      },
      handlePrevButtonClick(){
        this.isToggleTypedComponent = true;
        this.isClicked = false;
        this.isButtonsHide = true;
        this.$emit('changedPrompt', {copy : '카피프리브카피프리브카피프리브카피프리브카피프리브카피프리브카피프리브카피프리브카피프리브카피프리브카피프리브카피프리브'});
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