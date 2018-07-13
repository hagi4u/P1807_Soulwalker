<template>
  <div class="question-item" :class="{'is-multiline': isMultiLine}">
    <span class="question-item__index">{{index + 1}}</span>
    <p class="question-item__contents" v-html="data.question"></p>
    <Button class="question-item__button" @click="handleClick">
      <img src="@/assets/images/common/btn_question_select.png" alt="선택">
    </Button>
  </div>
</template>

<script>
  import Button from '@/components/Buttons/Button.vue'
  export default {
    props: ['index', 'data'],
    components: {
      Button
    },
    methods: {
      handleClick(){
        const {index, data} = this;
        this.$emit('onQuestionClick', { index, data });
      }
    },
    computed: {
      isMultiLine(){
        return this.data.question.indexOf('<br/>') > -1;
      }
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';

  .question-item{
    width:643px;
    margin-top:10px;
    font-size:0;

    background-image:url('../../assets/images/common/prompt_question_s.png');
    background-repeat:no-repeat;
    &.is-multiline{
      background-image:url('../../assets/images/common/prompt_question_l.png');
    }
    
    @include e('index'){
      display:inline-block;
      padding-top:17px;
      padding-left:21px;
      padding-bottom:17px;
      font-size:20px;
      vertical-align: middle;

      color:#FFF;
    }
    @include e('contents'){
      display:inline-block;
      padding-top:17px;
      padding-left: 30px;
      padding-bottom:17px;
      font-size:20px;
      vertical-align: middle;
    }
    @include e('button'){
      position:absolute;
      bottom:7px;
      right:0;
      @at-root .is-multiline &{
        bottom: 3px;
      }
    }
    &:after{
      content:'';
      display:block;
      clear:both;
    }
  }
</style>