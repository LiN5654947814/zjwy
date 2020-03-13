<template>
  <div>
    <headerNav :title="title"
               :position="position"></headerNav>
    <!-- 搜索 -->
    <div class="parkingApplication-select">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索：</span>
        </el-form-item>
        <el-form-item>
          车位编号：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="keyWrods">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchPakring">
            搜索
          </el-button>
          <el-button type="warning"
                     @click="clearUp">
            清空
          </el-button>
          <el-button type="success"
                     @click="addParking">
            新增
          </el-button>
          <el-button type="danger"
                     @click="deleteParkingList">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="parkingApplication-container">
      <div class="parkingApplication-table">
        <el-table :data="currentList"
                  style="width: 100%;
                  padding-left:5px;"
                  height="710"
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
                        v-model="parkingInfo.parkingNum"></el-input>
            </el-form-item>
            <!-- 车位类型 -->
            <el-form-item label="车位类型:">
              <el-select v-model="parkingInfo.parkingType"
                         placeholder="请选择">
                <el-option v-for="item in parkingTypeSelect"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
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
                        style="width:300px;"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     class="sumbit-btn"
                     @click="parkingRegister">
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
      position: '公有车位',
      multipleSelection: [],
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
      parkingList: [],
      parkingInfo: {},
      keyWrods: '',
      isParking: false,
      parkingTypeSelect: [
        {
          'value': '公有'
        },
        {
          'value': '私有'
        }
      ]
    }
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
  mounted () {
    this.getAllParking()
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    getParkingInfo (row) {
      this.parkingInfo = row
      this.isParking = true
      console.log(row)
    },
    // 新增车位信息
    addParking () {
      this.$router.push('/addParking')
    },
    // 获取所有车位信息
    getAllParking () {
      this.$axios.get('/getAllParking').then(res => {
        if (res.data.state === 200) {
          this.parkingList = res.data.parkingList
        }
      })
    },
    // 关闭弹窗
    closePopUp () {
      this.isParking = false
    },
    // 跳转登记车位信息页面
    toRegister (row) {
      console.log(row)
      row.parkingType = '私有'
      let parkingInfo = JSON.stringify(row)
      this.$router.push({
        name: 'parkingRegister',
        query: {
          parkingInfo: parkingInfo
        }
      })
    },
    // 搜索车位信息
    searchPakring () {
      this.$axios.post('/searchParking', {
        params: {
          keyWrods: this.keyWrods
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.parkingList = res.data.parkingList
        }
      })
    },
    // 清空
    clearUp () {
      this.keyWrods = ''
    },
    // 删除车位信息
    deleteParkingApplication (row) {
      this.$confirm('确定要删除该车位信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteParking', {
          params: {
            parkingInfo: row
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getAllParking()
          }
        })
      })
    },
    // 批量删除
    deleteParkingList () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先勾选要删除的数据'
        })
        return
      }
      let parkingList = this.multipleSelection
      this.$confirm('确定要删除所选的车位信息？', '确定', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteParkingList', {
          params: {
            parkingList: parkingList
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            setTimeout(() => {
              this.getAllParking()
            }, 1000)
          }
        })
      })
    },
    // 导出所有公有车位excel
    exportExcel () {
      let name = new Date().getTime()
      this.$axios.get('/exportPakringApplication', { responseType: 'blob' }).then(ret => {
        console.log(new Blob([ret.data]))
        const url = window.URL.createObjectURL(new Blob([ret.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}-公有车位表.xlsx`)
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
      this.$axios.post('/exportParkingApplicationList', {
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
.parkingApplication-select /deep/ .el-select {
  margin-right: 10px;
}
.parkingApplication-select /deep/ .el-form-item {
  float: left;
}
.parkingApplication-select {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}

.parkingApplication-container {
  width: 97%;
  margin: 20px;
  min-width: 1204px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .parkingApplication-table {
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