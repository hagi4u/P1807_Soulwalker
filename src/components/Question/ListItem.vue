<template>
  <div class="question-item">
    <span class="question-item__index">{{index + 1}}</span>
    <p class="question-item__contents">{{data.question}}</p>
    <button class="question-item__button" @click="handleClick">선택</button>
  </div>
</template>

<script>
  export default {
    props: ['index', 'data'],
    methods: {
      handleClick(){
        const {index, data} = this;
        this.$emit('onQuestionClick', { index, data });
      }
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';

  .question-item{
    @include e('index'){
      float:left;
    }
    @include e('contents'){
      float:left;
    }
    @include e('button'){
      float:right;
    }
    &:after{
      content:'';
      display:block;
      clear:both;
    }
  }
</style>