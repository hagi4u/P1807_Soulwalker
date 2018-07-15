<template>
  <main class="screen">
    <!-- n-Layer ScreenComponent -->
    <Screen
      v-if="!isShownCharacterSelector && currentPrompt.model > 0"
      :model="currentPrompt.model"
      :extra="currentPrompt.nested"
    />
    <!-- Character Selector Component -->
    <CharacterSelector v-if="isShownCharacterSelector"/>

    <!-- Question Component -->
    <Question 
      v-if="isLastPrompt && !isShownCharacterSelector"
      :question="scene.question"
      @onQuestionClick="handleQuestionClick"
    />

    <!-- Prompt Component -->
    <template v-if="!isUpdatedScreen && !isShownCharacterSelector">
      <Prompt 
        class="screen__prompt"
        :user="currentPrompt.user" 
        :prompt="currentPrompt.prompt"
        :promptIdx="currentPrompt.promptIdx"
        :isLastScene="!!scene.goal_cid && scene.question.length === 0"
        :isMe="isMe" 
        :isLastPrompt="isLastPrompt"
        @onNextButtonClick="handleNextPromptClick"
        @onPrevButtonClick="handlePrevPromptClick"
      />
    </template>
  </main>
</template>

<script>
  import Prompt from '@/components/Prompt/Prompt';
  import CharacterSelector from '@/components/Character/Entry';

  import Question from '@/components/Question/List';
  import Screen from '@/components/Screens/Screen';

  import EventBus from '@/utils/eventBus';
  export default {
    props: ['scene', 'promptIdx', 'isLastPrompt'],
    components: {
      Prompt,
      Question,
      Screen,
      CharacterSelector
    },
    data(){
      return {
        isUpdatedScreen: false,
        isComputedLastPrompt: this.isLastPrompt
      }
    },
    computed:{
      isMe(){
        return this.scene.prompt[this.promptIdx].user === '나'
      },
      isShownCharacterSelector(){
        return this.scene.prompt[this.promptIdx].prompt === '$CHARACTER'
      },
      currentPrompt(){
        return {
          ...this.scene.prompt[this.promptIdx],
          promptIdx: this.promptIdx,
          model: parseInt(this.scene.prompt[this.promptIdx].model)
        }
      }
    },
    methods: {
      handleQuestionClick({index, data}){
        EventBus.$emit('goToNode', data.target_cid);
        this.isUpdatedScreen = true;
      },
      handleNextPromptClick(e){
        EventBus.$emit('nextPrompt', e);
      },
      handlePrevPromptClick(e){
        EventBus.$emit('prevPrompt', e);
      }
    },
    beforeUpdate() {
      if(this.isUpdatedScreen){
        this.isUpdatedScreen = false;
      }
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';
  @import '@/utils/sass/layouts/mediaquery.scss';

  .screen{
  }
</style>