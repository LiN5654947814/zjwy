<template>
  <div>
    <header-nav :title="title"></header-nav>
    <!-- 搜索 -->
    <div class="pay-search">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索：</span>
        </el-form-item>
        <el-form-item>
          业主姓名：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="paySearch.payOwner">
          </el-input>
        </el-form-item>
        <el-form-item>
          缴费状态：<el-select v-model="paySearch.payState "
                     placeholder="请选择">
            <el-option v-for="item in payState"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          缴费月份： <el-date-picker v-model="paySearch.payDate"
                          type="month"
                          placeholder="选择月"
                          style="margin-right:20px;"
                          value-format="yyyy-MM">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchPay">
            搜索
          </el-button>
          <el-button type="warning"
                     @click="clearUp">
            清空
          </el-button>
          <el-button type="success"
                     @click="addPay">
            新增
          </el-button>
          <el-button type="danger"
                     @click="deletePayList">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="pay-container">
      <div class="pay-table">
        <el-table :data="currentList"
                  style="width: 200%;
                  padding-left:5px;"
                  :cell-style="cellStyle"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="payOwner"
                           label="业主"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column prop="payOwnerUnit"
                           label="所在单元"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column prop="payElevator"
                           label="电梯使用费"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column prop="payGarbage"
                           label="垃圾清运费"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column prop="payLighting"
                           label="公摊照明费"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column prop="payApplication"
                           label="公共管理"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column prop="payDate"
                           label="续费时间"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column prop="payState"
                           label="状态"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column prop="payCount"
                           label="合计"
                           width="140"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           width="300"
                           align="center">
            <template slot-scope="scope">
              <el-button type="warning"
                         @click="payStateChange(scope.row)">
                标记已缴
              </el-button>
              <el-button type="primary"
                         @click="sendCalling(scope.row)">
                催缴
              </el-button>
              <el-button type="danger"
                         @click="deletePay(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="export-btn">
        <el-button @click="exportExcel"
                   size="mini"
                   type="primary">全部导出</el-button>
        <el-button @click="exportExcelBySelect"
                   size="mini"
                   type="primary">勾选导出</el-button>
      </div>
      <div class="pagination">
        <div class="pagination-total">共{{total}}条</div>
        <el-pagination layout="prev, pager, next"
                       :current-page.sync="filters.page"
                       :page-size="filters.limit"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 编辑弹窗 -->
    <div class="popUpbox"
         v-if="isPay">
      <div class="pay-info">
        <div class="pay-info-header">
          <div class="pay-header-title">
            编辑缴费信息
          </div>
          <img src="../../assets/icon/close.png"
               class="pay-header-close"
               @click="closePopUp">
        </div>
        <div class="pay-info-container">
          <el-form label-width="30%">
            <!-- 业主名称 -->
            <el-form-item label="业主名称:">
              <el-input style="width:300px;"
                        v-model="payInfo.payOwner"></el-input>
            </el-form-item>
            <!-- 电梯使用费 -->
            <el-form-item label="电梯使用费:">
              <el-input style="width:300px;"
                        v-model="payInfo.payElevator"></el-input>
            </el-form-item>
            <!-- 垃圾清运费 -->
            <el-form-item label="垃圾清运费:">
              <el-input style="width:300px;"
                        v-model="payInfo.payGarbage"></el-input>
            </el-form-item>
            <el-form-item label="公摊照明费:">
              <el-input style="width:300px;"
                        v-model="payInfo.payLighting"></el-input>
            </el-form-item>
            <el-form-item label="公共管理:">
              <el-input style="width:300px;"
                        v-model="payInfo.payApplication"></el-input>
            </el-form-item>
            <!-- 费用续费时间 -->
            <el-form-item label="该缴月:">
              <el-date-picker v-model="payInfo.payDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>

            </el-form-item>
            <!-- 缴费状态 -->
            <el-form-item label="状态:">
              <el-select v-model="payInfo.payState"
                         placeholder="请选择">
                <el-option v-for="item in payState"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     class="sumbit-btn">
            保存
          </el-button>
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
      title: '收费管理',
      payInfo: [],
      multipleSelection: [],
      paySearch: {},
      payList: [],
      payState: [
        {
          value: '已缴费'
        },
        {
          value: '未缴费'
        }
      ],
      filters: {
        page: 0,
        limit: 10
      },
      isPay: false
    }
  },
  mounted () {
    this.getAllPay()
  },
  computed: {
    total () {
      return this.payList.length
    },
    currentList () {
      let ret = this.payList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 新增收费信息
    addPay () {
      this.$router.push('/addPay')
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.column.label === '状态' && row.row.payState === '已缴费') {
        return {
          color: 'green',
          'font-weight': '700'
        }
      } else if (row.column.label === '状态' && row.row.payState === '未缴费') {
        return {
          color: 'red',
          'font-weight': '700'
        }
      }
    },
    // 编辑信息
    payModify (row) {
      this.isPay = true
      this.payInfo = row
    },
    // 关闭弹窗
    closePopUp () {
      this.isPay = false
    },
    // 获取所有收费信息
    getAllPay () {
      this.$axios.get('/getAllPay').then(res => {
        if (res.data.state === 200) {
          this.payList = res.data.payList
          this.payList.forEach(item => {
            item.payCount = item.payGarbage + item.payLighting + item.payElevator + item.payApplication
          })
        }
      })
    },
    // 按条件搜索
    searchPay () {
      this.$axios.post('/searchPay', {
        params: {
          paySearch: this.paySearch
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.payList = res.data.payList
          this.payList.forEach(item => {
            item.payCount = item.payGarbage + item.payLighting + item.payElevator
          })
        }
      })
    },
    // 清空
    clearUp () {
      this.paySearch = {}
    },
    // 标记已缴
    payStateChange (row) {
      this.$confirm('确定已收取该业主的费用？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('./payStateChange', {
          params: {
            payInfo: row
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.getAllPay()
          }
        })
      })
    },
    // 删除单条缴费信息
    deletePay (row) {
      this.$confirm('确定要删除该条信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deletePay', {
          params: {
            payInfo: row
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getAllPay()
          }
        })
      })
    },
    // 批量删除信息
    deletePayList () {
      let payList = this.multipleSelection
      this.$confirm('确定要删除' + this.multipleSelection.length + '条缴费信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deletePayList', {
          params: {
            payList: payList
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            setTimeout(() => {
              this.getAllPay()
            }, 1000)
          }
        })
      })
    },
    // 催缴
    sendCalling (row) {
      let payInfo = row
      this.$axios.post('/sendCalling', {
        params: {
          payInfo: payInfo
        }
      }).then(res => {
        if (res.data.state === 202) {
          this.$message({
            type: 'warning',
            message: res.data.message
          })
        } else if (res.data.state === 204) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
        }
        else if (res.data.state === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
        }
      })
    },
    // 导出所有收费excel
    exportExcel () {
      let name = new Date().getTime()
      this.$axios.get('/exportPay', { responseType: 'blob' }).then(ret => {
        console.log(new Blob([ret.data]))
        const url = window.URL.createObjectURL(new Blob([ret.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}-缴费清单表.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    // 勾选导出
    exportExcelBySelect () {
      let name = new Date().getTime()
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先勾选要导出的数据'
        })
        return
      }
      this.$axios.post('/exportPayList', {
        params: {
          payList: this.multipleSelection
        }
      }, { responseType: 'blob' }).then(ret => {
        console.log(new Blob([ret.data]))
        const url = window.URL.createObjectURL(new Blob([ret.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}-缴费清单表.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-search /deep/ .el-select {
  margin-right: 10px;
  line-height: 40px;
}
.pay-search /deep/ .el-form-item {
  float: left;
}
.pay-search {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.pay-container {
  width: 97%;
  margin: 20px;
  min-width: 1204px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .pay-table {
    min-height: 750px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
    .pagination-total {
      bottom: 7px;
      right: 130px;
      position: absolute;
      width: 100px;
      font-size: 15px;
    }
  }
}
.popUpbox {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .pay-info {
    width: 30%;
    height: 60%;
    background-color: #fff;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .pay-info-header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .pay-header-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
        margin-left: 20px;
      }
      .pay-header-close {
        width: 40px;
        height: 40px;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .pay-info-container {
      width: 100%;
      height: 86%;
      text-align: left;
      margin-top: 25px;
      position: relative;
      .sumbit-btn {
        right: 50px;
        bottom: 10px;
        position: absolute;
      }
    }
  }
}
</style>