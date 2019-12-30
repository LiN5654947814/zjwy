<template>
  <div>
    <div class="current">
      <span class="current-text">您现在所在的位置：</span>
      <span style="cursor:pointer;">{{position}}>></span>
      <span style="cursor:pointer;">{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'position'],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.current {
  width: 100%;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  .current-text {
    font-weight: 700;
    font-size: 15px;
    padding-left: 15px;
  }
}
</style>