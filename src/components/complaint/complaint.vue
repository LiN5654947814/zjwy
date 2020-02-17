<template>
  <div>
    <header-nav :title="title"></header-nav>
    <!-- 搜索 -->
    <div class="complaint-search">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索：</span>
        </el-form-item>
        <el-form-item>
          业主名：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="complaintInfo.complaintOwner">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            搜索
          </el-button>
          <el-button type="warning">
            清空
          </el-button>
          <el-button type="danger">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="complaint-container">
      <div class="complaint-table">
        <el-table :data="currentList"
                  style="width: 100%;
                  padding-left:5px;">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="parkingNum"
                           label="投诉日期"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingType"
                           label="投诉类型"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingStartTime"
                           label="投诉内容"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingEndTime"
                           label="投诉业主"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="danger"
                         @click="deleteParkingApplication(scope.row)">
                删除
              </el-button>
              <el-button type="success"
                         @click="toRegister(scope.row)">
                登记
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination layout="prev, pager, next"
                       :current-page.sync="filters.page"
                       :page-size="filters.limit"
                       :total="total">
        </el-pagination>
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
      title: '投诉管理',
      complaintInfo: {},
      complaintList: [],
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
    }
  },
  computed: {
    total () {
      return this.complaintList.length
    },
    currentList () {
      let ret = this.complaintList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  }
}
</script>
<style lang="scss" scoped>
.complaint-search /deep/ .el-select {
  margin-right: 10px;
}
.complaint-search /deep/ .el-form-item {
  float: left;
}
.complaint-search {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.complaint-container {
  width: 97%;
  margin: 20px;
  min-width: 1204px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .complaint-table {
    min-height: 750px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
</style>