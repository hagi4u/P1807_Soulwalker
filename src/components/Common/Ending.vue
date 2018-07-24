<template>
  <div class="ending">
    <p class="ending__text">
      저장이 완료되었습니다. <br/>
      다른 유형의 쿠폰을 원하시면게임을 다시 시작해주세요. <br/>
      <strong>
        (쿠폰은 1인 1개의 쿠폰만 등록 가능합니다)
      </strong>
    </p>
    <Button class="ending__button" @click="handleRestartButtonClick">
      <img src="@/assets/images/ending/btn-re.png" alt="게임 다시시작하기">
    </Button>
    <Button class="ending__button" @click="handleShareButtonClick">
      <img src="@/assets/images/ending/btn-fb.png" alt="페이스북 공유하기">
    </Button>
  </div>
</template>

<script>
  import Button from '@/components/Buttons/Button';
  import Store from '@/utils/sessionStorage';
  export default {
    components: {
      Button
    },
    methods:{
      handleRestartButtonClick(){
        Store.resetStore();
        window.location.reload();
      },
      handleShareButtonClick(){
        if(!window.App || !window.App.shareFacebook){
          return alert('window.App.shareFacebook 함수를 작성 해 주세요.')
        }
        Store.resetStore();
        window.App.shareFacebook();
      }
    }
  }
</script>

<style lang="scss">
  .ending{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    text-align:center;
    &__text{
      margin-bottom:30px;
      font-size:20px;
      line-height:2;
      font-weight:800;
      color:#FFF;
      > strong{
        color:#fff799;
      }
    }
    .ending{
      &__button{
        margin-left:50px;
        &:first-of-type{
          margin-left:0;
        }
      }
    }
  }
</style>