<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="estate-select">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索：</span>
        </el-form-item>
        <el-form-item>
          楼宇：<el-select v-model="searchInfo.estateBuilds"
                     placeholder="请选择">
            <el-option v-for="item in buildSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          单元：<el-select v-model="searchInfo.estateUnit"
                     placeholder="请选择">
            <el-option v-for="item in unitSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          门牌号：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="searchInfo.estatePlate">
          </el-input>
        </el-form-item>
        <el-form-item>
          业主名：<el-input style="width:150px;
                                    margin-right:10px;"
                    v-model="searchInfo.estateOwner">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchRegisterEstate">
            搜索
          </el-button>
          <el-button type="warning"
                     @click="clearSearch">
            清空
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="estate-container">
      <div class="estate-table">
        <el-table :data="currentList"
                  style="width: 100%;
                  padding-left:5px;"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="estateBuilds"
                           label="楼宇"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="estateUnit"
                           label="单元"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="estateFloor"
                           label="楼层"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="estatePlate"
                           label="门牌"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="estateArea"
                           label="面积(m²)"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="estateOwner"
                           label="业主"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerMoveDate"
                           label="迁入时间"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getownerInfo(scope.row)">
                查看
              </el-button>
              <el-button type="danger"
                         @click="reliveRegister(scope.row)">
                解除登记
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
    <!-- 编辑弹窗 -->
    <div class="popUpbox"
         v-if="isEstate">
      <div class="estate-info">
        <div class="estate-info-header">
          <div class="estate-header-title">
            查看房产登记信息
          </div>
          <img src="../../assets/icon/close.png"
               class="estate-header-close"
               @click="closePopUp">
        </div>
        <div class="estate-info-container">
          <el-form label-width="40%">
            <!-- 楼宇 -->
            <el-form-item label="楼宇:">
              {{houseInfo.estateBuilds}}
            </el-form-item>
            <!-- 单元 -->
            <el-form-item label="单元:">
              {{houseInfo.estateUnit}}
            </el-form-item>
            <!-- 房态 -->
            <el-form-item label="房态:">
              {{houseInfo.estateResgister}}
            </el-form-item>
            <!-- 户型 -->
            <el-form-item label="户型:">
              {{houseInfo.estateApart}}
            </el-form-item>
            <!-- 面积 -->
            <el-form-item label="面积(m²):">
              {{houseInfo.estateArea}}
            </el-form-item>
            <!-- 所属业主 -->
            <el-form-item label="所属业主:">
              {{houseInfo.estateOwner}}
            </el-form-item>
            <!-- 联系方式 -->
            <el-form-item label="备注:">
              {{houseInfo.estateContent}}
            </el-form-item>
          </el-form>
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
      title: '房产管理',
      // 房产信息
      houseInfo: {},
      houseList: [],
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
      // 搜索对象
      searchInfo: {},
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
      // 显示弹窗信息
      isEstate: false
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
    this.getRegisterEstate()
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 清空按钮
    clearSearch () {
      this.searchInfo = {}
      this.getRegisterEstate()
    },
    // 新增房产信息
    addEstate () {
      this.$router.push('/estate/addEstate')
    },
    // 编辑/查看房产信息
    getownerInfo (row) {
      this.isEstate = true
      this.houseInfo = row
    },
    // 关闭窗口
    closePopUp () {
      this.isEstate = false
      this.houseInfo = {}
    },
    // 获取已登记的房产信息
    getRegisterEstate () {
      this.$axios.get('/getAllRegisterEstate').then(res => {
        if (res.data.state === 200) {
          this.houseList = res.data.estate
          console.log(this.houseList)
        }
      })
    },
    // 解除绑定
    reliveRegister (estateInfo) {
      this.$confirm('确定要解除此业主与此房产的登记？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('reliveRegister', {
          params: {
            estateInfo: estateInfo
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getRegisterEstate()
          } else {
            this.$message({
              type: 'error',
              message: res.data.state
            })
          }
        })
      })
    },
    // 搜索已登记的房产信息
    searchRegisterEstate () {
      this.$axios.post('/searchRegisterApplication', {
        params: {
          searchInfo: this.searchInfo
        }
      }).then(res => {
        if (res.data.state == 200) {
          this.houseList = res.data.estates
        }
      })
    }
  }
}
</script>

<style lang="scss">
.estate-select /deep/ .el-select {
  margin-right: 10px;
}
.estate-select /deep/ .el-form-item {
  float: left;
}

.estate-select {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.estate-container {
  width: 98%;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .estate-table {
    min-height: 750px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
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
  .estate-info {
    width: 25%;
    height: 65%;
    background-color: #fff;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .estate-info-header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .estate-header-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
        margin-left: 20px;
      }
      .estate-header-close {
        width: 40px;
        height: 40px;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .estate-info-container {
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