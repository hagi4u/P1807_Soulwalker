<template>
  <section class="question" role="list">
    <template v-for="(item, index) in question">
      <transition 
        name="list" 
        mode="out-in" 
        :key="index" 

        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"

        appear>
        <QuestiomItem class="question__item" 
          :index="index" 
          :data="item" 
          @onQuestionClick="handleQuestionClick"
        />
      </transition>
    </template>
  </section>
</template>

<script>
  import {TweenMax, Power4} from 'gsap';
  import QuestiomItem from './ListItem';
  export default {
    name: 'Question',
    components: {
      QuestiomItem
    },
    props: {
      question: {
        type: Array,
        default() {
          return [
            {
                "cid": "0",
                "question": "질문",
                "target_cid": "0"
            }
          ]
        }
      }
    },
    data(){
      return {
        listItemIndex: 0
      }
    },
    methods: {
      handleQuestionClick(value){
        this.$emit('onQuestionClick', value);
      },
      beforeEnter(el){    
        TweenMax.set(el, {y: -15, opacity:0});
      },
      enter(el, done){
        TweenMax.to(el, 0.7, {
          y: 0, 
          opacity:1, 
          ease: Power4.easeInOut, 
          delay: 0.2 * this.listItemIndex,
          onComplete: done
        });
        this.listItemIndex = this.listItemIndex + 1
      },
      afterEnter(el){
        this.listItemIndex = 0;        
      }
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';

  .question{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    
    background-color:#FFF;
    @include e('item'){

    }
  }
</style>