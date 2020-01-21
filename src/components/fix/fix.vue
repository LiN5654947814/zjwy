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
          报修状态：<el-select v-model="fixInfo.houseUnit"
                     placeholder="请选择">
            <el-option v-for="item in fixStateSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          报修提交时间： <el-date-picker v-model="fixInfo.fixTime"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
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
          <el-button type="warning">
            清空
          </el-button>
          <el-button type="success">
            新增
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
                  :show-overflow-tooltip="true">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="fixTime"
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
          <el-table-column prop="fixType"
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
      title: "报修管理",
      fixInfo: [],
      fixStateSelect: [
        {
          value: '已完成'
        },
        {
          value: '未完成'
        }
      ],
      fixList: [
        {
          fixId: '001',
          fixTime: '2020-01-21',
          fixEndTime: '',
          fixContent: '厕所淤堵',
          fixOwner: '孙笑川',
          fixType: '未修理'
        },
        {
          fixId: '002',
          fixTime: '2020-01-21',
          fixEndTime: '',
          fixContent: '厕所淤堵',
          fixOwner: '孙笑川',
          fixType: '未修理'
        },
        {
          fixId: '003',
          fixTime: '2020-01-21',
          fixEndTime: '',
          fixContent: '厕所淤堵',
          fixOwner: '孙笑川',
          fixType: '未修理'
        },
        {
          fixId: '004',
          fixTime: '2020-01-21',
          fixEndTime: '',
          fixContent: '厕所淤堵',
          fixOwner: '孙笑川',
          fixType: '未修理'
        },
        {
          fixId: '005',
          fixTime: '2020-01-21',
          fixEndTime: '',
          fixContent: '厕所淤堵',
          fixOwner: '孙笑川',
          fixType: '未修理'
        },
        {
          fixId: '006',
          fixTime: '2020-01-21',
          fixEndTime: '',
          fixContent: '厕所淤堵',
          fixOwner: '孙笑川',
          fixType: '未修理'
        },
        {
          fixId: '007',
          fixTime: '2020-01-21',
          fixEndTime: '',
          fixContent: '厕所淤堵',
          fixOwner: '孙笑川',
          fixType: '未修理'
        }
      ],
      // 报修信息
      fixDetail: {},
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
    }
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
      this.$router.push({
        path: '/fixDetail',
        query: {
          fixDetail: row
        }
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