<template>
  <div>
    {{progress}}
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
        this.progress = (progress * 100).toFixed();
      })
      .on('complete', (assets) => {
        this.$emit('onLoadingComplete');
        loader.get('picture');
      })
      .start();
    }    
  }
</script>

<style scoped>

</style>