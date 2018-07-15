<template>
  <div class="app">
    <Header class="app__header"/>

    <StartContents class="app__start-screen" 
      v-if="gameState === 'start'" 
      @onStartButtonClick="handleStartButtonClick"
    />
    
    <SystemContents 
      v-if="isSystem" 
      @click="handleSystemContentsClick"
    >
      <Loading v-if="gameState === 'loading'" @onLoadingComplete="handleLoadingComplete"/>
      <Saving v-else-if="gameState === 'saving'" @onCompleteSave="handleCompleteSave"/>
      <Ending v-else-if="gameState === 'end'" @onCompleteSave="handleCompleteSave"/>
      <p v-else v-html="this.scene.prompt[this.promptIdx].prompt" class="system-screen__content"></p>
    </SystemContents>

    <MainContents class="app__screen" 
      v-if="gameState === 'playing' && !isSystem"
      
      :scene="scene" 
      :endingScene="endingScene"
      :promptIdx="promptIdx"
      :isLastPrompt="isLastPrompt"
    />
    <BG :type="bgType"/>
    <Footer/>
  </div>
</template>

<script>
// Common
import Header from '@/layout/Header';
import Footer from '@/layout/Footer.vue';

import StartContents from '@/layout/StartContents';
import SystemContents from '@/layout/SystemContents';
import MainContents from '@/layout/Contents';

import BG from '@/components/Common/BG.vue';
import Saving from '@/components/Common/Saving.vue';
import Ending from '@/components/Common/Ending.vue';
import Loading from '@/components/Loading/Loading.vue';

import EventBus from '@/utils/eventBus';
import Engine from '@/utils/engine';

export default {
  name: 'App',
  data() {
    return {
      scene: Engine.getNode(),
      gameState: 'start',
      resultId: false,
      isLastPrompt: false,
      promptIdx: 0,
      history: Engine.history,
    }
  },
  components: {
    Header,
    Loading,
    StartContents,
    MainContents,
    SystemContents,
    BG,
    Saving,
    Ending,
    Footer
  },
  methods: {
    handleChangeEndingScene( cid = 100 ){
      this.resultId = this.scene.goal_cid;
      this.scene = JSON.parse(JSON.stringify(Engine.goToNode(cid).getNode()).replace('$END_GOAL', this.endingScene.text));
      this.scene.prompt = this.scene.prompt.map(item => {
        
        if(item.nested === '$COUPON'){
          item.nested = '';
          item.isCoupon = true;
          item.model = this.endingScene.model;
        }
        
        return {
          ...item
        }
      });
      
      if(this.resultId){
        console.log('goal_cid 에 대해 ajax call 하는 함수 만들기')
      }
    },
    handleSystemContentsClick(){
      EventBus.$emit('nextPrompt');
    },
    handleStartButtonClick(){
      this.gameState = 'loading'
    },
    handleLoadingComplete(){
      this.gameState = 'playing';
    },
    handleCompleteSave(){
      this.gameState = 'end'
    }
  },
  computed: {
    endingScene(){
      if(!this.resultId){
        return null
      }
      const obj = {};

      // 조금 더 똑똑하게 할 수 있음 (우선 여기다가 텍스트 넣는걸로..)
      if(this.resultId == 101 || this.resultId == 111){
        // 26 = 기존 , 37 = 신규
        obj.text = '짜잔!! 화끈한 액션을 좋아하는 우리 오빠를 위한';
        obj.title = "화려한 스킬 연계와 화끈한 액션의 재미를<br/>가장 중요하기 생각하는 당신!!";
        obj.name = '파이트';
        obj.type = 0;
        obj.model = this.resultId == 101 ? 26 : 37;
      }
      if(this.resultId == 102 || this.resultId == 112){
        // 27 = 기존 , 38 = 신규
        obj.text = '짜잔!! 스타일에 죽고 스타일에 사는 우리 오빠를 위한';
        obj.title = "언제 어디서나 자신의 개성을 최우선으로 생각하는<br/>스타일에 죽고 스타일에 사는 당신!";
        obj.name = '패션피플';
        obj.type = 1;
        obj.model = this.resultId == 102 ? 27 : 38;
      }
      if(this.resultId == 103 || this.resultId == 113){
        // 110 = 기존, 39 = 신규
        obj.text = '짜잔!! 럭셔리한 우리 오빠의 마이룸을 위해';
        obj.title = "언제나 깔끔하고 럭셔리한 나만의 공간을<br/>최우선으로 생각하는 당신!";
        obj.name = '럭셔리';
        obj.type = 2;
        obj.model = this.resultId == 103 ? 110 : 39;
      }

      return obj
    },
    isSystem(){
      return this.scene.prompt[this.promptIdx].user === 'system' || this.gameState === 'loading'
    },
    bgType(){
      return this.gameState === 'start' ? 'start' : this.scene.prompt[this.promptIdx].bg
    }
  },
  watch: {
    promptIdx(){
      this.isLastPrompt = Engine.isLastPrompt();

      if(this.scene.prompt[this.promptIdx].prompt === '$SAVING'){
        this.gameState = 'saving';
      }

      if(this.scene.prompt[this.promptIdx].user === 'system'){
        this.delayBuffer = setTimeout(() => {
          EventBus.$emit('nextPrompt');
        }, 1500)
      }
    },
    scene(){
      this.promptIdx = Engine.currentPromptId;
      this.isLastPrompt = Engine.isLastPrompt();
    }
  },
  mounted(){
    EventBus.$on('nextPrompt', () => {
      if(this.isLastPrompt && this.scene.goal_cid){
        return this.handleChangeEndingScene();
      }
      if(this.delayBuffer){
        clearTimeout(this.delayBuffer)
      }
      
      Engine.nextPrompt();
      this.promptIdx = Engine.currentPromptId;
    });

    EventBus.$on('prevPrompt', () => {
      Engine.prevPrompt();

      if(this.promptIdx === 0){
        this.scene = Engine.getNode();
      }
      
      this.promptIdx = Engine.currentPromptId;
    });

    EventBus.$on('goToNode', (cid) => {
      if(this.scene.goal_cid){
        return this.handleChangeEndingScene();
      }

      this.scene = Engine.goToNode(cid).getNode(cid);
    });
    
    EventBus.$on('goPrevNode', () => {
      this.scene = Engine.goToParentNode().getNode();
    })

  }
}
</script>

<style lang="scss">
  @import '@/utils/sass/base/reset.scss';
  html,
  body,
  .app{
    position:relative;
    width:100%;
    height:100%;
    font-family: 'Nanum Gothic', sans-serif;
  }

  .app{
    &__header{
      position:relative;
      z-index:100;
    }
    &__screen,
    &__start-screen{
      position:absolute;
      top:0;
      bottom:0;
      right:0;
      left:0;
      z-index:10;

      overflow:hidden;

      margin-right:auto;
      margin-left:auto;
    }
  }
</style>
