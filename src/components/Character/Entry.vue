<template>
  <div class="character">
    <transition name="list" v-if="!isShownDetail" mode="out-in">
      <ul class="character__entry">
        <li class="character__item" :key="key" v-for="(i, key) in entry">
          <img :src="require(`@/assets/images/character/char${i.key}.png`)" :alt="i.name">
          <Button class="character__button" @click="handleCharacterClick(i)">
            <img src="@/assets/images/common/btn_question_select.png" alt="선택">
          </Button>
        </li>      
      </ul>
    </transition>

    <transition name="detail" v-else mode="out-in">
      <Detail :data="entry[currentIndex]" @onOtherClick="handleOtherClick"/>
    </transition>    

    <template v-if="!isUpdatedScreen">
      <Prompt
        :user="prompt.user"
        :prompt="prompt.prompt"
        :isMe="prompt.isMe"
        :isLastPrompt="prompt.isLastPrompt"
        @onNextButtonClick="handleNextPromptClick"
        @onPrevButtonClick="handlePrevPromptClick"
      />
    </template>
  </div>
</template>

<script>
  import EventBus from '@/utils/eventBus';
  
  import Button from '@/components/Buttons/Button';
  import Detail from "@/components/Character/Detail";
  import Prompt from '@/components/Prompt/Prompt';

  export default {
    components:{
      Button,
      Detail,
      Prompt
    },
    data(){
      return {
        isShownDetail: false,
        isUpdatedScreen: false,
        currentIndex: 0,
        entry: [{
          key: 1,
          m_key: 28,
          name: '하루 에스티아',
          video: 'neglpAdNeEg',
          text: '하루에스티아!! 스탠다드한 스타일.<br/>안정성이 뛰어나고 대감 한 방 한 방이 묵직하지!'
        },{
          key: 2,
          m_key: 32,
          name: '어원 아크라이트',
          video: 'UEr06OEP24w',
          text: '어원 아크라이트!! 남자 캐릭터는 의외인데?<br/>쌍권총 빵빵!! 정말 플레이스타일이 화려한 친구야'
        },{
          key: 3,
          m_key: 33,
          name: '릴리 블룸메르헨',
          video: 'zmP89uRP6DQ',
          text: '릴리 블룸메르헨!! 소름끼치는 광기와 잔혹함을<br/>숨기고 있는 그녀 위력적인 광역공격이 일품이지!'
        },{
          key: 4,
          m_key: 34,
          name: '스텔라 유니벨',
          video: 'zxeIyayR7Tc',
          text: '스텔라 유니벨! 하울링 가득한 기타연주.<br/>개성 넘치는 전투 스타일, 정말 느낌 있는 친구지!'
        },{
          key: 5,
          m_key: 35,
          name: '이리스 유마',
          video: 'ZYLfYqbM5ZI',
          text: '이리스 유마!! 마지막 승급 업데이트의 주인공.<br/>거포에서 뿜어져 나오는 압도적 화력, 이번 승급으로 더 핫 해진 친구지!'
        },{
          key: 6,
          m_key: 36,
          name: '진 세이파츠',
          video: 'BOiS48aptko',
          text: '진 세이파츠!! 남자라면 역시 격투가.<br/>콤보 공격이 정말 시원시원한 친구야'
        }]
      }
    },
    computed:{
      prompt(){
        const user = this.isShownDetail ? '성소': '나';
        const isMe = this.isShownDetail ? false : true;
        const prompt = this.isShownDetail ? this.entry[this.currentIndex].text : '흠... 어떤 캐릭터를 선택하지?'
        const isLastPrompt = this.isShownDetail ? false: true

        return {
          user,
          prompt,
          isMe,
          isLastPrompt
        }
      }
    },
    methods:{
      handleCharacterClick(item){
        this.currentIndex = (item.key - 1);
        this.isShownDetail = true;
        this.isUpdatedScreen = true;
      },
      handleOtherClick(){
        this.currentIndex = 0;
        this.isShownDetail = false;
        this.isUpdatedScreen = true;
      },
      handleNextPromptClick(){
        EventBus.$emit('nextPrompt');
      },
      handlePrevPromptClick(){
        this.handleOtherClick();
      }
    },
    beforeUpdate() {
      if(this.isUpdatedScreen){
        this.isUpdatedScreen = false;
      }
    }
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';
  @import '@/utils/sass/layouts/mediaquery.scss';
  .character{
    @include e('entry'){
      position:absolute;
      // top:158px;
      top:98px;
      left:50%;

      max-width:761px;
      width:100%;
      margin:0 auto;
      padding:0;

      list-style:none;
      transform: translateX(-50%);

      @include breakpoint(max-height, 800px){
        top:3%;
      }

      &:after{
        content:'';
        display:block;
        clear:both;
      }
    }
    @include e('item'){
      position:relative;
      float:left;
      width:50%;
      margin-top:4px;
    }
    @include e('button'){
      position:absolute;
      bottom:20px;
      right:0;
    }
  }
  .detail{
    &-leave, &-enter-to{
      opacity: 1;
    }
    &-enter-active,
    &-leave-active{
      transition:all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    &-leave-to, &-enter{
      opacity: 0;
    }
  }
  .list{
    &-enter-to, &-leave{
      opacity: 1;
    }
    &-enter-active{
      transition:all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    &-leave-active{
      transition:all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    &-leave-to, &-enter{
      opacity: 0;
    }
  }

</style>