<template>
  <header class="header">
    <h1 class="bi">
      <a href="http://soulworker.game.onstove.com/">
        <img src="http://placehold.it/200x100" alt="">
      </a>
    </h1>
    <nav class="header__nav">
      <a href="" target="_blank">
        <img src="http://placehold.it/150x40" alt="소을데이트 페이스북 공유하기">
      </a>
      <a href="" target="_blank">
        <img src="http://placehold.it/150x40" alt="이리스 승급 업데이트 바로가기">
      </a>
      <a href="http://soulworker.game.onstove.com/" target="_blank">
        <img src="http://placehold.it/150x40" alt="홈페이지 바로가기">
      </a>
    </nav>
  </header>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss">
$padding: 10px;
$height: 100px;
.header{
  position:relative;
  height:$height;
  padding-right:10px;
  padding-left:$padding;

  &__nav{
    position:absolute;
    top:0;
    right:$padding;
  }
}
</style>