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
          报修状态：<el-select v-model="fixSearch.fixState"
                     placeholder="请选择">
            <el-option v-for="item in fixStateSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          报修提交时间： <el-date-picker v-model="fixSearch.fixStartTime"
                          value-format="yyyy-MM-dd"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          业主名：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="fixSearch.fixOwner">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchFix">
            搜索
          </el-button>
          <el-button type="warning"
                     @click="clearUp">
            清空
          </el-button>
          <el-button type="success"
                     @click="addFix">
            新增
          </el-button>
          <el-button type="danger"
                     @click="deleteFixList">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fix-container">
      <div class="fix-table">
        <el-table :data="currentList"
                  style="width: 100%;
                  padding-left:5px;"
                  @selection-change="handleSelectionChange"
                  :show-overflow-tooltip="true"
                  :cell-style="cellStyle">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="fixStartTime"
                           label="报修时间"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="fixContent"
                           label="报修内容"
                           width="500"
                           align="center">
          </el-table-column>
          <el-table-column prop="fixOwner"
                           label="业主"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="fixState"
                           label="报修状态"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="fixEndTime"
                           label="修理完成时间"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getFixDetail(scope.row)">
                详情
              </el-button>
              <el-button type="danger"
                         @click="deleteFix(scope.row)">
                删除
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
const Base64 = require('js-base64').Base64
export default {
  components: {
    headerNav
  },
  data () {
    return {
      title: "报修管理",
      fixInfo: {},
      fixSearch: {},
      fixStateSelect: [
        {
          value: '已完成'
        },
        {
          value: '未完成'
        }
      ],
      fixList: [],
      // 报修信息
      fixDetail: {},
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
    }
  },
  mounted () {
    this.getAllFixList()
  },
  computed: {
    total () {
      return this.fixList.length
    },
    currentList () {
      let ret = this.fixList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 跳转详情
    getFixDetail (row) {
      let fixInfo = Base64.encode(JSON.stringify(row))
      this.$router.push({
        path: '/fixDetail',
        query: {
          fixDetail: fixInfo
        }
      })
    },
    // 新增报修信息
    addFix () {
      this.$router.push({ name: 'addFix' })
    },
    // 获取所有的报修信息
    getAllFixList () {
      this.$axios.get('/getAllFix').then(res => {
        if (res.data.state === 200) {
          this.fixList = res.data.fixList
        }
      })
    },
    //按条件搜索报修信息
    searchFix () {
      this.$axios.post('/searchFix', {
        params: {
          fixInfo: this.fixSearch
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.fixList = res.data.fixList
        }
      })
    },
    // 清空
    clearUp () {
      this.clearUp = {}
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.column.label === '报修状态' && row.row.fixState === '已完成') {
        return {
          color: 'green',
          'font-weight': '700'
        }
      } else if (row.column.label === '报修状态' && row.row.fixState === '未完成') {
        return {
          color: 'red',
          'font-weight': '700'
        }
      }
    },
    // 删除
    deleteFix (row) {
      this.$confirm('确定要删除此信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteFix', {
          params: {
            fixInfo: row
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getAllFixList()
          }
        })
      })
    },
    // 批量删除
    deleteFixList () {
      this.$confirm('确定要删除' + this.multipleSelection.length + '条报修信息？', '确定', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteFixList', {
          params: {
            fixList: this.multipleSelection
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getAllFixList()
          }
        })
      })
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
.fix-container {
  width: 97%;
  margin: 20px;
  min-width: 1204px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .fix-table {
    min-height: 750px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
</style>