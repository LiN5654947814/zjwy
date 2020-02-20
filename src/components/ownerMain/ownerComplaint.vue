<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="owner-complaint-container">
      <div class="complaint-select">
        <div class="complaint-select-item"
             @click="handleSelect(1)"
             :class="[isSelect === 1?'':'is-active']">提交投诉</div>
        <div class="complaint-select-item"
             @click="handleSelect(2)"
             :class="[isSelect === 2?'':'is-active']">我的投诉</div>
      </div>
      <!-- 提交投诉 -->
      <div class="owner-complaint-add"
           v-if="isSelect === 1">
        <el-form label-width="100px">
          <!-- 业主 -->
          <el-form-item label="业主:">
            <el-input style="width:200px;"
                      v-model="complaintInfo.complaintOwner"></el-input>
          </el-form-item>
          <!-- 投诉类型 -->
          <el-form-item label="投诉类型：">
            <el-select v-model="complaintInfo.complaintType"
                       placeholder="请选择">
              <el-option v-for="item in complaintSelect"
                         :key="item.value"
                         :label="item.value"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 投诉日期 -->
          <el-form-item label="报修提交时间:">
            <el-date-picker v-model="complaintInfo.complaintTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- 房屋单位 -->
          <el-form-item label="填写房屋单位:">
            <el-input style="width:200px"
                      v-model="complaintInfo.complaintUnit">
            </el-input>
            <span style="color:#ccc;font-size:13px;margin-right:10px;"> (x栋x区x层xxx门牌)</span>
          </el-form-item>
        </el-form>
        <div class="owner-complaint-content">
          <el-input type="textarea"
                    :rows="12"
                    placeholder="请输入内容"
                    v-model="textarea">
          </el-input>
        </div>
        <div class="owner-complaint-btn">
          <el-button type="primary"
                     size="mini">
            提交投诉
          </el-button>
        </div>
      </div>
      <!-- 报修列表 -->
      <div class="owner-complaint-list"
           v-if="isSelect === 2">
        <div class="owner-complaint-table">
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
      title: '投诉提交',
      isSelect: 1,
      complaintInfo: [],
      textarea: '',
      complaintSelect: [
        {
          value: '维修投诉'
        },
        {
          value: '扰民投诉'
        },
        {
          value: '安全投诉'
        },
        {
          value: '停车管理的投诉'
        }

      ],
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
.owner-complaint-container /deep/ .el-select {
  margin-right: 10px;
}
.owner-complaint-container /deep/ .el-form-item {
  float: left;
  margin-top: 20px;
  margin-right: 60px;
}
.owner-complaint-container {
  width: 100%;
  .complaint-select {
    margin: 10px auto;
    width: 97%;
    height: 40px;
    .complaint-select-item {
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
  .owner-complaint-add {
    width: 97%;
    min-height: 400px;
    margin: 0 20px 20px 20px;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    .owner-complaint-content {
      width: 95%;
      margin: 0 auto;
    }
    .owner-complaint-btn {
      margin-top: 10px;
      bottom: 10px;
      right: 30px;
      position: absolute;
    }
  }
  .owner-complaint-list {
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