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
          楼宇：<el-select v-model="houseInfo.houseBuilds"
                     placeholder="请选择"
                     @change="getUnitSelect">
            <el-option v-for="item in houseSelect"
                       :key="item.id"
                       :label="item.label"
                       :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          单元：<el-select v-model="houseInfo.houseUnit"
                     placeholder="请选择">
            <el-option v-for="item in houseUnitSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
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
          <el-table-column prop="houseBuilds"
                           label="楼宇"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseUnit"
                           label="单元"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseFloor"
                           label="楼层"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="housePlate"
                           label="门牌"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseArea"
                           label="面积(m²)"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseOwner"
                           label="业主"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseCost"
                           label="管理费"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="moveDate"
                           label="迁入时间"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getownerInfo(scope.row)">
                编辑
              </el-button>
              <el-button type="danger">
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
    <!-- 编辑弹窗 -->
    <div class="popUpbox"
         v-if="isEstate">
      <div class="estate-info">
        <div class="estate-info-header">
          <div class="estate-header-title">
            查看房产信息
          </div>
          <img src="../../assets/icon/close.png"
               class="estate-header-close"
               @click="closePopUp">
        </div>
        <div class="estate-info-container">
          <el-form label-width="40%">
            <!-- 楼宇 -->
            <el-form-item label="楼宇:">
              {{houseInfo.houseBuilds}}
            </el-form-item>
            <!-- 单元 -->
            <el-form-item label="单元:">
              {{houseInfo.houseUnit}}
            </el-form-item>
            <!-- 房态 -->
            <el-form-item label="房态:">
              {{houseInfo.houseSale}}
            </el-form-item>
            <!-- 户型 -->
            <el-form-item label="户型:">
              {{houseInfo.houseApart}}
            </el-form-item>
            <!-- 面积 -->
            <el-form-item label="面积(m²):">
              {{houseInfo.houseArea}}
            </el-form-item>
            <!-- 所属业主 -->
            <el-form-item label="所属业主:">
              {{houseInfo.houseOwner}}
            </el-form-item>
            <!-- 每月管理费 -->
            <el-form-item label="管理费:">
              {{houseInfo.houseCost}}
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
      title: '房产管理',
      // 房产信息
      houseInfo: {},
      houseList: [
        {
          id: '01',
          houseBuilds: 'A栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '101',
          houseSale: '已销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '孙笑川',
          houseCost: '500',
          moveDate: '2019-12-31'

        }, {
          id: '02',
          houseBuilds: 'A栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '102',
          houseSale: '已销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '李赣',
          houseCost: '500',
          moveDate: '2019-12-31'
        }, {
          id: '03',
          houseBuilds: 'A栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '103',
          houseSale: '已销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '梁志斌',
          houseCost: '500',
          moveDate: '2019-12-31'
        }, {
          id: '04',
          houseBuilds: 'B栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '101',
          houseSale: '已销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '深海鱼',
          houseCost: '500',
          moveDate: '2019-12-31'
        }, {
          id: '05',
          houseBuilds: 'B栋',
          houseUnit: 'B',
          houseFloor: '2',
          housePlate: '201',
          houseSale: '已销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '许昊龙',
          houseCost: '500',
          moveDate: '2019-12-31'
        }, {
          id: '06',
          houseBuilds: 'B栋',
          houseUnit: 'A',
          houseFloor: '2',
          housePlate: '202',
          houseSale: '未销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '',
          houseCost: '0',
          moveDate: '2019-12-31'
        }, {
          id: '07',
          houseBuilds: 'B栋',
          houseUnit: 'B',
          houseFloor: '1',
          housePlate: '104',
          houseSale: '未销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '',
          houseCost: '0',
          moveDate: '2019-12-31'
        }, {
          id: '08',
          houseBuilds: 'C栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '105',
          houseSale: '已销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '韩金龙',
          houseCost: '500',
          moveDate: '2019-12-31'
        }, {
          id: '09',
          houseBuilds: 'C栋',
          houseUnit: 'B',
          houseFloor: '3',
          housePlate: '301',
          houseSale: '未销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '',
          houseCost: '0',
          moveDate: '2019-12-31'
        }, {
          id: '10',
          houseBuilds: 'C栋',
          houseUnit: 'B',
          houseFloor: '1',
          housePlate: '101',
          houseSale: '未销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '',
          houseCost: '500',
          moveDate: '2019-12-31'
        }, {
          id: '11',
          houseBuilds: 'C栋',
          houseUnit: 'A',
          houseFloor: '4',
          housePlate: '401',
          houseSale: '未销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '',
          houseCost: '500',
          moveDate: '2019-12-31'
        }, {
          id: '12',
          houseBuilds: 'C栋',
          houseUnit: 'B',
          houseFloor: '1',
          housePlate: '101',
          houseSale: '未销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '',
          houseCost: '500',
          moveDate: '2019-12-31'
        }, {
          id: '13',
          houseBuilds: 'C栋',
          houseUnit: 'A',
          houseFloor: '2',
          housePlate: '203',
          houseSale: '未销售',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '',
          houseCost: '500',
          moveDate: '2019-12-31'
        }
      ],
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
      // 楼宇选择器
      houseSelect: [
        {
          id: '01',
          label: 'A栋',
          children: [
            {
              value: 'A'
            }, {
              value: 'B'
            },
            {
              value: 'C'
            }
          ]
        },
        {
          id: '02',
          label: 'B栋',
          children: [
            {
              value: 'A'
            },
            {
              value: 'B'
            },
            {
              value: 'C'
            },
            {
              value: 'D'
            }
          ]
        },
        {
          id: '03',
          label: 'C栋',
          children: [
            {
              value: 'A'
            },
            {
              value: 'B'
            },
            {
              value: 'C'
            },
            {
              value: 'D'
            },
            {
              value: '105'
            },
            {
              value: '201'
            },
            {
              value: '202'
            }
          ]
        }
      ],
      // 单元选择器
      houseUnitSelect: [],
      // 房态
      houseSaleSelect: [
        {
          id: '01',
          value: '未销售'
        }, {
          id: '01',
          value: '已销售'
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
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 单元选择器联动
    getUnitSelect (value) {
      let result = []
      this.houseSelect.forEach(item => {
        if (item.label === this.houseInfo.houseBuilds) {
          result = item.children
        }
      })
      this.houseUnitSelect = result
      this.houseInfo = Object.assign({}, this.houseInfo, { houseBuilds: value, houseUnit: '' })
    },
    // 清空按钮
    clearSearch () {
      this.houseInfo = {}
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