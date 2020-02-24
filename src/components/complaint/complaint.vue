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
        <!-- 业主名 -->
        <el-form-item>
          业主名：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="complaintSearch.complaintOwner">
          </el-input>
        </el-form-item>
        <!-- 投诉类型 -->
        <el-form-item>
          投诉类型：<el-select v-model="complaintSearch.complaintType"
                     placeholder="请选择">
            <el-option v-for="item in complaintSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchComplaint">
            搜索
          </el-button>
          <el-button type="warning"
                     @click="clearUp">
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
                  padding-left:5px;"
                  @selection-change="handleSelectionChange"
                  :cell-style="cellStyle">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="complaintTime"
                           label="投诉日期"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="complaintType"
                           label="投诉类型"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="complaintContent"
                           label="投诉内容"
                           :show-overflow-tooltip="true"
                           width="250"
                           align="center">
          </el-table-column>
          <el-table-column prop="complaintOwner"
                           label="投诉业主"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="complaintOwnerUnit"
                           label="所在单元"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="complaintState"
                           label="阅读状态"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="warning"
                         @click="redStateChange(scope.row)">
                标记已读
              </el-button>
              <el-button type="primary"
                         @click="getComplaintInfo(scope.row)">
                详情
              </el-button>
              <el-button type="success"
                         @click="toReply(scope.row)">
                回复
              </el-button>
              <el-button type="danger"
                         @click="deleteCompaint(scope.row)">
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
    <!-- 投诉详情 -->
    <div class="complaint-detail"
         v-if="isComplaint">
      <div class="complaint-info">
        <div class="complaint-info-header ">
          <div class="complaint-header-title">投诉详情</div>
          <img src="../../assets/icon/close.png"
               class="complaint-header-close"
               @click="closePopUp">
        </div>
        <div class="complaint-info-container">
          <el-form label-width="20%">
            <el-form-item label="投诉时间：">
              <el-input style="width:300px;"
                        v-model="complaintInfo.complaintTime"></el-input>
            </el-form-item>
            <el-form-item label="投诉业主：">
              <el-input style="width:300px;"
                        v-model="complaintInfo.complaintOwner"></el-input>
            </el-form-item>
            <el-form-item label="投诉类型：">
              <el-input style="width:300px;"
                        v-model="complaintInfo.complaintType"></el-input>
            </el-form-item>
            <el-form-item label="投诉内容：">
              <el-input type="textarea"
                        :rows="5"
                        style="margin-bottom:20px;
                        width:300px;"
                        v-model="complaintInfo.complaintContent">
              </el-input>
            </el-form-item>
            <el-form-item label="物业回复：">
              <el-input type="textarea"
                        :rows="5"
                        style="margin-bottom:20px;
                        width:300px;"
                        v-model="complaintInfo.complaintReply">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
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
      complaintInfo: {},
      complaintSearch: {},
      complaintList: [],
      // 投诉类型
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
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
      // 关闭详情弹窗
      isComplaint: false
    }
  },
  mounted () {
    this.getAllComplaint()
  },
  computed: {
    total () {
      return this.complaintList.length
    },
    currentList () {
      let ret = this.complaintList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 获取所有投诉信息
    getAllComplaint () {
      this.$axios.get('/getAllComplaint').then(res => {
        if (res.data.state === 200) {
          this.complaintList = res.data.complaintList
          this.complaintList.forEach(item => {
            if (item.readState === false) {
              item.complaintState = '未读'
            }
            else if (item.readState === true) {
              item.complaintState = '已读'
            }
          })
        }
      })
    },
    // 回复跳转
    toReply (row) {
      let complaintInfo = Base64.encode(JSON.stringify(row))
      console.log(complaintInfo)
      this.$router.push({
        path: '/complaintReply',
        query: {
          complaintInfo: complaintInfo
        }
      })
    },
    // 打开详情
    getComplaintInfo (row) {
      this.complaintInfo = row
      this.isComplaint = true
    },
    // 关闭弹窗
    closePopUp () {
      this.isComplaint = false
    },
    // 按条件搜索投诉信息
    searchComplaint () {
      this.$axios.post('/searchComplaint', {
        params: {
          complaintSearch: this.complaintSearch
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.complaintList = res.data.complaintList
        }
      })
    },
    // 清空搜索
    clearUp () {
      this.complaintSearch = {}
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.column.label === '阅读状态' && row.row.complaintState === '已读') {
        return {
          color: 'green',
          'font-weight': '700'
        }
      } else if (row.column.label === '阅读状态' && row.row.complaintState === '未读') {
        return {
          color: 'red',
          'font-weight': '700'
        }
      }
    },
    // 标记已读
    redStateChange (row) {
      this.$axios.post('/readStateChange', {
        params: {
          complaint: row
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.getAllComplaint()
        }
      })
    },
    // 删除单个投诉信息
    deleteCompaint (row) {
      this.$confirm('确定要删除此信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteComplaint', {
          params: {
            complaint: row
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getAllComplaint()
          }
        })
      })
    },
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
.complaint-detail {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .complaint-info {
    width: 25%;
    height: 65%;
    background-color: #fff;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .complaint-info-header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .complaint-header-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
        margin-left: 20px;
      }
      .complaint-header-close {
        width: 40px;
        height: 40px;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .complaint-info-container {
      width: 100%;
      height: 86%;
      text-align: left;
      margin-top: 25px;
      position: relative;
      .sumbit-btn {
        right: 50px;
        bottom: 0px;
        position: absolute;
      }
    }
  }
}
</style>