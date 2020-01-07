<template>
  <div>
    <!-- 公告栏 -->
    <div class="bulletin">
      <div class="bulletin-title">
        公告栏信息
        <div class="bulletin-color-box"
             @click="toBulletinList">
          编辑
        </div>
      </div>
      <div class="bulletin-content">
        <ul>
          <li class="bulletin-item"
              v-for="item in currentList"
              :key="item.id"
              @click="getBulletinDetails(item.id)">
            <div class="bulletin-item-text">{{item.content}}</div>
            <div class="bulletin-date">{{item.date}}</div>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination small
                       layout="prev, pager, next"
                       :current-page.sync="filters.page"
                       :page-size="filters.limit"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bulletinList: [
        {
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
        }
      ],
      filters: {
        page: 0,
        limit: 7
      },
      isModify: false
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
    bulletinModify () {
      this.isModify = true
    },
    getBulletinDetails (id) {
      this.$router.push('/bulletinDetails/' + id)
    },
    // 公告栏编辑页
    toBulletinList () {
      this.$router.push('/bulletinModify')
    }
  }
}
</script>


<style lang="scss">
.bulletin {
  float: left;
  width: 60%;
  margin-left: 20px;
  height: 300px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  .bulletin-title {
    width: 99%;
    height: 50px;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
    .bulletin-color-box {
      float: right;
      width: 70px;
      height: 25px;
      margin: 15px;
      font-size: 15px;
      line-height: 25px;
      font-weight: 400;
      text-align: center;
      color: #fff;
      border-radius: 5px;
      background-color: #ffd700;
      cursor: pointer;
    }
  }
  .bulletin-content {
    width: 98%;
    height: 220px;
    overflow: hidden;
    .bulletin-item {
      width: 100%;
      margin-bottom: 5px;
      font-size: 19px;
      cursor: pointer;
      .bulletin-item-text {
        float: left;
        max-width: 600px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .bulletin-date {
        float: right;
        margin-right: 5px;
        font-size: 15px;
      }
    }
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
</style>
