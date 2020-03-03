<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="fixInfo-container">
      <div class="fixInfo-tips">
        <el-form label-width="40%">
          <!-- 业主 -->
          <el-form-item label="业主:">
            <el-input style="width:180px;"
                      v-model="fixInfo.fixOwner"></el-input>
          </el-form-item>
          <!-- 所在单元 -->
          <el-form-item label="所在单元:">
            <el-input style="width:180px;"
                      v-model="fixInfo.fixOwnerUnit"></el-input>
          </el-form-item>
          <!-- 联系方式 -->
          <el-form-item label="联系电话:">
            <el-input style="width:180px;"
                      v-model="fixInfo.fixOwnerPhone"></el-input>
          </el-form-item>
          <!-- 报修时间 -->
          <el-form-item label="报修时间:">
            <el-date-picker v-model="fixInfo.fixStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- 报修状态 -->
          <el-form-item label="报修状态:">
            <el-select v-model="fixInfo.fixState"
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
            <el-date-picker v-model="fixInfo.fixEndTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width:180px;"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <el-input type="textarea"
                :rows="15"
                placeholder="请输入内容"
                style="margin-bottom:20px;"
                v-model="fixInfo.fixContent">
      </el-input>

      <div class="fixInfo-btn">
        <el-button type="success"
                   @click="addFix">
          新增
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
export default {
  components: {
    headerNav
  },
  data () {
    return {
      title: '新增报修信息',
      fixInfo: {},
      fixStateSelect: [
        {
          value: '已完成'
        },
        {
          value: '未完成'
        }
      ],
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.push('/fix')
    },
    // 新增报修信息
    addFix () {
      this.$axios.post('/addFix', {
        params: {
          fixInfo: this.fixInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.$router.push('/fix')
        } else if (res.data.state === 401) {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.fixInfo-container /deep/ .el-select {
  margin-right: 10px;
}
.fixInfo-container /deep/ .el-form-item {
  float: left;
  margin-right: 80px;
}
.fixInfo-container {
  width: 97%;
  min-height: 500px;
  margin: 20px 0 0 20px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  position: relative;
  .fixInfo-tips {
    width: 100%;
    margin-top: 10px;
    height: 50px;
  }
  .fixInfo-content {
    width: 95%;
    margin: 20px auto;
    min-height: 300px;
    padding: 20px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .fixInfo-btn {
    float: right;
    margin-right: 20px;
  }
}
</style>