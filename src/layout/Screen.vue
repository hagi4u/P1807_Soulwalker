<template>
  <main>
    <!--
      n-Layer ScreenComponent
      v-if="!isLastPrompt"
    -->
    <!-- 
      Character Selector Component 
      position:fixed 로 전체화면 감싼다음, 배경화면 주고 배경 이미지 뜨게하기       

      프롬프트 컴포넌트
      캐릭터 소개 레이아웃 컴포넌트 
      버튼 컴포넌트 (뒤로가기 등등)
    -->
    <div v-if="isShownCharacterSelector">
      캐릭터 선택하는 놈이 나와야 함
    </div>
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
        :isLastPrompt="isComputedLastPrompt"
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
        isUpdatedScreen: false,
        isComputedLastPrompt: this.isLastPrompt
      }
    },
    computed:{
      isMe(){
        return this.scene.prompt[this.promptIdx].user === '나'
      },
      isShownCharacterSelector(){
        return this.scene.prompt[this.promptIdx].optional1 === 'characterSelector'
      },
      currentPrompt(){
        return {
          ...this.scene.prompt[this.promptIdx],
          promptIdx: this.promptIdx
        }
      }
    },
    watch:{
      // 잠깐 보류 (isLastPrompt 가 제대로 먹히지 않는다, 다른 방법으로 해보기)
      // isShownCharacterSelector(){
      //   this.isComputedLastPrompt = this.isShownCharacterSelector ? true : this.isLastPrompt ? true : false
      // }
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