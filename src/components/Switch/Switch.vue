<template>
  <div>
    <Button @click="handleClick">
      <template v-if="isMuted">
        음악 켜기
      </template>
      <template v-else>
        음악 끄기
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
        isMuted: true
      }
    },
    methods: {
      handleClick(boolean = !this.isMuted){
        this.isMuted = boolean;
        this.$emit('click', this.isMuted);
      }
    },
    mounted(){
      if(this.isMuted){
        this.handleClick(true);
      }
    }
  }
</script>

<style scoped>

</style>