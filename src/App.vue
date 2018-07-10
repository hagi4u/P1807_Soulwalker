<template>
  <div class="app">
    <Header class="app__header" @onMute="handleMute"/>
    <SystemScreen
      @click="handleSystemScreenClick"
      v-if="scene.prompt[promptIdx].user === 'system'">
      System Screen
    </SystemScreen>
    <Screen class="app__screen" 
      :scene="scene" 
      :promptIdx="promptIdx" 
      :isLastPrompt="isLastPrompt"
      
      v-else
    />
    <BG type="4"/>
    <Copyright/>
  </div>
</template>

<script>
import Header from '@/layout/Header.vue';
import SystemScreen from '@/layout/SystemScreen';
import Screen from '@/layout/Screen.vue';
import Copyright from '@/layout/Copyright.vue';

import BG from '@/components/Common/BG.vue';

import EventBus from '@/utils/eventBus';
import Engine from '@/utils/engine';
import Sound from '@/utils/sounds';

// Sound.setMute(true);

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
    Screen,
    SystemScreen,
    BG,
    Copyright
  },
  methods: {
    handleMute(boolean = true){
      Sound.setMute(boolean);
    },
    handleChangeEndingScene( cid = 100 ){
      this.resultId = this.scene.goal_cid;
      this.scene = Engine.goToNode(cid).getNode();
    },
    handleSystemScreenClick(){
      EventBus.$emit('nextPrompt');
    }
  },
  watch: {
    promptIdx(){
      this.isLastPrompt = Engine.isLastPrompt();
    },
    scene(){
      this.promptIdx = Engine.currentPromptId;
      this.isLastPrompt = Engine.isLastPrompt();
    }
  },
  mounted(){
    Sound.bg.loop = true;
    Sound.play('bg');

    EventBus.$on('nextPrompt', () => {
      if(this.isLastPrompt && this.scene.goal_cid){
        return this.handleChangeEndingScene();
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

  },
  destroyed(){
    Sound.stop('bg');
  },
}
</script>

<style lang="scss">
  @import '@/utils/sass/base/reset.scss';
  h1,h2,h3,h4,h5,h6{
    padding:0;
    margin:0;
  }
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
      z-index:10;
    }
    &__screen{
      position:absolute;
      top:100px;
      bottom:0;
      right:0;
      left:0;
      z-index:10;

      // min-width:720px;
      max-width:720px;

      margin-right:auto;
      margin-left:auto;
    }
  }
</style>
