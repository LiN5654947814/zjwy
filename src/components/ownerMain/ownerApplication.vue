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
          <el-table-column prop="payStartTime"
                           label="续费时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="payEndTime"
                           label="到期时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="payState"
                           label="状态"
                           align="center">
          </el-table-column>
          <el-table-column prop="payState"
                           label="合计"
                           align="center">
          </el-table-column>
        </el-table>
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
      title: '首页',
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
      ownerInfo: {},
      ownerPay: [
        {
          id: '001',
          payOwner: '孙笑川',
          payGarbage: '50',
          payElevator: '50',
          payLighting: '50',
          payState: '正常',
          payStartTime: '2020-01-01',
          payEndTime: '2020-01-31'
        }
      ]
    }
  },
  created () {
    this.getOwner()
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
  width: 60%;
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
  width: 35%;
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