<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="estate-container">
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
            房态：<el-select v-model="houseInfo.sale"
                       placeholder="请选择">
              <el-option v-for="item in houseSaleSelect"
                         :key="item.value"
                         :label="item.value"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            户型：<el-select v-model="houseInfo.apart"
                       placeholder="请选择">
              <el-option v-for="item in houseApartSelect"
                         :key="item.id"
                         :label="item.value"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary">
          搜索
        </el-button>
        <el-button type="warning">
          清空
        </el-button>
        <el-button type="success">
          新增
        </el-button>
      </div>
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
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseUnit"
                           label="单元"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseSale"
                           label="房态"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseApart"
                           label="户型"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseArea"
                           label="面积(m²)"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作">
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
      title: '房产列表',
      // 房产信息
      houseInfo: {},
      houseList: [
        {
          id: '01',
          houseBuilds: 'A栋',
          houseUnit: '101',
          houseSale: 'true',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '孙笑川'
        }, {
          id: '02',
          houseBuilds: 'A栋',
          houseUnit: '102',
          houseSale: 'true',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '李赣'
        }, {
          id: '03',
          houseBuilds: 'A栋',
          houseUnit: '103',
          houseSale: 'true',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '梁志斌'
        }, {
          id: '04',
          houseBuilds: 'B栋',
          houseUnit: '101',
          houseSale: 'true',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '深海鱼'
        }, {
          id: '05',
          houseBuilds: 'B栋',
          houseUnit: '102',
          houseSale: 'true',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '许昊龙'
        }, {
          id: '06',
          houseBuilds: 'B栋',
          houseUnit: '103',
          houseSale: 'false',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: ''
        }, {
          id: '07',
          houseBuilds: 'B栋',
          houseUnit: '104',
          houseSale: 'false',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: ''
        }, {
          id: '08',
          houseBuilds: 'C栋',
          houseUnit: '101',
          houseSale: 'true',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: '韩金龙'
        }, {
          id: '09',
          houseBuilds: 'C栋',
          houseUnit: '102',
          houseSale: 'false',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: ''
        }, {
          id: '10',
          houseBuilds: 'C栋',
          houseUnit: '103',
          houseSale: 'false',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: ''
        }, {
          id: '11',
          houseBuilds: 'C栋',
          houseUnit: '104',
          houseSale: 'false',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: ''
        }, {
          id: '12',
          houseBuilds: 'C栋',
          houseUnit: '201',
          houseSale: 'false',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: ''
        }, {
          id: '13',
          houseBuilds: 'C栋',
          houseUnit: '202',
          houseSale: 'false',
          houseApart: '三房一厅',
          houseArea: '102',
          houseOwner: ''
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
              value: '101'
            }, {
              value: '102'
            },
            {
              value: '103'
            }
          ]
        },
        {
          id: '02',
          label: 'B栋',
          children: [
            {
              value: '101'
            },
            {
              value: '102'
            },
            {
              value: '103'
            },
            {
              value: '104'
            }
          ]
        },
        {
          id: '03',
          label: 'C栋',
          children: [
            {
              value: '101'
            },
            {
              value: '102'
            },
            {
              value: '103'
            },
            {
              value: '104'
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
      ]
    }
  },
  computed: {
    total () {
      return this.houseList.length
    },
    currentList () {
      this.houseList.forEach(item => {
        if (item.houseSale === 'true') {
          item.houseSale = '已销售'
        } else if (item.houseSale === 'false') {
          item.houseSale = '未销售'
        }
      })
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
    }
  }
}
</script>

<style lang="scss">
.estate-container /deep/ .el-select {
  margin-right: 10px;
}
.estate-container /deep/ .el-form-item {
  float: left;
}

.estate-container {
  width: 98%;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .estate-select {
    width: 100%;
    padding: 20px;
    height: 50px;
  }
  .estate-table {
    min-height: 750px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
</style>