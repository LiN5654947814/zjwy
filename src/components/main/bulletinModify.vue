<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="bulletin-list">
      <div class="bulletin-list-container">
        <el-table :data="currentList"
                  style="width: 100%">
          <el-table-column prop="date"
                           label="日期"
                           width="180">
          </el-table-column>
          <el-table-column prop="content"
                           label="内容"
                           width="1200">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getBulletin(scope.row)">
                编辑
              </el-button>
              <el-button type="danger"
                         @click="getBulletin(scope.row)">
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
      </div>
    </div>
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
        <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="textarea">
        </el-input>
        <div class="bulletin-modify-btn">
          <el-button type="primary"
                     size="mini"
                     v-show="isModify">
            修改并保存
          </el-button>
          <el-button type="success"
                     size="mini"
                     v-show="isAdd">
            新增
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
      title: '公告编辑页',
      bulletinList: [{
        id: 1,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 2,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 3,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 4,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 5,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 6,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 7,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 8,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 9,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 10,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 11,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }, {
        id: 12,
        date: '2019-12-31',
        content: '严禁高空抛物的通知,好！近日，小区业主多次到物管服务中心反应，经常有楼上业户向楼下扔烟头和其它杂物，业户非常担心因楼上扔杂物危害他人的人身安全。高空抛物不仅是不文明的行为，还会造成许多安全隐患，对他人的人身安全也造成了极大的威胁，严重的高空抛物还要追究刑事责任。'
      }],
      filters: {
        page: 0,
        limit: 10
      },
      isModify: false,
      isTextarea: false,
      isAdd: false,
      textarea: '',
    }
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
    getBulletin (e) {
      this.isTextarea = true
      this.isModify = true
      this.textarea = e.content
      console.log(e)
    },
    // 关闭
    closeModify () {
      this.isTextarea = false
      this.isModify = false
      this.isAdd = false
    },
    // 新增
    bulletinAdd () {
      this.textarea = ''
      this.isTextarea = true
      this.isAdd = true
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
    height: 705px;
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
    min-height: 350px;
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
    .bulletin-modify-btn {
      right: 30px;
      position: absolute;
    }
  }
}
</style>