<template>
  <div>
    <header-nav :title="title"
                :position="position"></header-nav>
    <div class="complaint-container">
      <div class="complaint-tips">
        <el-form label-width="40%">
          <!-- 业主 -->
          <el-form-item label="业主:">
            <el-input style="width:200px;"
                      v-model="complaintInfo.complaintOwner"
                      disabled></el-input>
          </el-form-item>
          <!-- 投诉时间 -->
          <el-form-item label="投诉时间:">
            <el-input style="width:200px;"
                      v-model="complaintInfo.complaintTime"
                      disabled></el-input>

          </el-form-item>
          <!-- 投诉类型 -->
          <el-form-item label="投诉类型:">
            <el-input style="width:200px;"
                      v-model="complaintInfo.complaintType"
                      disabled></el-input>
          </el-form-item>
          <!-- 所在单元 -->
          <el-form-item label="所在单元:">
            <el-input style="width:200px;"
                      v-model="complaintInfo.complainOwnerUnit"
                      disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="complaint-content">
        <el-input type="textarea"
                  :rows="10"
                  style="margin-bottom:20px;"
                  v-model="complaintInfo.complaintContent"
                  disabled>
        </el-input>
      </div>
      <div class="complaint-reply">
        <div class="reply-header">
          回复信息
        </div>
        <div class="reply-content">
          <el-input type="textarea"
                    :rows="13"
                    style="margin-bottom:20px;"
                    v-model="complaintInfo.complaintReply">
          </el-input>
        </div>
      </div>
      <div class="complaint-btn">
        <el-button type="primary">
          回复
        </el-button>
        <el-button type="danger"
                   @click="goBack">
          返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64
import headerNav from '../headerNav'
export default {
  components: {
    headerNav
  },
  data () {
    return {
      title: '投诉管理',
      position: '投诉回复',
      complaintInfo: {}
    }
  },
  mounted () {
    this.getComplaintInfo()
  },
  methods: {
    // 获取跳转信息
    getComplaintInfo () {
      this.complaintInfo = JSON.parse(Base64.decode(this.$route.query.complaintInfo))
    },
    // 返回
    goBack () {
      this.$router.push('/complaint')
    }
  }

}
</script>

<style lang="scss" scoped>
.complaint-container /deep/ .el-select {
  margin-right: 50px;
}
.complaint-container /deep/ .el-form-item {
  float: left;
  margin-right: 80px;
}
.complaint-container {
  width: 97%;
  min-height: 750px;
  margin: 20px 0 0 20px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  position: relative;
  .complaint-tips {
    width: 100%;
    margin-top: 10px;
    height: 50px;
  }
  .complaint-content {
    margin-top: 10px;
    height: 200px;
    padding: 15px;
  }
  .complaint-reply {
    width: 100%;
    margin-top: 30px;
    min-height: 200px;
    .reply-header {
      width: 95%;
      height: 50px;
      border-bottom: 1px solid #ccc;
      line-height: 60px;
      padding-left: 20px;
      font-size: 20px;
      font-weight: 700;
    }
    .reply-content {
      margin-top: 10px;
      height: 200px;
      padding: 15px;
    }
  }
  .complaint-btn {
    position: absolute;
    right: 50px;
    bottom: 20px;
  }
}
</style>