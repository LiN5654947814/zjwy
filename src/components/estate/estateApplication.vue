<template>
  <div>
    <header-nav :title="title"></header-nav>
    <!-- 房产表 -->
    <div class="estate-application-select">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索当前未售房产：</span>
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
          楼层：<el-select v-model="houseInfo.houseFloor"
                     placeholder="请选择">
            <el-option v-for="item in houseUnitSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          户型：<el-select v-model="houseInfo.houseApart"
                     placeholder="请选择">
            <el-option v-for="item in houseApartSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            搜索
          </el-button>
          <el-button type="warning">
            清空
          </el-button>
          <el-button type="success">
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="estate-application-container">
      <div class="estate-application-table">
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
          <el-table-column prop="houseApart"
                           label="户型"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseArea"
                           label="面积(m²)"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseCost"
                           label="物业费用"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseReno"
                           label="装修"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary">
                编辑
              </el-button>
              <el-button type="danger">
                删除
              </el-button>
              <el-button type="success">
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
      title: '房产登记',
      // 房产信息
      houseInfo: {},
      // 未售房产
      houseList: [
        {
          id: '01',
          houseBuilds: 'A栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '101',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '02',
          houseBuilds: 'A栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '102',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '03',
          houseBuilds: 'A栋',
          houseUnit: 'B',
          houseFloor: '1',
          housePlate: '101',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '04',
          houseBuilds: 'A栋',
          houseUnit: 'B',
          houseFloor: '2',
          housePlate: '201',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '05',
          houseBuilds: 'A栋',
          houseUnit: 'B',
          houseFloor: '2',
          housePlate: '201',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '06',
          houseBuilds: 'B栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '101',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '07',
          houseBuilds: 'B栋',
          houseUnit: 'A',
          houseFloor: '1',
          housePlate: '102',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '08',
          houseBuilds: 'B栋',
          houseUnit: 'B',
          houseFloor: '1',
          housePlate: '101',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '09',
          houseBuilds: 'B栋',
          houseUnit: 'B',
          houseFloor: '2',
          housePlate: '201',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '10',
          houseBuilds: 'B栋',
          houseUnit: 'C',
          houseFloor: '1',
          housePlate: '101',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '11',
          houseBuilds: 'B栋',
          houseUnit: 'C',
          houseFloor: '1',
          housePlate: '102',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
        },
        {
          id: '12',
          houseBuilds: 'C栋',
          houseUnit: 'C',
          houseFloor: '2',
          housePlate: '201',
          houseApart: '三房一厅',
          houseArea: '102',
          houseCost: '500',
          moveDate: '2019-12-31',
          houseReno: '已装修'
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
    min-height: 750px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
</style>

