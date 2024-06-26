<template>
  <div class="app">
    <Header class="app__header"
      :isSystem="isSystem"
    />

    <StartContents class="app__start-screen" 
      v-if="gameState === 'start'" 
      @onStartButtonClick="handleStartButtonClick"
    />
    <Loading 
      v-if="gameState === 'loading'" 
      @onLoadingComplete="handleLoadingComplete"
    />

    <SystemContents 
      v-if="isSystem" 
    >      
      <Saving 
        v-if="gameState === 'saving'" 
        @onCompleteSave="handleCompleteSave"
      />
      <Ending 
        v-else-if="gameState === 'end'" 
        @onCompleteSave="handleCompleteSave"
      />
      <p class="system-screen__content"
        @click="handleSystemContentsClick"
        v-else 
        v-html="this.scene.prompt[this.promptIdx].prompt"></p>
    </SystemContents>

    <MainContents class="app__screen" 
      v-if="gameState === 'playing' && !isSystem"
      
      :scene="scene" 
      :endingScene="endingScene"
      :promptIdx="promptIdx"
      :resultId="resultId"
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
import Store from '@/utils/sessionStorage';

export default {
  name: 'App',
  props: {
    initial: {
      type: Object,
      default () {
        return {
          history: [],
          promptIdx: null,
          goal_cid: false,
          currentNodeId: 0,
          isModalOpen: false
        }
      }
    }
  },
  data() {
    return {
      scene: Engine.getNode(this.initial.currentNodeId),
      gameState: 'start',
      resultId: this.initial.goal_cid || false,
      isLastPrompt: Engine.isLastPrompt(),
      promptIdx: this.initial.promptIdx  || 0,
      history: this.initial.history || Engine.history,
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
      this.resultId = this.initial.goal_cid || this.scene.goal_cid;
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

      Store
      .setGoalCid(this.resultId)
      .setCurrentNodeId(cid)
      .setPromptIdx(Engine.currentPromptId);
    },
    handleSystemContentsClick(){
      EventBus.$emit('nextPrompt');
    },
    handleStartButtonClick(){
      this.gameState = 'loading'
      
      if(Store.getStore().history.length === 0){
        Store.setHistory('[]').setCurrentNodeId(0).setPromptIdx(0);
      }
    },
    handleLoadingComplete(){
      this.gameState = 'playing';
    },
    handleCompleteSave(){
      this.gameState = 'end'
    },
    isFickle(){
      // 성소의 마이룸에 무반응을 처음에 반응했다가 무반응으로 태새전환 시
      return Engine.currentNodeId == 3 && Engine.history.length === 3
    },
    dispatchSaving(){
      if(this.scene.prompt[this.promptIdx].prompt === '$SAVING'){
        this.gameState = 'saving';
      }
    },
    handleSystemScreenLoaded(){
      if(this.scene.prompt[this.promptIdx].user === 'system'){
        this.delayBuffer = setTimeout(() => {
          EventBus.$emit('nextPrompt');
        }, 1500)
      }
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
        obj.title = "화려한 스킬 연계와 화끈한 액션의 재미를<br/>가장 중요하게 생각하는 당신";
        obj.name = '파이트';
        obj.type = 0;
        obj.model = this.resultId == 101 ? 26 : 37;
        obj.coupon = this.resultId == 101 ? 'withsoulworker' : 'thankyouworker';
      }
      if(this.resultId == 102 || this.resultId == 112){
        // 27 = 기존 , 38 = 신규
        obj.text = '짜잔!! 스타일에 죽고 스타일에 사는 우리 오빠를 위한';
        obj.title = "언제 어디서나 자신의 개성과 스타일을<br/>최우선으로 생각하는 당신";
        obj.name = '패션피플';
        obj.type = 1;
        obj.model = this.resultId == 102 ? 27 : 38;
        obj.coupon = this.resultId == 102 ? 'ilikechengxiao' : 'ilovechengxiao';
      }
      if(this.resultId == 103 || this.resultId == 113){
        // 110 = 기존, 39 = 신규
        obj.text = '짜잔!! 럭셔리한 우리 오빠의 마이룸을 위해';
        obj.title = "언제나 깔끔하고 럭셔리한 나만의 공간을<br/>최우선으로 생각하는 당신";
        obj.name = '럭셔리';
        obj.type = 2;
        obj.model = this.resultId == 103 ? 110 : 39;
        obj.coupon = this.resultId == 103 ? 'playsoulworker' : 'soulworkerdate';
      }

      obj.resultId = this.resultId;

      return obj
    },
    isSystem(){
      return this.scene.prompt[this.promptIdx].user === 'system'
    },
    bgType(){
      return this.gameState === 'start' ? 'start' : this.scene.prompt[this.promptIdx].bg
    }
  },
  watch: {
    promptIdx(){
      this.isLastPrompt = Engine.isLastPrompt();
      this.dispatchSaving();
      this.handleSystemScreenLoaded();
    },
    scene(){
      // 20180719 노트 이동 로직 추가
      if(this.isFickle()){
        Engine.nextPrompt();
      }

      this.promptIdx = Engine.currentPromptId;
      this.isLastPrompt = Engine.isLastPrompt();

      Store.setPromptIdx(this.promptIdx);
    }
  },
  beforeMount(){
    if(this.initial.promptIdx){
      this.promptIdx = Engine.currentPromptId = this.initial.promptIdx || 0;
    }
    if(this.initial.currentNodeId > -1){
      this.handleStartButtonClick();
      this.dispatchSaving();

      Engine.currentNodeId = this.initial.currentNodeId || 0;
      
      this.isLastPrompt = Engine.isLastPrompt();
    }
    
    if( this.initial.history.length > 0 ){
      Engine.history = this.initial.history;
    }

    if(this.initial.goal_cid){
      Engine.isLockPromptId = true;
      this.handleChangeEndingScene();
      Engine.isLockPromptId = false;
    }

    if(this.initial.isModalOpen){
      // 값 자동입력 (제거)
      // document.querySelector('.modal-coupon__form-item > input').value = this.endingScene.coupon;
      window.App.ToggleCouponModal('open');
    }

    this.handleSystemScreenLoaded();
  },
  mounted(){
    EventBus.$on('nextPrompt', () => {
      if(this.isLastPrompt && this.scene.goal_cid){
        this.handleChangeEndingScene();
        return true;
      }
      if(this.delayBuffer){
        clearTimeout(this.delayBuffer)
      }
      
      Engine.nextPrompt();
      this.promptIdx = Engine.currentPromptId;

      Store.setPromptIdx(this.promptIdx);
    });

    EventBus.$on('prevPrompt', () => {
      // 20180719 노트 이동 로직 추가
      if(this.isFickle()){
        EventBus.$emit('goPrevNode');
      } else {
        // default function
        Engine.prevPrompt();
      }

      if(this.promptIdx === 0){
        this.scene = Engine.getNode();
        Store
        .setCurrentNodeId(this.scene.cid)
        .setHistory(JSON.stringify(Engine.history));
      }
      
      this.promptIdx = Engine.currentPromptId;
      Store.setPromptIdx(this.promptIdx);
    });

    EventBus.$on('goToNode', (cid) => {
      if(this.scene.goal_cid){
        return this.handleChangeEndingScene();
      }

      this.scene = Engine.goToNode(cid).getNode(cid);
      
      Store
      .setCurrentNodeId(this.scene.cid)
      .setHistory(JSON.stringify(Engine.history));
    });
    
    EventBus.$on('goPrevNode', () => {
      this.scene = Engine.goToParentNode().getNode();
    })

  }
}
</script>

<style lang="scss">
  @import '@/utils/sass/base/reset.scss';
  @import '@/utils/sass/layouts/mediaquery.scss';
  html,
  body,
  .app{
    position:relative;
    width:100%;
    height:100%;
    font-family: 'Nanum Gothic', sans-serif;
  }

  html{
    /* iPadPro 는 높이값이 높아 어쩔 수 없이 화면을 자름*/
    @include iPadPro(){
      background-color:#000;
    }
  }
  .app,
  .modal{
    h1,h2,h3,h4,input,button{
      letter-spacing: 0;
      font-family: 'Nanum Gothic', sans-serif;
    }
  }
  .app{
    /* iPadPro 는 높이값이 높아 어쩔 수 없이 화면을 자름*/
    @include iPadPro(){
      height: 70%;
      transform: translateY(-50%);
      top: 50%;
    }

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
