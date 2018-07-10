<template>
  <main>
    <!--
      n-Layer ScreenComponent
      v-if="!isLastPrompt"
    -->
    
    <!-- Question Component -->
    <Question 
      v-if="isLastPrompt"
      :question="scene.question"
      @onQuestionClick="handleQuestionClick"
    />
    <!-- Prompt Component -->
    <template v-if="!isUpdatedScreen">
      <Prompt 
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
  import Question from '@/components/Question/List';

  import EventBus from '@/utils/eventBus';
  export default {
    props: ['scene', 'promptIdx', 'isLastPrompt'],
    components: {
      Prompt,
      Question
    },
    data(){
      return {
        isUpdatedScreen: false
      }
    },
    computed:{
      isMe(){
        return this.scene.prompt[this.promptIdx].user === '나'
      },
      currentPrompt(){
        return {
          ...this.scene.prompt[this.promptIdx],
          promptIdx: this.promptIdx
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

<style scoped>

</style>