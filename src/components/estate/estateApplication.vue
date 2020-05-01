<template>
  <div>
    <header-nav :title="title"></header-nav>
    <!-- 房产搜索 -->
    <div class="estate-application-select">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索当前未售房产:</span>
        </el-form-item>
        <el-form-item>
          楼宇：<el-select v-model="houseInfo.houseBuilds"
                     placeholder="请选择"
                     style="width:100px;">
            <el-option v-for="item in buildSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          单元：<el-select v-model="houseInfo.houseUnit"
                     placeholder="请选择"
                     style="width:100px;">
            <el-option v-for="item in unitSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          楼层：<el-select v-model="houseInfo.houseFloor"
                     placeholder="请选择"
                     style="width:100px;">
            <el-option v-for="item in floorSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          户型：<el-select v-model="houseInfo.houseApart"
                     placeholder="请选择"
                     style="width:150px;">
            <el-option v-for="item in houseApartSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchEstateApplication">
            搜索
          </el-button>
          <el-button type="warning"
                     @click="clearSearch">
            清空
          </el-button>
          <el-button type="success"
                     @click="addEstateApplication">
            新增
          </el-button>
          <el-button type="danger"
                     @click="deleteEstateApplicationList">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 房产表 -->
    <div class="estate-application-container">
      <div class="estate-application-table">
        <el-table :data="currentList"
                  height="710"
                  style="width: 100%;
                  padding-left:5px;"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="estateBuilds"
                           label="楼宇"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="estateUnit"
                           label="单元"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="estateFloor"
                           label="楼层"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="estatePlate"
                           label="门牌"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="estateApart"
                           label="户型"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="estateArea"
                           label="面积(m²)"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="estateReno"
                           label="装修"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作"
                           width="300"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="estateApplicationModify(scope.row)">
                编辑
              </el-button>
              <el-button type="danger"
                         @click="deleteEstateApplication(scope.row)">
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
    <!-- 编辑房产弹窗 -->
    <div class="popUpbox"
         v-if="isEstate">
      <div class="estateApplication-info">
        <div class="estateApplication-info-header">
          <div class="estateApplication-header-title">
            编辑房产信息
          </div>
          <img src="../../assets/icon/close.png"
               class="estateApplication-header-close"
               @click="closePopUp">
        </div>
        <div class="estateApplication-info-container">
          <el-form label-width="20%">
            <!-- 楼宇 -->
            <el-form-item label="楼宇:">
              <el-select v-model="estateInfo.estateBuilds"
                         placeholder="请选择">
                <el-option v-for="item in buildSelect"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 单元 -->
            <el-form-item label="单元:">
              <el-select v-model="estateInfo.estateUnit"
                         placeholder="请选择">
                <el-option v-for="item in unitSelect"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 楼层 -->
            <el-form-item label="楼层:">
              <el-select v-model="estateInfo.estateFloor"
                         placeholder="请选择">
                <el-option v-for="item in floorSelect"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 门牌 -->
            <el-form-item label="门牌:">
              <el-input style="width:300px;"
                        v-model="estateInfo.estatePlate"></el-input>
            </el-form-item>
            <!-- 户型 -->
            <el-form-item label="户型:">
              <el-input style="width:300px;"
                        v-model="estateInfo.estateApart"></el-input>
            </el-form-item>
            <!-- 面积 -->
            <el-form-item label="面积(m²):">
              <el-input style="width:300px;"
                        v-model="estateInfo.estateArea"></el-input>
            </el-form-item>
            <!-- 装修 -->
            <el-form-item label="是否已装修:">
              <el-select v-model="estateInfo.estateReno"
                         placeholder="请选择">
                <el-option v-for="item in houseRenoSelect"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     class="sumbit-btn"
                     @click="modifyEstateApplication">
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
      multipleSelection: [],
      title: '房产登记',
      // 房产信息
      houseInfo: {},
      // 未售房产
      houseList: [],
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
      // 楼宇选择器
      buildSelect: [
        {
          value: 'A栋'
        },
        {
          value: 'B栋'
        },
        {
          value: 'C栋'
        }
      ],
      // 单元选择器
      unitSelect: [
        {
          value: 'A区'
        },
        {
          value: 'B区'
        },
        {
          value: 'C区'
        },
        {
          value: 'D区'
        }
      ],
      // 户型
      houseApartSelect: [
        {
          id: '01',
          value: '两房一厅'
        },
        {
          id: '02',
          value: '三房一厅'
        }
      ],
      // 楼层
      floorSelect: [],
      // 弹窗
      isEstate: false,
      // 编辑房产信息
      estateInfo: {},
      // 物业费编辑
      housePropCostList: [],
      houseRenoSelect: [
        {
          value: '已装修'
        },
        {
          value: '未装修'
        }
      ]
    }
  },
  computed: {
    total () {
      return this.houseList.length
    },
    currentList () {
      let ret = this.houseList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  mounted () {
    this.getAllUnSaleEstate()
    this.mountedFloor()
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 渲染楼层数
    mountedFloor () {
      for (let i = 1; i <= 15; i++) {
        this.floorSelect.push({ value: i })
      }
    },
    // 单元选择器联动
    getUnitSelect (value) {
    },
    // 获取所有未销售房产
    getAllUnSaleEstate () {
      this.$axios.get('/getAllUnSaleEstate').then(res => {
        if (res.data.state === 200) {
          this.houseList = res.data.estate
        }
      })
    },
    // 登记房产页面跳转
    toRegister (row) {
      let estateInfo = JSON.stringify(row)
      this.$router.push({
        path: '/estateRegister',
        query: {
          estateInfo: estateInfo
        }
      })
    },
    // 新增房产信息
    addEstateApplication () {
      this.$router.push('/estate/addEstateApplication')
    },
    // 编辑房产信息
    estateApplicationModify (row) {
      this.isEstate = true
      this.estateInfo = row
    },
    // 提交保存编辑的信息
    modifyEstateApplication () {
      this.$confirm('确定要修改该业主信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/modifyEstateApplication', {
          params: {
            estateInfo: this.estateInfo
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.isEstate = false
            this.getAllUnSaleEstate()
          } else if (res.data.state === 401) {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      })
    },
    closePopUp () {
      this.isEstate = false
      this.getAllUnSaleEstate()
    },
    // 搜索未登记房产信息
    searchEstateApplication () {
      this.$axios.post('/searchEstateApplication', {
        params: {
          houseInfo: this.houseInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.houseList = res.data.estates
        }
      })
    },
    // 清空搜索
    clearSearch () {
      this.houseInfo = []
    },
    // 删除单个未登记房产信息
    deleteEstateApplication (row) {
      this.$confirm('确定要删除该房产信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteEstateApplication', {
          params: {
            estateId: row.id
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getAllUnSaleEstate()
          }
        })
      })
    },
    // 批量删除
    deleteEstateApplicationList () {
      let estateList = []
      estateList = this.multipleSelection
      if (estateList.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先勾选所选数据'
        })
      } else {
        this.$confirm('确定要删除多条房产信息？', '提示', {
          confirmButtonText: '确定',
          canceButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/deleteEstateApplicationList', {
            params: {
              estateList: estateList
            }
          }).then(res => {
            if (res.data.state === 200) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              setTimeout(() => {
                this.getAllUnSaleEstate()
              }, 500)
            }
          })
        })
      }
    },
    // 导出excel
    exportExcel () {
      let name = new Date().getTime()
      this.$axios.get('/exportUnRegisterEstateExcel', { responseType: 'blob' }).then(ret => {
        console.log(new Blob([ret.data]))
        const url = window.URL.createObjectURL(new Blob([ret.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}-未登记房产表.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    // 勾选导出
    exportExcelBySelect () {
      let name = new Date().getTime()
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先勾选要导出的数据'
        })
      }
      this.$axios.post('/exportUnRegisterEstateExcelList', {
        params: {
          exportList: this.multipleSelection
        }
      }, { responseType: 'blob' }).then(ret => {
        console.log(new Blob([ret.data]))
        const url = window.URL.createObjectURL(new Blob([ret.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}-未登记房产表.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }
}
</script>

<style lang="scss">
.estate-application-select /deep/ .el-select {
  margin-right: 10px;
  line-height: 40px;
}
.estate-application-select /deep/ .el-form-item {
  float: left;
}
.estate-application-select {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.estate-application-container {
  width: 97%;
  margin: 20px;
  min-width: 1204px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .estate-application-header {
    width: 98%;
    height: 30px;
    font-size: 17px;
    font-weight: 700;
    line-height: 30px;
    margin-left: 10px;
    border-bottom: 1px solid #ccc;
  }
  .estate-application-table {
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
  .estateApplication-info {
    width: 30%;
    height: 75%;
    background-color: #fff;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .estateApplication-info-header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .estateApplication-header-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
        margin-left: 20px;
      }
      .estateApplication-header-close {
        width: 40px;
        height: 40px;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .estateApplication-info-container {
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

