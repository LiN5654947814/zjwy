<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="owner-fix-container">
      <div class="fix-select">
        <div class="fix-select-item"
             @click="handleSelect(1)"
             :class="[isSelect === 1?'':'is-active']">提交报修</div>
        <div class="fix-select-item"
             @click="handleSelect(2),getAllOwnerFix()"
             :class="[isSelect === 2?'':'is-active']">我的报修</div>
      </div>
      <!-- 提交报修 -->
      <div class="owner-fix-add"
           v-if="isSelect === 1">
        <el-form label-width="100px">
          <!-- 业主 -->
          <el-form-item label="业主:">
            <el-input style="width:200px;"
                      v-model="fixInfo.fixOwner"></el-input>
          </el-form-item>
          <!-- 报修时间 -->
          <el-form-item label="报修提交时间:">
            <el-date-picker v-model="fixInfo.fixStartTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- 房屋单位 -->
          <el-form-item label="填写房屋单位:">
            <el-input style="width:180px"
                      v-model="fixInfo.fixOwnerUnit">
            </el-input>
            <span style="color:#ccc;font-size:13px;margin-right:10px;"> (x栋-x区-xxx门牌)</span>
          </el-form-item>
          <!-- 联系方式 -->
          <el-form-item label="联系手机号:">
            <el-input style="width:200px;"
                      v-model="fixInfo.fixOwnerPhone"></el-input>
          </el-form-item>
        </el-form>
        <div class="owner-fix-content">
          <el-input type="textarea"
                    :rows="11"
                    placeholder="请输入内容"
                    v-model="fixInfo.fixContent">
          </el-input>
        </div>
        <div class="owner-fix-btn">
          <el-button type="primary"
                     @click="getOwnerFix">
            提交报修
          </el-button>
        </div>
      </div>
      <!-- 报修列表 -->
      <div class="owner-fix-list"
           v-if="isSelect === 2">
        <div class="owner-fix-table">
          <el-table :data="currentList"
                    style="width: 200%;
                  padding-left:5px;">
            <el-table-column prop="fixOwner"
                             label="业主"
                             width="250"
                             align="center">
            </el-table-column>
            <el-table-column prop="fixContent"
                             label="内容"
                             width="750"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="fixStartTime"
                             label="提交时间"
                             align="center">
            </el-table-column>
            <el-table-column prop="fixState"
                             label="状态"
                             align="center">
            </el-table-column>
            <el-table-column prop="fixEndTime"
                             label="完成时间"
                             align="center">
            </el-table-column>
            <el-table-column prop="cost"
                             label="操作">
              <template slot-scope="scope">
                <el-button type="primary"
                           @click="getFixDetail(scope.row)">
                  详情
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
      <!-- 查看详情 -->
      <div class="fix-detail"
           v-if="isfix">
        <div class="fix-info">
          <div class="fix-info-header ">
            <div class="fix-header-title">投诉详情</div>
            <img src="../../assets/icon/close.png"
                 class="fix-header-close"
                 @click="closeDetail">
          </div>
          <div class="fix-info-container">
            <el-form label-width="40%">
              <el-form-item label="投诉时间：">
                <el-input style="width:300px;"
                          v-model="fixDetail.fixStartTime"></el-input>
              </el-form-item>
              <el-form-item label="投诉业主：">
                <el-input style="width:300px;"
                          v-model="fixDetail.fixOwner"></el-input>
              </el-form-item>
              <el-form-item label="投诉内容：">
                <el-input type="textarea"
                          :rows="5"
                          style="margin-bottom:20px;
                        width:300px;"
                          v-model="fixDetail.fixContent">
                </el-input>
              </el-form-item>
              <el-form-item label="维修状态">
                <el-input v-model="fixDetail.fixState"
                          style="width:300px;">
                </el-input>
              </el-form-item>
              <el-form-item label="完成时间">
                <el-input v-model="fixDetail.fixEndTime"
                          style="width:300px;">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
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
      title: '报修提交',
      isSelect: 1,
      fixInfo: {},
      textarea: '',
      ownerFixList: [],
      filters: {
        page: 0,
        limit: 10
      },
      ownerInfo: {},
      isfix: false,
      fixDetail: {}
    }
  },
  mounted () {
    this.ownerInfo = JSON.parse(sessionStorage.getItem('owner'))
  },
  computed: {
    total () {
      return this.ownerFixList.length
    },
    currentList () {
      let ret = this.ownerFixList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  methods: {
    handleSelect (num) {
      this.isSelect = num
      console.log(this.isSelect)
    },
    // 获取业主所有报修信息
    getAllOwnerFix () {
      console.log(this.ownerInfo)
      this.$axios.post('/getOwnerFix', {
        params: {
          ownerInfo: this.ownerInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.ownerFixList = res.data.ownerFixList
        }
      })
    },
    // 提交报修
    getOwnerFix () {
      console.log(this.ownerInfo)
      this.$confirm('确定要提交报修信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/referOwnerFix', {
          params: {
            fixInfo: this.fixInfo
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.fixInfo = {}
          }
        })
      })
    },
    // 查看详情
    getFixDetail (row) {
      this.fixDetail = row
      this.isfix = true
    },
    // 关闭弹窗
    closeDetail () {
      this.isfix = false
    }
  }
}
</script>

<style lang="scss" scoped>
.owner-fix-container /deep/ .el-select {
  margin-right: 50px;
}
.owner-fix-container /deep/ .el-form-item {
  float: left;
  margin-top: 20px;
  margin-right: 80px;
}
.owner-fix-container {
  width: 100%;
  .fix-select {
    margin: 10px auto;
    width: 97%;
    height: 40px;
    .fix-select-item {
      float: left;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      background-color: #fff;
      list-style: none;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .owner-fix-add {
    width: 97%;
    min-height: 400px;
    margin: 0 20px 20px 20px;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    .owner-fix-content {
      width: 95%;
      margin: 0 auto;
    }
    .owner-fix-btn {
      margin-top: 10px;
      bottom: 10px;
      right: 30px;
      position: absolute;
    }
  }
  .owner-fix-list {
    width: 97%;
    min-height: 700px;
    margin: 0 20px 20px 20px;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    .owner-fix-table {
      min-height: 750px;
    }
    .pagination {
      bottom: 0;
      right: 0;
      position: absolute;
    }
  }
  .fix-detail {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;
    .fix-info {
      width: 25%;
      height: 65%;
      background-color: #fff;
      border-radius: 5px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      .fix-info-header {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #ccc;
        position: relative;
        .fix-header-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 50px;
          margin-left: 20px;
        }
        .fix-header-close {
          width: 40px;
          height: 40px;
          right: 10px;
          top: 50%;
          transform: translate(0, -50%);
          position: absolute;
          cursor: pointer;
        }
      }
      .fix-info-container {
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
}
.is-active {
  background-color: #cccccc !important;
  color: #fff;
}
</style>