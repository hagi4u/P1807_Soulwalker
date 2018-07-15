<template>
  <div class="loading">    
    <div class="inner">
      <img src="@/assets/images/loading/bar.png" alt="souldate loading">
      <div class="loading__progress">
        <div class="loading__fill" :style="{'width': progress}">
          <img class="loading__indicator" src="@/assets/images/loading/indicator.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const assetsLoader = require('assets-loader');
  let loader = {};
  export default {
    data(){
      return {
        progress: 0
      }
    },
    mounted(){
      const screenshotsAsset = require.context('@/assets/images/screenshots/', true, /^.*\.png$/);
      const screenshotMap = screenshotsAsset.keys(key => screenshotsAsset(key)).map(item => {
        return require(`@/assets/images/screenshots/${item.toString().replace('./', '')}`)
      });
      const modelAsset = require.context('@/assets/images/model/', true, /^.*\.png$/);
      const modelMap = modelAsset.keys(key => modelAsset(key)).map(item => {
        return require(`@/assets/images/model/${item.toString().replace('./', '')}`)
      });

      loader = assetsLoader({
        assets: [
          ...screenshotMap,
          ...modelMap,
          require('@/assets/images/bg/start.jpg'),
          require('@/assets/images/bg/0.jpg'),
          require('@/assets/images/bg/1.jpg'),
          require('@/assets/images/bg/2.jpg'),
        ]
      })
      .on('error', (error) => {
          console.error(error);
      })
      .on('progress', (progress) => {
        this.progress = `${(progress * 100).toFixed()}%`;
      })
      .on('complete', (assets) => {
        this.$emit('onLoadingComplete');
      })
      .start();
    }    
  }
</script>

<style lang="scss">
  @import '@/utils/sass/layouts/bem.scss';

  .loading{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:10;
    background-color:#ebebeb;
    > .inner{
      position: relative;
      top:50%;
      left:50%;
      width:100%;
      max-width:540px;

      transform:translate(-50%, -50%);
    }
    @include e('progress'){
      position: absolute;
      top: 6px;
      right: 21px;
      bottom: 57px;
      left: 22px;
      background-color:#FFF;
    }
    @include e('fill'){
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      min-width:5%;
      background-color:#3edeee;
    }
    @include e('indicator'){
      position:absolute;
      bottom:100%;
      left:100%;
      width:108px;
      max-width:none;
      display:block;

      transform:translateX(-50%);
    }
  }

</style>