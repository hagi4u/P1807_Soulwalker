<template>
  <div>
    <Button @click="handleClick">
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
  export default {
    components: {
      Button
    },
    data(){
      return {
        isMuted: false
      }
    },
    methods: {
      handleClick(){
        this.isMuted = !this.isMuted;
        this.$emit('click', this.isMuted);
      }
    },
    mounted(){
      this.handleClick();
    }
  }
</script>

<style scoped>

</style>