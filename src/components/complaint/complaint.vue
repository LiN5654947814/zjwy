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
                    v-model="complaintInfo.complaintOwner">
          </el-input>
        </el-form-item>
        <!-- 投诉类型 -->
        <el-form-item>
          投诉类型：<el-select v-model="complaintInfo.complaintType"
                     placeholder="请选择">
            <el-option v-for="item in complaintSelect"
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
                  padding-left:5px;">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="complaintTime"
                           label="投诉日期"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="complaintType"
                           label="投诉类型"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="complaintContent"
                           label="投诉内容"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="complaintOwner"
                           label="投诉业主"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="complainOwnerUnit"
                           label="所在单元"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary">
                详情
              </el-button>
              <el-button type="success"
                         @click="toReply(scope.row)">
                回复
              </el-button>
              <el-button type="danger"
                         @click="deleteParkingApplication(scope.row)">
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
    // 获取所有投诉信息
    getAllComplaint () {
      this.$axios.get('/getAllComplaint').then(res => {
        if (res.data.state === 200) {
          this.complaintList = res.data.complaintList
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
    }
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
</style>