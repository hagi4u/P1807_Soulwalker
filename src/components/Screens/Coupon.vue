<template>
  <div class="coupon">
    <div class="coupon__disp">
      <img :src="require(`@/assets/images/coupon/${type}.png`)" alt="">
      <div class="inner">
        <h2 class="coupon__title" v-html="title"></h2>
        <h3 class="coupon__description">
          당신은 {{name}}워커!! <br/>
          소울워커 취향저격 스페셜 쿠폰
        </h3>
        <div class="coupon__container">
          <div class="coupon__wrapper">
            <span class="coupon__value">{{no}}</span>
            <Button class="coupon__btn-copy" :data-clipboard-text="no" ref="btn-clipboard">
              <img src="@/assets/images/coupon/btn-copy.png" alt="쿠폰복사">
            </Button>  
          </div>
          <Button class="coupon__btn-use" @click="handleUseButtonClick">
            <img src="@/assets/images/coupon/btn-use.png" alt="쿠폰사용하기">
          </Button> 
        </div>
        <Button class="coupon__btn-feature" @click="handleFeatureClick">
          <img src="@/assets/images/coupon/btn-feature.png" alt="쿠폰 구성품 보기">
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/Buttons/Button';
  import ClipboardJS from 'clipboard';

  export default {
    name: 'Coupon',
    data(){
      return {
        clipboard: null,
        no: document.getElementById('coupon').value
      }
    },
    components: {
      Button
    },
    props: ['type', 'model', 'name', 'title'],
    methods:{
      handleUseButtonClick(){
        if(!window.App || !window.App.ToggleCouponModal){
          return alert('window.App.ToggleCouponModal 함수를 작성 해 주세요.')
        }

        window.App.ToggleCouponModal('open');
      },
      handleFeatureClick(){
        alert('기획안 X');
      }
    },
    mounted(){
      this.clipboard = new ClipboardJS('.coupon__btn-copy');
      this.clipboard.on('success', () => {
        alert('쿠폰번호가 복사 되었습니다.')
      })
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';
  @import '@/utils/sass/layouts/mediaquery.scss';
  
  .coupon{
    $breakpoint: 1280px;
    @include breakpoint(max-width, 1024px){
      &.screen__slot{
        transform: none;
        left:auto;
        right:0;
      }
    }
    @include breakpoint(max-width, $breakpoint){
      &.screen__slot{
        max-width:684px;
      }
    }
    
    @include e('disp'){
      position:absolute;
      width:100%;
      max-width: 684px;
      > .inner{
        position: absolute;
        top: 46px;
        right: 42px;
        bottom: 0px;
        left: 42px;

        text-align:center;
      }
      @include breakpoint(max-width, $breakpoint){
        max-width:none;
      }
    }
    @include e('title'){
      font-size:25px;
      color:#ec008c;
    }
    @include e('description'){
      margin-top:30px;
      font-size:31px;
      color:#00302c;
    }
    @include e('container'){
      margin-top:45px;
      &:after{
        content:'';
        display:block;
        clear:both;
      }
    }
    @include e('wrapper'){
      width: 100%;
      max-width: 454px;
      float:left;
      border-radius:8px;

      font-size:26px;
      line-height: 79px;
      color:#FFF;
      background-color: #00302c;
    }
    @include e('value'){
      display: inline-block;
      margin-top: -5px;
      vertical-align: middle;
    }

    @include e('btn-use'){
      float:right;
    }
    @include e('btn-copy'){
      display:inline-block;
      margin-left: 4px;
      vertical-align: middle;
    }
    @include e('btn-feature'){
      margin-top:20px;
    }
  }
</style>