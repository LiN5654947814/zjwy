<template>
  <div>
    <headerNav :title="title"></headerNav>
    <div class="bulletin-details">
      <div class="bulletin-title">
        XXXXX
      </div>
      <div class="bulletin-container">
        XXXXXXXXXXX
      </div>
      <div class="bulletin-date">xxxx-xx-xx
      </div>
    </div>
  </div>
</template>

<script>
import headerNav from '../headerNav'
export default {
  components: {
    headerNav
  },
  data () {
    return {
      title: '公告详情'
    }
  }
}
</script>

<style lang="scss">
.bulletin-details {
  width: 97%;
  min-height: 500px;
  margin: 20px 0 0 20px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .bulletin-title {
    width: 100%;
    height: 50px;
    font-size: 25px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid red;
  }
  .bulletin-container {
    width: 90%;
    margin: 0 auto;
    padding: 5px;
  }
  .bulletin-date {
    width: 200px;
    height: 50px;
    bottom: 0;
    right: 5px;
    position: absolute;
  }
}
</style>