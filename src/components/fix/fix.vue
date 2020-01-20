<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="fix-search">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索：</span>
        </el-form-item>
        <el-form-item>
          报修状态：<el-select v-model="fixInfo.houseUnit"
                     placeholder="请选择">
            <el-option v-for="item in fixStateSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          报修提交时间： <el-date-picker v-model="fixInfo.fixTime"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          业主名：<el-input style="width:150px;
                                    margin-right:10px;">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            搜索
          </el-button>
          <el-button type="warning">
            清空
          </el-button>
          <el-button type="success">
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fix-container">
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
      title: "报修管理",
      fixInfo: [],
      fixStateSelect: [
        {
          value: '已完成'
        },
        {
          value: '未完成'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.fix-search /deep/ .el-select {
  margin-right: 15px;
}
.fix-search /deep/ .el-form-item {
  float: left;
  margin-right: 15px;
}
.fix-search {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
</style>