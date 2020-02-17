<template>
  <div>
    <header-nav :title="title"
                :titlePath="titlPath"
                :position="position"></header-nav>
    <div class="fixDetail-container">
      <div class="fixDetail-tips">
        <el-form label-width="40%">
          <!-- 业主 -->
          <el-form-item label="业主:">
            <el-input style="width:200px;"
                      v-model="fixDetail.fixOwner"></el-input>
          </el-form-item>
          <!-- 报修时间 -->
          <el-form-item label="报修时间:">
            <el-date-picker v-model="fixDetail.fixStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- 报修状态 -->
          <el-form-item label="报修状态:">
            <el-select v-model="fixDetail.fixState"
                       placeholder="请选择">
              <el-option v-for="item in fixStateSelect"
                         :key="item.value"
                         :label="item.value"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 完成时间 -->
          <el-form-item label="完成时间:">
            <el-date-picker v-model="fixDetail.fixEndTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <el-input type="textarea"
                :rows="15"
                placeholder="请输入内容"
                style="margin-bottom:20px;"
                v-model="fixDetail.fixContent">
      </el-input>
      <div class="fixDetail-btn">
        <el-button type="primary"
                   @click="modifyFixDetail">
          变更
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
import headerNav from '../headerNav'
const Base64 = require('js-base64').Base64
export default {
  components: {
    headerNav
  },
  data () {
    return {
      title: '报修管理',
      titlPath: '/fix',
      position: '报修详情',
      fixDetail: {},
      fixStateSelect: [
        {
          value: '已完成'
        },
        {
          value: '未完成'
        }
      ],
      isInput: false
    }
  },
  mounted () {
    this.getFixDetail()
  },
  methods: {
    getFixDetail () {
      this.fixDetail = JSON.parse(Base64.decode(this.$route.query.fixDetail))
      if (this.fixDetail.fixState === '已完成') {
        this.isInput = true
      }
    },
    // 返回
    goBack () {
      this.$router.push('/fix')
    },
    // 变更信息
    modifyFixDetail () {
      this.$confirm('确定要变更报修信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/modifyFixDetail', {
          params: {
            fixDetail: this.fixDetail
          }
        }).then(res => {
          if (res.data.state === 200) {
            console.log(res.data)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fixDetail-container /deep/ .el-select {
  margin-right: 50px;
}
.fixDetail-container /deep/ .el-form-item {
  float: left;
  margin-right: 80px;
}
.fixDetail-container {
  width: 97%;
  min-height: 500px;
  margin: 20px 0 0 20px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  position: relative;
  .fixDetail-tips {
    width: 100%;
    margin-top: 10px;
    height: 50px;
  }
  .fixDetail-content {
    width: 95%;
    margin: 20px auto;
    min-height: 300px;
    padding: 20px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .fixDetail-btn {
    float: right;
    margin-right: 20px;
  }
}
</style>