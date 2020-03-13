<template>
  <div>
    <headerNav :title="title"
               :position="position"></headerNav>
    <!-- 搜索 -->
    <div class="parking-select">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索：</span>
        </el-form-item>
        <el-form-item>
          车位编号：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="parkingSearch.parkingNum">
          </el-input>
        </el-form-item>
        <el-form-item>
          租赁开始时间： <el-date-picker v-model="parkingSearch.parkingStartTime"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                          style="margin-right:20px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          业主名：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="parkingSearch.parkingOwner">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchRegisterParking">
            搜索
          </el-button>
          <el-button type="warning"
                     @click="clearUp">
            清空
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="parking-container">
      <div class="parking-table">
        <el-table :data="currentList"
                  height="710"
                  style="width: 100%;
                  padding-left:5px;"
                  :cell-style="cellStyle"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="parkingNum"
                           label="车位编号"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingType"
                           label="车位类型"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingStartTime"
                           label="车位租赁开始时间"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingEndTime"
                           label="车位租赁结束时间"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingOwner"
                           label="业主"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingStatus"
                           label="状态"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           width="200"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getParkingInfo(scope.row)">
                编辑
              </el-button>
              <el-button type="danger"
                         @click="reliveRegister(scope.row)">
                解除登记
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
        <el-pagination layout="prev, pager, next,total,jumper"
                       :current-page.sync="filters.page"
                       :page-size="filters.limit"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 编辑弹窗 -->
    <div class="popUpbox"
         v-if="isParking">
      <div class="parking-info">
        <div class="parking-info-header">
          <div class="parking-header-title">
            编辑车位信息
          </div>
          <img src="../../assets/icon/close.png"
               class="parking-header-close"
               @click="closePopUp">
        </div>
        <div class="parking-info-container">
          <el-form label-width="30%">
            <!-- 车位编号 -->
            <el-form-item label="车位编号:">
              <el-input style="width:300px;"
                        v-model="parkingInfo.parkingNum"
                        disabled></el-input>
            </el-form-item>
            <!-- 车位类型 -->
            <el-form-item label="车位类型:">
              <el-input style="width:300px;"
                        v-model="parkingInfo.parkingType"></el-input>
            </el-form-item>
            <!-- 车位租赁开始时间 -->
            <el-form-item label="车位租赁开始时间:">
              <el-date-picker v-model="parkingInfo.parkingStartTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期">
              </el-date-picker>

            </el-form-item>
            <!-- 车位租赁结束时间 -->
            <el-form-item label="车位租赁结束时间:">
              <el-date-picker v-model="parkingInfo.parkingEndTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <!-- 所属业主 -->
            <el-form-item label="所属业主:">
              <el-input v-model="parkingInfo.parkingOwner"
                        style="width:300px;"
                        disabled></el-input>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select v-model="parkingInfo.parkingStatus"
                         placeholder="请选择">
                <el-option v-for="item in parkingStatusSelect"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     class="sumbit-btn"
                     @click="modifyParkingInfo">
            提交
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
      title: '车位管理',
      position: '私有车位',
      multipleSelection: [],
      parkingSelect: [
        {
          value: '私有'
        },
        {
          value: '公有'
        }
      ],
      parkingInfo: {},
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
      parkingSearch: {},
      parkingList: [],
      isParking: false,
      parkingStatusSelect: [
        {
          value: '正常',
        }, {
          value: '过期'
        }
      ]
    }
  },
  mounted () {
    this.getAllRegisterParking()
  },
  computed: {
    total () {
      return this.parkingList.length
    },
    currentList () {
      let ret = this.parkingList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 编辑弹窗
    getParkingInfo (row) {
      this.parkingInfo = row
      this.isParking = true
      console.log(row)
    },
    // 关闭弹窗
    closePopUp () {
      this.isParking = false
    },
    // 获取所有私有车位
    getAllRegisterParking () {
      this.$axios.get('/getAllRegisterParking').then(res => {
        if (res.data.state === 200) {
          this.parkingList = res.data.parkingList
          console.log(this.parkingList)
        }
      })
    },
    // 解除登记
    reliveRegister (row) {
      this.$confirm('确定要解除该业主与此车位的登记信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/reliveParking', {
          params: {
            parkingInfo: row
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getAllRegisterParking()
          }
        })
      })
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.column.label === '状态' && row.row.parkingStatus === '正常') {
        return {
          color: 'green',
          'font-weight': '700'
        }
      } else if (row.column.label === '状态' && row.row.parkingStatus === '过期') {
        return {
          color: 'red',
          'font-weight': '700'
        }
      }
    },
    // 编辑车位信息
    modifyParkingInfo () {
      this.$confirm('确定要修改该私有车位信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/modifyRegisterParking', {
          params: {
            parkingInfo: this.parkingInfo
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.isParking = false
            this.getAllRegisterParking()
          }
        })
      })
    },
    // 搜索私有车位
    searchRegisterParking () {
      this.$axios.post('/searchRegisterParking', {
        params: {
          parkingSearch: this.parkingSearch
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.parkingList = res.data.parkingList
        }
      })
    },
    // 清空搜索
    clearUp () {
      this.parkingSearch = {}
    },
    // 导出所有私有车位excel
    exportExcel () {
      let name = new Date().getTime()
      this.$axios.get('/exportParking', { responseType: 'blob' }).then(ret => {
        console.log(new Blob([ret.data]))
        const url = window.URL.createObjectURL(new Blob([ret.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}-车位表.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    // 勾选导出车位
    exportExcelBySelect () {
      let name = new Date().getTime()
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先勾选要导出的数据'
        })
        return
      }
      this.$axios.post('/exportParkingList', {
        params: {
          parkingList: this.multipleSelection
        }
      }, { responseType: 'blob' }).then(ret => {
        console.log(new Blob([ret.data]))
        const url = window.URL.createObjectURL(new Blob([ret.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}-车位表.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.parking-select /deep/ .el-select {
  margin-right: 10px;
}
.parking-select /deep/ .el-form-item {
  float: left;
}
.parking-select {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.parking-container {
  width: 97%;
  margin: 20px;
  min-width: 1204px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .parking-table {
    min-height: 710px;
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
  .parking-info {
    width: 30%;
    height: 55%;
    background-color: #fff;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .parking-info-header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .parking-header-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
        margin-left: 20px;
      }
      .parking-header-close {
        width: 40px;
        height: 40px;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .parking-info-container {
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