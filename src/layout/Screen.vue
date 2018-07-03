<template>
  <main>
    <Prompt :prompt="copy" @changedPrompt="handleChangePrompt"/>
  </main>
</template>

<script>
  import Prompt from '../components/Prompt/Prompt.vue';
  export default {
    components: {
      Prompt
    },
    data(){
      return {
        copy: ['야옿야옿햐오햐']
      }
    },
    methods: {
      handleChangePrompt(value){
        // 해당되는 screens 의 json데이터를 받은 상태에서 props 만 내려버리기
        this.copy[0] = value.copy;
      }
    }
  }
</script>

<style scoped>

</style>