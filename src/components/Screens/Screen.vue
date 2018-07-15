<template>
  <div class="screen" :class="className">
    <transition :name="modelAnim" v-if="isUpdateScreen" appear mode="in-out">
      <div class="screen__model" ref="model">
        <img data-depth="0.15" :src="require(`@/assets/images/model/${model}.png`)" alt="">
      </div>
    </transition>
    
    <transition name="extra" appear>
      <slot>
        <ul class="screen__slot" v-if="isNested">
          <li class="screen__screenshot-item" v-for="(screenshot, index) in extraArray" :key="index">
            <img :src="require(`@/assets/images/screenshots/${screenshot}.png`)" alt="">
          </li>
        </ul>
      </slot>
    </transition>
  </div>
</template>

<script>
  import Parallax from 'parallax-js';

  export default {
    props: ['model', 'extra'],
    name: 'Screen',
    data(){
      return {
        isUpdateScreen: true,
        modelParallaxInstance: null,
        className: false,
        modelAnim: this.getModelAnimDirection(),
        parallaxOptions: {
          limitY: false,
          invertX: false,
          invertY: true,
        }
      }      
    },
    computed: {
      isNested(){
        return this.extra.length > 0
      },
      extraArray(){
        return this.extra ? this.extra.split(',') : false
      }
    },
    watch:{
      model(){
        this.modelAnim = this.getModelAnimDirection();
        this.className = this.isNested || !!this.$slots.default ? 'screen--nested' : false ;
        
        this.isUpdateScreen = false;
      }
    },
    methods:{
      getModelAnimDirection(){
        if(this.isNested){
          return 'model-right'
        }

        return this.modelAnim === 'model-right' ? 'model-left' : 'model-right'
      }
    },
    mounted(){
      this.modelParallaxInstance = new Parallax(this.$refs.model, this.parallaxOptions)
    },
    beforeUpdate(){
      if(!this.isUpdateScreen){
        this.isUpdateScreen = true;
      }
    },
    updated(){
      if(this.$refs.model){
        this.modelParallaxInstance = new Parallax(this.$refs.model, this.parallaxOptions);
      }
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';
  @import '@/utils/sass/layouts/mediaquery.scss';

  .screen{
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;

    @include e('model'){
      > img{
        top:0;
        bottom:0;

        max-width:none;
        height:120%;
        margin-top:-8%;
        margin-right:auto;
        margin-left:auto;
      }
    }
    @include m('nested'){
      .screen{
        @include e('model'){
          right:28%;
          > img{
            height:100%;
          }

          @include breakpoint(max-width, 1023px){
            right:50%;
          }
        }
        @include e('slot'){
          position:absolute;
          left:50%;
          top:80px;
          max-width:690px;
          width:100%;

          padding:0;
          margin:0;
          margin-left: -244px;

          list-style:none;

          @include breakpoint(max-width, 1024px){
            top:140px;
            max-width:500px;
            margin-left: -124px;
          }
        }
        @include e('screenshot-item'){
          float:left;
          width:50%;

          &:only-child{
            float:none;
            width:100%;
          }
        }
      }
    }
  }

  .model-left,
  .extra{
    &-enter, &-leave-to{
      opacity:0;
      transform:translateX(-50px);
    }
    &-enter-active{
      transition:all 0.6s ease-in-out;
    }
    &-enter-to{
      opacity:1;
      transform:translate(0);
    }
  }
  .model-right{
    &-enter, &-leave-to{
      opacity:0;
      transform:translateX(50px);
    }
    &-enter-active{
      transition:all 0.6s ease-in-out;
    }
    &-enter-to{
      opacity:1;
      transform:translate(0);
    }
  }
</style>