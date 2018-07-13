<template>
  <div>
    <Button @click="handleClick()">
      <template v-if="isMuted">
        <img src="@/assets/images/common/ico_music_on.png" alt="ON">
      </template>
      <template v-else>
        <img src="@/assets/images/common/ico_music_off.png" alt="OFF">
      </template>
    </Button>
  </div>
</template>

<script>
  import Button from '@/components/Buttons/Button'
  import EventBus from '@/utils/eventBus';
  import Sound from '@/utils/sounds';
  export default {
    components: {
      Button
    },
    data(){
      return {
        isMuted: true
      }
    },
    methods: {
      handleClick(boolean = !this.isMuted){
        this.isMuted = boolean;
        this.$emit('click', this.isMuted);
        
        Sound.setMute(boolean);

        if(!boolean){
          Sound.play('bg');
        } 
      }
    },
    mounted(){
      EventBus.$on('toggleSound', (boolean) => {
        this.handleClick(boolean);
      })
    }
  }
</script>

<style scoped>

</style>