<template>
  <main>
    <!--
      n-Layer ScreenComponent
      v-if="!isLastPrompt"
    -->
    <!-- 
      Question Component
      v-if="isLastPrompt"
    -->
    <Prompt :user="currentPrompt.user" :prompt="currentPrompt.prompt" :isMe="isMe" :isLastPrompt="isLastPrompt"/>
  </main>
</template>

<script>
  import Prompt from '../components/Prompt/Prompt.vue';
  export default {
    props: ['scene', 'promptIdx', 'isLastPrompt'],
    components: {
      Prompt,
    },
    data(){
      return {}
    },
    computed:{
      isMe(){
        return this.scene.prompt[this.promptIdx].user === '나'
      },
      currentPrompt(){
        return {
          ...this.scene.prompt[this.promptIdx]
        }
      }
    }
  }
</script>

<style scoped>

</style>