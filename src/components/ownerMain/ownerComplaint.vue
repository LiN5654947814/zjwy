<template>
  <div>
    <header-nav :title="title"
                :mainPath="mainPath"></header-nav>
    <div class="owner-complaint-container">
      <div class="complaint-select">
        <div class="complaint-select-item"
             @click="handleSelect(1)"
             :class="[isSelect === 1?'':'is-active']">提交投诉</div>
        <div class="complaint-select-item"
             @click="handleSelect(2)"
             :class="[isSelect === 2?'':'is-active']">我的投诉</div>
        <div class="message-icon"
             v-if="messageNum != 0">{{messageNum}}</div>
      </div>
      <!-- 提交投诉 -->
      <div class="owner-complaint-add"
           v-if="isSelect === 1">
        <el-form label-width="100px">
          <!-- 业主 -->
          <el-form-item label="业主:">
            <el-input style="width:150px;"
                      v-model="complaintRefer.complaintOwner"></el-input>
          </el-form-item>
          <!-- 投诉类型 -->
          <el-form-item label="投诉类型：">
            <el-select v-model="complaintRefer.complaintType"
                       placeholder="请选择">
              <el-option v-for="item in complaintSelect"
                         :key="item.value"
                         :label="item.value"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 投诉日期 -->
          <el-form-item label="报修提交时间:">
            <el-date-picker v-model="complaintRefer.complaintTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- 房屋单位 -->
          <el-form-item label="填写房屋单位:">
            <el-input style="width:150px"
                      v-model="complaintRefer.complaintOwnerUnit">
            </el-input>
            <span style="color:#ccc;font-size:13px;margin-right:10px;"> (x栋x区x层xxx门牌)</span>
            <!-- 联系方式 -->
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input style="width:150px;"
                      v-model="complaintRefer.complaintOwnerPhone"></el-input>
          </el-form-item>
        </el-form>
        <div class="owner-complaint-content">
          <el-input type="textarea"
                    :rows="11"
                    placeholder="请输入内容"
                    v-model="complaintRefer.complaintContent">
          </el-input>
        </div>
        <div class="owner-complaint-btn">
          <el-button type="primary"
                     @click="referOwnerComplaint">
            提交投诉
          </el-button>
        </div>
      </div>
      <!-- 投诉列表 -->
      <div class="owner-complaint-list"
           v-if="isSelect === 2">
        <div class="owner-complaint-table">
          <el-table :data="currentList"
                    style="width: 200%;
                  padding-left:5px;">
            <el-table-column prop="complaintOwner"
                             label="业主"
                             width="250"
                             align="center">
            </el-table-column>
            <el-table-column prop="complaintType"
                             label="投诉类型"
                             width="250"
                             align="center">
            </el-table-column>
            <el-table-column prop="complaintContent"
                             label="内容"
                             width="650"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="complaintTime"
                             label="提交时间"
                             align="center">
            </el-table-column>
            <el-table-column prop="replyState"
                             label="回复状态"
                             align="center">
            </el-table-column>
            <el-table-column prop="readed"
                             label="回复查看"
                             align="center">
            </el-table-column>
            <el-table-column prop="cost"
                             label="操作"
                             align="center"
                             width="200">
              <template slot-scope="scope">
                <el-button type="primary"
                           @click="getComplaintDetail(scope.row)">
                  详情
                </el-button>
                <el-button type="warning"
                           @click="complaintOwnerRead(scope.row)">
                  标记已读
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
    <!-- 投诉详情 -->
    <div class="complaint-detail"
         v-if="isComplaint">
      <div class="complaint-info">
        <div class="complaint-info-header ">
          <div class="complaint-header-title">投诉详情</div>
          <img src="../../assets/icon/close.png"
               class="complaint-header-close"
               @click="closePopUp">
        </div>
        <div class="complaint-info-container">
          <el-form label-width="20%">
            <el-form-item label="投诉时间：">
              <el-input style="width:300px;"
                        v-model="complaintDetail.complaintTime"></el-input>
            </el-form-item>
            <el-form-item label="投诉业主：">
              <el-input style="width:300px;"
                        v-model="complaintDetail.complaintOwner"></el-input>
            </el-form-item>
            <el-form-item label="投诉类型：">
              <el-input style="width:300px;"
                        v-model="complaintDetail.complaintType"></el-input>
            </el-form-item>
            <el-form-item label="投诉内容：">
              <el-input type="textarea"
                        :rows="5"
                        style="margin-bottom:20px;
                        width:300px;"
                        v-model="complaintDetail.complaintContent">
              </el-input>
            </el-form-item>
            <el-form-item label="物业回复：">
              <el-input type="textarea"
                        :rows="5"
                        style="margin-bottom:20px;
                        width:300px;"
                        v-model="complaintDetail.complaintReply">
              </el-input>
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
      title: '投诉管理',
      mainPath: '/ownerApplication',
      isSelect: 1,
      complaintInfo: {},
      textarea: '',
      ownerInfo: {},
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
      filters: {
        page: 0,
        limit: 10
      },
      complaintList: [],
      isComplaint: false,
      complaintDetail: {},
      complaintRefer: {},
      referList: [],
      messageNum: ''
    }
  },
  created () {
    this.ownerInfo = JSON.parse(sessionStorage.getItem('owner'))
    this.getOwnerComplaint()
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
    handleSelect (num) {
      this.isSelect = num
    },
    // 获取业主的投诉信息
    getOwnerComplaint () {
      this.$axios.post('/getOwnerComplaint', {
        params: {
          ownerInfo: this.ownerInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.complaintList = res.data.complaintList
          console.log(this.complaintList)
          this.complaintList.forEach(item => {
            if (item.complaintReply.trim().length !== 0 && item.ownerReadState == false) {
              item.replyState = '已回复'
              item.readed = '未读'
              this.referList.push(item)
            }
            if (item.complaintReply.trim().length === 0) {
              item.replyState = '未回复'
              item.readed = '等待回复'
            }
            if (item.complaintReply.trim().length !== 0 && item.ownerReadState == true) {
              item.replyState = '已回复'
              item.readed = '已读'
            }
          })
          this.messageNum = this.referList.length
        }
      })
    },
    // 查看详情
    getComplaintDetail (row) {
      this.isComplaint = true
      this.complaintDetail = row
    },
    closePopUp () {
      this.isComplaint = false
    },
    // 提交投诉
    referOwnerComplaint () {
      this.complaintRefer.complaintOwnerCard = this.ownerInfo.ownerCard
      this.complaintRefer.readState = false
      this.complaintRefer.ownerReadState = false
      this.$confirm('确定提交投诉信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/referOwnerComplaint', {
          params: {
            complaintRefer: this.complaintRefer
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
          }
          this.getOwnerComplaint()
        })
      })
    },
    // 标注已读
    complaintOwnerRead (row) {
      this.$axios.post('/complaintOwnerRead', {
        params: {
          complaintInfo: row
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.messageNum--
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.owner-complaint-container /deep/ .el-select {
  margin-right: 20px;
}
.owner-complaint-container /deep/ .el-form-item {
  float: left;
  margin-top: 20px;
  margin-right: 10px;
}
.owner-complaint-container {
  width: 100%;
  .complaint-select {
    margin: 10px auto;
    width: 97%;
    height: 40px;
    position: relative;
    .complaint-select-item {
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
    .message-icon {
      width: 20px;
      height: 20px;
      background-color: red;
      color: #fff;
      position: absolute;
      border-radius: 50%;
      text-align: center;
      left: 190px;
      top: 0;
    }
  }
  .owner-complaint-add {
    width: 97%;
    min-height: 400px;
    margin: 0 20px 20px 20px;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    .owner-complaint-content {
      width: 95%;
      margin: 0 auto;
    }
    .owner-complaint-btn {
      margin-top: 10px;
      bottom: 10px;
      right: 30px;
      position: absolute;
    }
  }
  .owner-complaint-list {
    width: 97%;
    min-height: 700px;
    margin: 0 20px 20px 20px;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    .owner-complaint-table {
      min-height: 750px;
    }
    .pagination {
      bottom: 0;
      right: 0;
      position: absolute;
    }
  }
}
.complaint-detail {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .complaint-info {
    width: 25%;
    height: 65%;
    background-color: #fff;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .complaint-info-header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .complaint-header-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
        margin-left: 20px;
      }
      .complaint-header-close {
        width: 40px;
        height: 40px;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .complaint-info-container {
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
.is-active {
  background-color: #cccccc !important;
  color: #fff;
}
</style>