<template>
  <div class="error-body">
    <img src="../assets/image/404.png"
         class="image">
    <div class="error-text">
      抱歉，页面不存在
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.error-body {
  position: relative;
  width: 100%;
  min-height: 500px;
  .image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .error-text {
    position: absolute;
    top: 75%;
    left: 50%;
    font-size: 20px;
    font-weight: 700;
    transform: translate(-50%, -50%);
  }
}
</style>