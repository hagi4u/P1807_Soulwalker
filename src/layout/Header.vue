<template>
  <header class="header">
    <h1 class="bi">
      <a href="http://soulworker.game.onstove.com/">
        <img src="@/assets/images/common/bi_white.png" alt="Soulwalker" v-if="isSystem">
        <img src="@/assets/images/common/bi.png" alt="Soulwalker" v-else>
      </a>
    </h1>
    <nav class="header__nav">
      <a href="javascript:alert('준비 중 입니다')" target="_blank">
        <img src="@/assets/images/common/ico_iris.png" alt="이리스 승급 업데이트 바로가기">
      </a>
      <a href="http://soulworker.game.onstove.com/" target="_blank">
        <img src="@/assets/images/common/ico_homepage.png" alt="홈페이지 바로가기">
      </a>
      <a href="https://www.facebook.com/soulworkerKR/" target="_blank">
        <img src="@/assets/images/common/ico_fb.png" alt="소을데이트 페이스북 바로가기">
      </a>
      <MuteSwitch @click="handleMuteClick" class="header__btn-sounds"/>
    </nav>
  </header>
</template>

<script>
  import MuteSwitch from '@/components/Switch/Switch';
  export default {
    props: ['isSystem'],
    components: {
      MuteSwitch
    },
    methods: {
      handleMuteClick(boolean){
        this.$emit('onMute', boolean)
      }
    }
  }
</script>

<style lang="scss">
@import '@/utils/sass/layouts/bem.scss';
@import '@/utils/sass/layouts/layout.scss';

.header{
  position:relative;
  width:100%;
  max-width:1222px;

  padding-top:25px;
  padding-right:10px;
  padding-left:10px;

  margin-left:auto;
  margin-right:auto;
  @include clearfix;
  @include e('nav'){
    float:right;
    @include clearfix;
  }
  @include e('btn-sounds'){
    text-align:right;
    margin-top:8px;
  }

  .bi{
    float:left;
  }
  
}
</style>