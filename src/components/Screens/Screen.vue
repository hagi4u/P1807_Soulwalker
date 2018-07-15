<template>
  <div class="screen" :class="className">
    <transition :name="modelAnim" v-if="isUpdateScreen" appear mode="out-in">
      <div class="screen__model" ref="model">
        <img data-depth="0.15" :src="require(`@/assets/images/model/${model}.png`)" alt="">
      </div>
    </transition>
    
    <transition v-if="isNested" name="extra" appear>
      <template>
        <ul class="screen__screenshot">
          <li class="screen__screenshot-item" v-for="(screenshot, index) in extraArray" :key="index">
            <img :src="require(`@/assets/images/screenshots/${screenshot}.png`)" alt="">
          </li>
        </ul>
      </template>
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
      className(){
        return this.isNested ? 'screen--nested' : false 
      },
      extraArray(){
        return this.extra ? this.extra.split(',') : false
      }
    },
    watch:{
      model(){
        if(this.isUpdateScreen){
          this.isUpdateScreen = false;
        }
        this.modelAnim = this.getModelAnimDirection();
      }
    },
    methods:{
      getModelAnimDirection(){
        // return parseInt(Math.random() * 2) === 0 ? 'model-left' : 'model-right'
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

  .screen{
    @include e('model'){
      > img{
        // position:absolute;
        top:0;
        bottom:0;
        // left:50%;
        // transform:translateX(-50%);

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
        }
        @include e('screenshot'){
          position:absolute;
          left:50%;
          top:80px;
          max-width:690px;
          width:100%;

          padding:0;
          margin:0;
          margin-left: -244px;

          list-style:none;
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
    &-enter{
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
    &-enter{
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