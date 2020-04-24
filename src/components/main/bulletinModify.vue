<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="bulletin-list">
      <div class="bulletin-list-container">
        <el-table :data="currentList"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column label="日期"
                           width="100">
            <template slot-scope="scope">
              <p>{{scope.row.noticeTime|dateFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="noticeTitle"
                           label="标题"
                           width="200"
                           :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="noticeContent"
                           label="内容"
                           width="700"
                           :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="cost"
                           width="200"
                           label="操作">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getBulletin(scope.row)">
                编辑
              </el-button>
              <el-button type="danger"
                         @click="deleteNotice(scope.row)">
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
      <div class="bulletin-add-btn">
        <el-button type="success"
                   size="mini"
                   @click="bulletinAdd">
          新增
        </el-button>
        <el-button type="danger"
                   size="mini"
                   @click="deleteNoticeList">
          批量删除
        </el-button>
      </div>
    </div>
    <!-- 修改 -->
    <div class="bulletin-modify"
         v-show="isTextarea">
      <div class="bulletin-modify-content">
        <div class="bulletin-modify-header">
          <div class="bulletin-modify-title">
            编辑公告
          </div>
          <img src="../../assets/icon/close.png"
               class="modify-close"
               @click="closeModify">
        </div>
        <div class="bullentin-input">
          <el-input placeholder="请输入标题"
                    style="margin:10px 0 0 20px;
                         width:96%;"
                    v-model="bulletinInfo.noticeTitle"></el-input>
          <!-- <el-input type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="bulletinInfo.noticeContent"
                    style="margin-bottom: 10px;">
          </el-input> -->
          <div class="tinymce-content">
            <tinymce-editor v-model="bulletinInfo.noticeContent"></tinymce-editor>
          </div>
        </div>
        <div class="bulletin-modify-btn">
          <el-button type="primary"
                     size="mini"
                     @click="modifyNotice">
            修改并保存
          </el-button>
        </div>
      </div>
    </div>
    <!-- 新增 -->
    <div class="bulletin-modify"
         v-show="isAdd">
      <div class="bulletin-modify-content">
        <div class="bulletin-modify-header">
          <div class="bulletin-modify-title">
            新增公告
          </div>
          <img src="../../assets/icon/close.png"
               class="modify-close"
               @click="closeModify">
        </div>
        <div class="bullentin-input">
          <el-input placeholder="请输入100字以内的标题"
                    style="margin:10px 0 0 20px;
                         width:96%;"
                    v-model="addBulletinNotice.noticeTitle"></el-input>
          <div class="tinymce-content">
            <tinymce-editor v-model="addBulletinNotice.noticeContent"></tinymce-editor>
          </div>
          <!-- <el-input type="textarea"
                    :rows="2"
                    placeholder="请输入小于500字的内容"
                    v-model="addBulletinNotice.noticeContent"
                    style="margin-bottom: 10px;">
          </el-input> -->
        </div>
        <div class="bulletin-modify-btn">
          <el-button type="primary"
                     size="mini"
                     @click="addNotice">
            添加
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerNav from '../headerNav'
import tinymceEditor from '../tinymceComponent/tinymce'
export default {
  components: {
    headerNav,
    tinymceEditor
  },
  data () {
    return {
      title: '公告编辑页',
      bulletinList: [],
      bulletinInfo: {
        noticeTitle: '',
        noticeContent: ''
      },
      addBulletinNotice: {
        noticeTitle: '',
        noticeContent: ''
      },
      filters: {
        page: 0,
        limit: 10
      },
      isTextarea: false,
      isAdd: false,
      textarea: '',
      multipleSelection: []
    }
  },
  mounted () {
    this.getAllNotice()
  },
  computed: {
    total () {
      return this.bulletinList.length
    },
    currentList () {
      let ret = this.bulletinList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    getBulletin (row) {
      this.isTextarea = true
      this.bulletinInfo = row
    },
    // 关闭
    closeModify () {
      this.isAdd = false
      this.isTextarea = false
      this.getAllNotice()
    },
    // 新增
    bulletinAdd () {
      this.isAdd = true
    },
    cell () {
      return 'cell-style'
    },
    // 获取所有公告信息
    getAllNotice () {
      this.$axios.get('/getAllNotice').then(res => {
        if (res.data.state === 200) {
          this.bulletinList = res.data.noticeList
        }
      })
    },
    // 修改公告信息
    modifyNotice () {
      let noticeInfo = this.bulletinInfo
      noticeInfo.noticeTime = new Date()
      if (this.bulletinInfo.noticeTitle.trim().length === 0) {
        this.$message({
          type: 'error',
          message: '公告标题不能为空'
        })
      } else if (this.bulletinInfo.noticeContent.trim().length === 0) {
        this.$message({
          type: 'error',
          message: '公告内容不能为空'
        })
      }
      else if (this.bulletinInfo.noticeTitle.trim().length > 100) {
        this.$message({
          type: 'error',
          message: '标题不可超过100字'
        })
      } else {
        this.$confirm('确定要修改公告信息？', '提示', {
          confirmButtonText: '确定',
          canceButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/modifyNotice', {
            params: {
              noticeInfo: noticeInfo
            }
          }).then(res => {
            if (res.data.state === 200) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
            }
          })
        })
      }
    },
    // 新增公告信息
    addNotice () {
      this.addBulletinNotice.noticeTime = new Date()
      if (this.addBulletinNotice.noticeTitle.trim().length === 0) {
        this.$message({
          type: 'error',
          message: '公告标题不能为空'
        })
      } else if (this.addBulletinNotice.noticeContent.trim().length === 0) {
        this.$message({
          type: 'error',
          message: '公告内容不能为空'
        })
      }
      else if (this.addBulletinNotice.noticeTitle.trim().length > 100) {
        this.$message({
          type: 'error',
          message: '标题不可超过100字'
        })
      }
      else {
        this.$axios.post('/addNotice', {
          params: {
            addBulletinNotice: this.addBulletinNotice
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
          }
          this.addBulletinNotice = {
            noticeTitle: '',
            noticeContent: ''
          }
          this.isAdd = false
          this.getAllNotice()
        })
      }
    },
    // 删除公告信息
    deleteNotice (row) {
      this.$confirm('确定要删除该条公告信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteNoticeById', {
          params: {
            noticeId: row.id
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            setTimeout(() => {
              this.getAllNotice()
            }, 1000)
          }
        })
      })
    },
    // 批量删除公告信息
    deleteNoticeList () {
      this.$confirm('确定要删除' + this.multipleSelection.length + '条公告信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteNoticeList', {
          params: {
            noticeList: this.multipleSelection
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            setTimeout(() => {
              this.getAllNotice()
            }, 1000)
          }
        })
      })
    }
  }
}
</script>


<style lang="scss">
.bulletin-modify /deep/ .el-textarea {
  margin: 20px !important;
  width: 95%;
}
.bulletin-modify /deep/ .el-textarea__inner {
  height: 230px;
}

.bulletin-list {
  width: 98%;
  height: 750px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .bulletin-list-container {
    width: 100%;
    height: 700px;
    overflow: hidden;
    margin-bottom: 5px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
  }
  .bulletin-add-btn {
    margin: 0 0 10px 10px;
    bottom: 0;
    left: 0;
    position: absolute;
  }
}
.bulletin-modify {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99;
  .bulletin-modify-content {
    width: 50%;
    min-height: 500px;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: #fff;
    .bulletin-modify-header {
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .bulletin-modify-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 40px;
        margin-left: 20px;
      }
      .modify-close {
        width: 30px;
        height: 30px;
        right: 5px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .bullentin-input {
      margin-bottom: 25px;
      .tinymce-content {
        margin: 20px 20px 35px 20px;
      }
    }
    .bulletin-modify-btn {
      bottom: 10px;
      right: 30px;
      position: absolute;
    }
  }
}
.text-num {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>