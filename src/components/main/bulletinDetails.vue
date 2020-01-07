<template>
  <div>
    <headerNav :title="title"></headerNav>
    <div class="bulletin-details">
      <div class="bulletin-title">
        严禁高空抛物的通知
      </div>
      <div class="bulletin-container">
        尊敬的业户：

        您好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任
      </div>
      <div class="bulletin-date">2019-12-31
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