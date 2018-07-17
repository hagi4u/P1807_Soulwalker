<template>
  <footer class="footer">
    <div class="inner">
      <div class="banner-gift">
        <img src="@/assets/images/common/banner_gift.png" alt="">
      </div>
    </div>
    <p class="copyright">
      <span class="a11y">
        Smilegate Megaport. All Rights Reserved. &copy; LION GAMES All Rights Reserved.]
      </span>
    </p>
  </footer>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss">
@import '@/utils/sass/layouts/mediaquery.scss';
  .footer{
    position:fixed;
    right:0;
    bottom:0;
    left:0;
    z-index:21;
    > .inner{
      position:absolute;
      bottom:0;
      right:0;
      left:0;

      width:100%;
      max-width:1302px;
      
      margin-right:auto;
      margin-left:auto;
    }
  }
  .copyright{    
    height: 50px;
    margin:0;
    text-align:center;
    background-image:url('../assets/images/common/copyright.png');
    background-position: center top;
  }
  .banner-gift{
    position:absolute;
    width:312px;
    bottom:0;
    right:0;

    > img {
      display:block;
    }

    @include breakpoint(max-width, 1024px){
      width:200px;
    }
  }
</style>