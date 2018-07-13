<template>
  <div class="saving">
    <p class="saving__text">
      지금까지의 기록을 저장 중입니다.
      전원을 끄지 말아주세요...
    </p>
    <img :src="image" class="saving__image">
  </div>
</template>

<script>
  import Model1 from '@/assets/images/saving/model1.png'
  import Model2 from '@/assets/images/saving/model2.png'
  export default {
    data(){
      return {
        isChanged: false,
        intervalInstance: null
      }
    },
    computed:{
      image(){
        return this.isChanged ? Model1 : Model2
      }
    },
    methods:{
      handleComplete(){
        if(this.intervalInstance){
          clearInterval(this.intervalInstance)
        }
        this.$emit('onCompleteSave');
      }
    },
    mounted(){
      this.intervalInstance = setInterval(() => {
        this.isChanged = !this.isChanged
      }, 500);

      setTimeout(this.handleComplete, 3000)
    }
  }
</script>

<style lang="scss">
  .saving{
    position:absolute;
    width: 100%;
    bottom:0;

    text-align:center;

    &__text{
      font-size:20px;
      margin-bottom:-100px
    }
    &__image{

    }
  }
</style>