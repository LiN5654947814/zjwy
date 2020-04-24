<template>
  <div>
    <headerNav :title="title"></headerNav>
    <div class="bulletin-details">
      <div class="bulletin-title">
        {{noticeInfo.noticeTitle}}
      </div>
      <div class="bulletin-container">
        <p v-html="noticeInfo.noticeContent"></p>
      </div>
      <div class="bulletin-date">{{noticeInfo.noticeTime | dateFormat}}
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
      title: '公告详情',
      noticeInfo: {}
    }
  },
  mounted () {
    this.getNoticeById()
  },
  methods: {
    // 根据id获取公告信息
    getNoticeById () {
      let noticeId = this.$route.params.id
      this.$axios.post('/getNoticeById', {
        params: {
          noticeId: noticeId
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.noticeInfo = res.data.notice
          console.log(this.noticeInfo)
        }
      })
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
    min-height: 50px;
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