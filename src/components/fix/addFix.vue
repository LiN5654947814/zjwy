<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="fixInfo-container">
      <div class="fixInfo-tips">
        <el-form label-width="40%">
          <!-- 业主 -->
          <el-form-item label="业主:">
            <el-input style="width:200px;"
                      v-model="fixInfo.fixOwner"></el-input>
          </el-form-item>
          <!-- 报修时间 -->
          <el-form-item label="报修时间:">
            <el-date-picker v-model="fixInfo.fixTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- 报修状态 -->
          <el-form-item label="报修状态:">
            <el-select v-model="fixInfo.fixType"
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
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="fixInfo-content">
        {{fixInfo.fixContent}}
      </div>
      <div class="fixInfo-btn">
        <el-button type="success">
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
      fixInfo: [],
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
    }
  }

}
</script>

<style lang="scss" scoped>
.fixInfo-container /deep/ .el-select {
  margin-right: 50px;
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