<template>
  <div class="coupon">
    <div class="coupon__disp" v-show="!isFeature">
      <img :src="require(`@/assets/images/coupon/${type}.png`)" alt="">
      <div class="inner">
        <h2 class="coupon__title" >
          <span v-html="title"></span>!
        </h2>
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
    <div class="coupon__disp coupon__disp--feature" v-show="isFeature">
      <img :src="require(`@/assets/images/coupon/bg-coupon.png`)" alt="">
      <div class="inner">
        <h2 class="coupon__title">
          <span v-html="title"></span>을 위한 취향저격 패키지!
        </h2>
        <div class="coupon__container">
          <ul class="coupon__gifts" :class="getGiftClassName">
             <li class="coupon__gifts-item" 
              v-for="(item, index) in currentResultData.item"
              @mouseover="handleHoverGift(index)"
              @mouseleave="handleHoverGift(-1)"
              :key="index" 
              :style="getStyle"
            >
              <img :src="require(`@/assets/images/coupon/${resultId}-${(index+1)}.png`)" alt="">
            </li>
          </ul>
          <div class="coupon__wrapper">
            <span class="coupon__value">
              <template v-if="giftHoverIndex > -1">
                {{getGiftDescription()}}
              </template>
              <template v-else>
                ※ 아이템에 마우스를 올리시면 상세한 아이템 정보를 확인할 수 있습니다.  
              </template>              
            </span>
          </div>
        </div>
        <Button class="coupon__btn-feature" @click="handleFeatureClick">
          <img src="@/assets/images/coupon/btn-feature-close.png" alt="쿠폰 구성품 보기">
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
    props: ['type', 'model', 'name', 'title', 'resultId', 'coupon'],
    data(){
      return {
        clipboard: null,
        isFeature: false,
        giftHoverIndex: -1,
        no: this.coupon,
        gift: [
          {
            id: 101,
            name: '기존유저_액션',
            item: [
              '일정 수치 이상의 장비 강화 시, 장비가 파괴되는 것을 방지해주는 기능성 아이템', // 강화 파괴 방지 장치
              '메이즈, 레이드에서 전투 불능상태가 되었을 시 캐릭터를 부활시켜주는 아이템', // 부활 장치
              '사용 시 사용한 장비의 강화 가능한 횟수를 5회 충전시켜주는 아이템', // 강화 횟수 증가권
              '게임 내 모든 채널과 마을에 하고 싶은 채팅 내용을 전달 할 수 있는 아이템', // 확성기
              '메이즈 클리어 시 사용가능하며 사용 시 추가 랜덤 보상 획득이 가능한 아이템' // 보너스 카드키 x 10
            ]
          },
          {
            id: 102,
            name: '기존유저_뷰티',
            item: [
              '개봉한 캐릭터가 착용 가능한 러블리 데이트 / 하이틴 록스타 코스튬이 지급되는 패키지 박스', // [EV][코스튬 박스] 러블리 데이트 룩,하이틴 록스타
              '메이즈, 레이드에서 전투 불능상태가 되었을 시 캐릭터를 부활시켜주는 아이템', // 액세서리 상자
              '보유중인 코스튬의 비활성화 되어 있는 브로치 소켓을 활성화 시켜주는 기능성 아이템' // 브로치 소켓 추가권
            ]
          },
          {
            id: 103,
            name: '기존유저_마이룸',
            item: [
              '자신의 마이룸에 배치 가능한 쿠키 테마 가구 아이템', // 쿠키 샤워부스[A]
              '마이룸에 보유중인 작물에 사용 가능하며 사용 시 해당 작물 재배 시간 30% 감소', // 영양제
              '마이룸에 보유중인 작물에 사용 가능하며 사용 시 작물의 부패 진행을 방지', // 방부제
              '마이룸에서 장식용품으로 사용 가능한 캐릭터 포스터 박스가 지급되는 아이템' //캐릭터 포스터 박스
            ]
          },

          {
            id: 111,
            name: '신규유저_액션',
            item: [
              '게임 내 캐릭터의 인벤토리를 확장하는데 필요한 소모성 아이템', // 인벤토리 확장권
              '메이즈, 레이드에서 전투 불능상태가 되었을 시 캐릭터를 부활시켜주는 아이템', // 부활장치
              '사용 시 HP를 즉시 회복 시켜주는 소비 아이템', // 비트메디박스
              '1시간 동안 경험치를 20% 추가 획득 하게 해주는 부스터 아이템 ', // 전투교본
              '1시간 동안 아이템 드랍률을 20% 추가 획득하게 해주는 부스터 아이템' // 수집 지침 교본
            ]
          },
          {
            id: 112,
            name: '신규유저_뷰티',
            item: [
              '개봉한 캐릭터가 착용 가능한 의사/간호사 코슈튬이 지급되는 패키지 박스', // [EV][코스튬 박스] 의사,간호사복
              '개봉 시 착용 가능한 랜덤 악세서리 중 1종 획득 가능한 액세서리 상자', // 액세서리 상자
              '보유중인 코스튬의 비활성화 되어 있는 브로치 소켓을 활성화 시켜주는 기능성 아이템' // 브로치 소켓 추가권
            ]
          },
          {
            id: 113,
            name: '신규유저_마이룸',
            item: [
              '막혀있는 캐쉬 화분 1개를 오픈시킬 수 있는 아이템, 캐쉬화분은 재배시간 40% 감소', // 빛나는 모종 삽
              '자신의 마이룸에 배치 가능한 쿠키 테마 가구 아이템', // 쿠키 오븐[A]
              '마이룸에 보유중인 작물에 사용 가능하며 사용 시 해당 작물 재배 시간 30% 감소', // 영양제
              '마이룸에 보유중인 작물에 사용 가능하며 사용 시 작물의 부패 진행을 방지', // 방부제
              '마이룸에서 장식용품으로 사용 가능한 캐릭터 포스터 박스가 지급되는 아이템' // 캐릭터 포스터 박스
            ]
          }
        ]
      }
    },
    computed:{
      currentResultData(){
        return this.gift.filter(item => item.id == this.resultId)[0]
      },
      getGiftClassName(){
        return {
          'is-fashion': this.type === 1 ? true : false
        }
      },
      getStyle(){
        return {
          width: `${100/this.currentResultData.item.length}%`
        }
      }
    },
    components: {
      Button
    },
    methods:{
      handleUseButtonClick(){
        if(!window.App || !window.App.ToggleCouponModal){
          return alert('window.App.ToggleCouponModal 함수를 작성 해 주세요.')
        }

        window.App.ToggleCouponModal('open');
      },
      handleFeatureClick(){
        this.isFeature = !this.isFeature;
      },
      handleHoverGift(index){
        this.giftHoverIndex = index;
      },
      getGiftDescription(){
        return this.giftHoverIndex > -1 ? this.currentResultData.item[this.giftHoverIndex] : false
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
    h1,h2,h3,h4,h5,h6,p{
      font-family: 'Nanum Gothic', sans-serif;
    }
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
      font-size:22px;
      color:#ec008c;
    }
    @include e('description'){
      margin-top:33px;
      font-size:31px;
      color:#00302c;
    }
    @include e('container'){
      margin-top:45px;
      @at-root .coupon__disp--feature &{
        margin-top: 35px;
        // margin-top: 38px;
      }
      &:after{
        content:'';
        display:block;
        clear:both;
      }
    }
    @include e('wrapper'){
      position:relative;
      width: 100%;
      max-width: 454px;
      float:left;
      border-radius:8px;

      font-size:26px;
      line-height: 79px;
      color:#FFF;
      background-color: #00302c;

      @at-root .coupon__disp--feature &{
        max-width:100%;
        font-size:16px;
        height:60px;
        line-height:1.4;
        font-weight: 400;
      }
    }
    @include e('value'){
      display: inline-block;
      margin-top: -5px;
      vertical-align: middle;
      @at-root .coupon__disp--feature &{
        position:absolute;
        top:50%;
        left:50%;
        width:100%;
        padding-right:14px;
        padding-left:14px;
        margin-top:0;
        transform:translate(-50%, -50%);
      }
    }

    @include e('gifts'){
      padding:0;
      margin:0;
      margin-bottom:10px;
      list-style:none;
      font-size:0;
      text-align: center;
    }
    
    @include e('gifts-item'){
      $height: 135px;
      display:inline-block;
      height:$height;
      overflow:hidden;

      @at-root .is-fashion &{
        margin-top: -42px;
        width:22% !important;
        &:nth-of-type(1){
          position: relative;
          top: 22px;
          width: 56% !important;
          height:180px;
          &:hover{
            > img{
              margin-top:-180px;
            }
          }
        }
      }

      &:hover{
        > img{
          margin-top:-$height;
        }
      }
    }

    @include e('btn-use'){
      float:right;
    }
    @include e('btn-copy'){
      display:inline-block;
      margin-left: 24px;
      vertical-align: middle;
    }
    @include e('btn-feature'){
      margin-top:20px;
      @at-root .coupon__disp--feature &{
        margin-top:8px;
      }
    }
  }
</style>