<template>
  <div class="app">
    <Header class="app__header"/>
    <StartScreen class="app__start-screen"/>
    
    <SystemScreen
      @click="handleSystemScreenClick"
      v-if="scene.prompt[promptIdx].user === 'system'">
      System Screen
    </SystemScreen>

    <Screen class="app__screen" 
      v-if="false"
      :scene="scene" 
      :promptIdx="promptIdx"
      :isLastPrompt="isLastPrompt"
      
      v-else
    />
    <BG type="start"/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/layout/Header.vue';

import StartScreen from '@/layout/start.vue';

import SystemScreen from '@/layout/SystemScreen';
import Screen from '@/layout/Screen.vue';
import Footer from '@/layout/Footer.vue';

import BG from '@/components/Common/BG.vue';

import EventBus from '@/utils/eventBus';
import Engine from '@/utils/engine';

export default {
  name: 'App',
  data() {
    return {
      scene: Engine.getNode(),
      resultId: false,
      isLastPrompt: false,
      promptIdx: 0,
      history: Engine.history,
    }
  },
  components: {
    Header,
    StartScreen,
    Screen,
    SystemScreen,
    BG,
    Footer
  },
  methods: {
    handleChangeEndingScene( cid = 100 ){
      this.resultId = this.scene.goal_cid;
      this.scene = JSON.parse(JSON.stringify(Engine.goToNode(cid).getNode()).replace('[END_GOAL]', this.endingCopy));
    },
    handleSystemScreenClick(){
      EventBus.$emit('nextPrompt');
    }
  },
  computed: {
    endingCopy(){
      if(!this.resultId){
        return null
      }

      // 조금 더 똑똑하게 할 수 있음 (우선 여기다가 텍스트 넣는걸로..)
      if(this.resultId == 101 || this.resultId == 111){
        return '짜잔!! 화끈한 액션을 좋아하는 우리 오빠를 위한'
      }
      if(this.resultId == 102 || this.resultId == 112){
        return '짜잔!! 스타일에 죽고 스타일에 사는 우리 오빠를 위한'
      }
      if(this.resultId == 103 || this.resultId == 113){
        return '짜잔!! 럭셔리한 우리 오빠의 마이룸을 위해'
      }
    }
  },
  watch: {
    promptIdx(){
      this.isLastPrompt = Engine.isLastPrompt();

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
