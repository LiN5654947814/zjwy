<template>
  <div>
    <header-nav :title="title"></header-nav>
    <!-- 公告栏 -->
    <div class="ownerApplication-bulletin">
      <div class="bulletin-title">
        公告栏信息
      </div>
      <div class="bulletin-content">
        <ul>
          <li class="bulletin-item"
              v-for="item in currentList"
              :key="item.id"
              @click="getBulletinDetails(item.id)">
            <div class="bulletin-item-text">{{item.noticeContent}}</div>
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
    <!-- 个人信息 -->
    <div class="ownerApplicaiton-info">
      <div class="ownerApplicaiton-info-header">个人信息
        <div class="color-btn"
             @click="passwordModify">
          修改登录密码
        </div>
      </div>
      <div class="ownerApplicaiton-info-container">
        <el-form label-width="30%">
          <el-form-item label="姓名:">
            {{ownerInfo.ownerName}}
          </el-form-item>
          <el-form-item label="联系电话:">
            {{ownerInfo.ownerPhone}}
          </el-form-item>
          <el-form-item label="居住单位:">
            {{ownerInfo.ownerUnit}}
          </el-form-item>
          <el-form-item label="车位拥有量:">
            {{ownerInfo.ownerParking}}
          </el-form-item>
          <el-form-item label="迁入时间:">
            {{ownerInfo.moveDate}}
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 收费详情 -->
    <div class="ownerApplication-pay">
      <div class="ownerApplication-pay-title">
        物业费详情
      </div>
      <div class="ownerApplication-pay-table">
        <el-table :data="ownerPay"
                  style="width: 200%;
                  padding-left:5px;">
          <el-table-column prop="payElevator"
                           label="电梯使用费"
                           align="center">
          </el-table-column>
          <el-table-column prop="payGarbage"
                           label="垃圾清运费"
                           align="center">
          </el-table-column>
          <el-table-column prop="payLighting"
                           label="公摊照明费"
                           align="center">
          </el-table-column>
          <el-table-column prop="payDate"
                           label="缴费月"
                           align="center">
          </el-table-column>
          <el-table-column prop="payState"
                           label="状态"
                           align="center">
          </el-table-column>
          <el-table-column prop="payCount"
                           label="合计"
                           align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 弹窗提示 -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <span>业主您好，请您尽快到物业管理中心处缴清当月的物业管理费，谢谢合作(若已缴请无视)——————————{{dialogDate | dateFormat}}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false,receiveCalling()">确 定</el-button>
      </span>
    </el-dialog>
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
      title: '首页',
      bulletinList: [],
      filters: {
        page: 0,
        limit: 7
      },
      ownerInfo: {},
      ownerPay: [],
      dialogVisible: false,
      dialogDate: ''
    }
  },
  created () {
    this.getOwner()
    this.getPayMessage()
    this.getAllNotice()
    this.getPayListInfo()
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
    passwordModify () {
      this.$router.push('/ownerPasswordModify')
    },
    // 进来先判断是否有缴费信息
    getPayMessage () {
      let ownerInfo = JSON.parse(sessionStorage.getItem('owner'))
      let y = new Date().getFullYear()
      let m = new Date().getMonth() + 1
      m = m < 10 ? '0' + m : m
      ownerInfo.payDate = y + '-' + m
      this.$axios.post('/getOnwerPay', {
        params: {
          ownerInfo: ownerInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          let pay = res.data.pay
          if (pay.payCalling === true) {
            this.dialogVisible = true
            this.dialogDate = pay.updatedAt
          }
        }
      })
    },
    // 获取业主信息
    getOwner () {
      let ownerInfo = JSON.parse(sessionStorage.getItem('owner'))
      this.$axios.post('getOwner', {
        params: {
          ownerInfo: ownerInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          let owner = {}
          owner = res.data.owner
          owner.ownerUnit = owner.estates[0].estateBuilds + '-' + owner.estates[0].estateUnit + '-' + owner.estates[0].estatePlate
          owner.ownerParking = owner.parkings.length
          owner.moveDate = owner.estates[0].ownerMoveDate
          this.ownerInfo = owner
        }
      })
    },
    // 获取所有公告信息
    getAllNotice () {
      this.$axios.get('/getAllNotice').then(res => {
        if (res.data.state === 200) {
          this.bulletinList = res.data.noticeList
        }
      })
    },
    // 根据公告id获取公告页面
    getBulletinDetails (id) {
      this.$router.push('/ownerNotice/' + id)
    },
    // 获取缴费信息
    getPayListInfo () {
      let ownerInfo = JSON.parse(sessionStorage.getItem('owner'))
      let paySearch = {}
      let y = new Date().getFullYear()
      let m = new Date().getMonth() + 1
      m = m < 10 ? '0' + m : m
      paySearch.payDate = y + '-' + m
      paySearch.payOwner = ownerInfo.ownerName
      this.$axios.post('/searchPay', {
        params: {
          paySearch: paySearch
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.ownerPay = res.data.payList
          this.ownerPay[0].payCount = this.ownerPay[0].payGarbage + this.ownerPay[0].payElevator + this.ownerPay[0].payLighting
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 确定接收信息，刷新催缴状态
    receiveCalling () {
      let ownerInfo = JSON.parse(sessionStorage.getItem('owner'))
      let y = new Date().getFullYear()
      let m = new Date().getMonth() + 1
      m = m < 10 ? '0' + m : m
      ownerInfo.payDate = y + '-' + m
      this.$axios.post('/receiveCalling', {
        params: {
          ownerInfo: ownerInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0px;
}
.ownerApplication-bulletin {
  float: left;
  width: 65%;
  margin-left: 20px;
  margin-top: 20px;
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
.ownerApplicaiton-info {
  float: left;
  width: 30%;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .ownerApplicaiton-info-header {
    height: 50px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
    text-align: left;
    border-bottom: 1px solid #ccc;
    .color-btn {
      float: right;
      color: #fff;
      width: 100px;
      height: 30px;
      margin: 10px;
      font-size: 15px;
      text-align: center;
      line-height: 30px;
      border-radius: 10px;
      background: rgb(33, 190, 28);
      cursor: pointer;
    }
  }
  .ownerApplicaiton-info-container {
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    min-height: 240px;
    margin: 10px 0 0 10px;
  }
}
.ownerApplication-pay {
  float: left;
  margin: 0 0 0 20px;
  width: 96%;
  height: 150px;
  border-radius: 5px;
  background-color: #fff;
  .ownerApplication-pay-title {
    height: 50px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
}
</style>