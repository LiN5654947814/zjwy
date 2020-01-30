<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="owner-fix-container">
      <div class="fix-select">
        <div class="fix-select-item"
             @click="handleSelect(1)"
             :class="[isSelect === 1?'':'is-active']">提交报修</div>
        <div class="fix-select-item"
             @click="handleSelect(2)"
             :class="[isSelect === 2?'':'is-active']">我的报修</div>
      </div>
      <!-- 提交报修 -->
      <div class="owner-fix-add"
           v-if="isSelect === 1">
        <el-form label-width="100px">
          <!-- 业主 -->
          <el-form-item label="业主:">
            <el-input style="width:200px;"
                      v-model="fixInfo.fixOwner"></el-input>
          </el-form-item>
          <!-- 报修时间 -->
          <el-form-item label="报修提交时间:">
            <el-date-picker v-model="fixInfo.fixTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- 房屋单位 -->
          <el-form-item label="填写房屋单位:">
            <el-input style="width:200px">
            </el-input>
            <span style="color:#ccc;font-size:13px;margin-right:10px;"> (x栋x区x层xxx门牌)</span>
          </el-form-item>
        </el-form>
        <div class="owner-fix-content">
          <el-input type="textarea"
                    :rows="12"
                    placeholder="请输入内容"
                    v-model="textarea">
          </el-input>
        </div>
        <div class="owner-fix-btn">
          <el-button type="primary"
                     size="mini">
            提交报修
          </el-button>
        </div>
      </div>
      <!-- 报修列表 -->
      <div class="owner-fix-list"
           v-if="isSelect === 2">
        <div class="owner-fix-table">
          <el-table :data="ownerPay"
                    style="width: 200%;
                  padding-left:5px;">
            <el-table-column prop="fixOwner"
                             label="业主"
                             width="250"
                             align="center">
            </el-table-column>
            <el-table-column prop="fixContent"
                             label="内容"
                             width="750"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="fixTime"
                             label="提交时间"
                             align="center">
            </el-table-column>
            <el-table-column prop="fixType"
                             label="状态"
                             align="center">
            </el-table-column>
            <el-table-column prop="fixEndTime"
                             label="完成时间"
                             align="center">
            </el-table-column>
          </el-table>
        </div>
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
      title: '报修提交',
      isSelect: 1,
      fixInfo: [],
      textarea: ''
    }
  },
  methods: {
    handleSelect (num) {
      this.isSelect = num
      console.log(this.isSelect)
    }
  }
}
</script>

<style lang="scss" scoped>
.owner-fix-container /deep/ .el-select {
  margin-right: 50px;
}
.owner-fix-container /deep/ .el-form-item {
  float: left;
  margin-top: 20px;
  margin-right: 80px;
}
.owner-fix-container {
  width: 100%;
  .fix-select {
    margin: 10px auto;
    width: 97%;
    height: 40px;
    .fix-select-item {
      float: left;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      background-color: #fff;
      list-style: none;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .owner-fix-add {
    width: 97%;
    min-height: 400px;
    margin: 0 20px 20px 20px;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    .owner-fix-content {
      width: 95%;
      margin: 0 auto;
    }
    .owner-fix-btn {
      margin-top: 10px;
      bottom: 10px;
      right: 30px;
      position: absolute;
    }
  }
  .owner-fix-list {
    width: 97%;
    min-height: 700px;
    margin: 0 20px 20px 20px;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
  }
}
.is-active {
  background-color: #cccccc !important;
  color: #fff;
}
</style>