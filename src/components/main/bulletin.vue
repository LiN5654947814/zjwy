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
            <div class="bulletin-item-text">{{item.noticeTitle}}</div>
            <div class="bulletin-date">{{item.noticeTime | dateFormat}}</div>
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
      bulletinList: [],
      filters: {
        page: 0,
        limit: 7
      },
      isModify: false
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
    bulletinModify () {
      this.isModify = true
    },
    getBulletinDetails (id) {
      this.$router.push('/bulletinDetails/' + id)
    },
    // 公告栏编辑页
    toBulletinList () {
      this.$router.push({ path: '/bulletinModify' })
    },
    // 获取所有公告信息
    getAllNotice () {
      this.$axios.get('/getAllNotice').then(res => {
        if (res.data.state === 200) {
          this.bulletinList = res.data.noticeList
        }
      })
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
