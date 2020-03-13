<template>
  <div>
    <header-nav></header-nav>
    <!-- 头部 车位使用量 保修统计量 收款统计量 -->
    <div class="admin-header">
      <div class="admin-box"
           v-for="item in headerTab"
           :key="item.id">
        <div class="admin-box-header">
          <div class="box-title">{{item.title}}
            <div class="color-box"
                 :style="{'background-color':item.color}"
                 @click="goDetail(item.pathName)">
              详情
            </div>
          </div>
        </div>
        <div class="admin-box-content">
          <div class="box-content">{{item.useData}}</div>
          <div class="admin-box-content-tip">
            {{item.tips}}:{{item.unUseData}}
          </div>
          <img :src="item.icon"
               class="box-icon">
        </div>
      </div>
    </div>
    <div class="admin-container">
      <!-- 中部 公告栏列表 -->
      <bulletin></bulletin>
      <!-- 欠费栏 -->
      <arrears></arrears>
    </div>
    <histogram></histogram>
  </div>
</template>

<script>
import headerNav from '../headerNav'
import bulletin from './bulletin'
import arrears from './arrears'
import histogram from './histogram'

export default {
  components: {
    headerNav,
    bulletin,
    arrears,
    histogram
  },
  data () {
    return {
      headerTab: [
        {
          id: '1',
          title: '业主总量',
          color: '#1f79c2',
          tips: '未迁入',
          useData: '',
          unUseData: '',
          icon: require('../../assets/icon/owner.png'),
          pathName: 'owner'
        },
        {
          id: '2',
          title: '房产总量',
          color: '#1CC0C4',
          tips: '未登记',
          useData: '',
          unUseData: '',
          icon: require('../../assets/icon/house.png'),
          pathName: 'estate'
        },
        {
          id: '3',
          title: '报修统计量',
          color: '#E44B59',
          tips: '未修理',
          useData: '16',
          unUseData: '200',
          icon: require('../../assets/icon/wrench.png'),
          pathName: 'fix'
        }, {
          id: '4',
          title: '车位使用量',
          color: '#11AC89',
          tips: '未停放',
          useData: '13',
          unUseData: '200',
          icon: require('../../assets/icon/parking.png'),
          pathName: 'parking'
        }
      ],
      title: '',
      // 业主总量
      ownerCount: [],
      // 业主未迁入量
      ownerUnMoveCount: [],
      // 房产总量
      estateCount: [],
      // 房产未登记量
      estateUnCount: [],
      // 报修总量
      fixCount: [],
      // 报修未完成量
      fixUnCount: [],
      // 车位总量
      parkingCount: [],
      // 未登记车位量
      parkingUnCount: []
    }
  },
  mounted () {
    this.getAllOwnerNum()
    this.getAllEstateApplication()
    this.getAllFix()
    this.getAllParking()
  },
  methods: {
    // 获取所有业主信息
    getAllOwnerNum () {
      this.$axios.get('/getAllOwner').then(res => {
        if (res.data.state === 200) {
          this.ownerCount = res.data.owners
          this.ownerCount.forEach(item => {
            if (item.estates.length == 0) {
              if (item.author == false) {
                this.ownerUnMoveCount.push(item)
              }
            }
          })
          this.headerTab[0].useData = this.ownerCount.length
          this.headerTab[0].unUseData = this.ownerUnMoveCount.length
        }
      })
    },
    // 获取房产信息
    getAllEstateApplication () {
      this.$axios.get('/getAllEstate').then(res => {
        if (res.data.state === 200) {
          this.estateCount = res.data.estateList
          this.estateCount.forEach(item => {
            if (item.estateResgister === '未登记') {
              this.estateUnCount.push(item)
            }
          })
        }
        this.headerTab[1].useData = this.estateCount.length
        this.headerTab[1].unUseData = this.estateUnCount.length
      })
    },
    // 获取报修信息
    getAllFix () {
      this.$axios.get('/getAllFix').then(res => {
        if (res.data.state === 200) {
          this.fixCount = res.data.fixList
          this.fixCount.forEach(item => {
            if (item.fixState === '未完成') {
              this.fixUnCount.push(item)
            }
          })
        }
        this.headerTab[2].useData = this.fixCount.length
        this.headerTab[2].unUseData = this.fixUnCount.length
      })
    },
    // 获取所有车位信息
    getAllParking () {
      this.$axios.get('/getAllParking').then(res => {
        if (res.data.state === 200) {
          this.parkingCount = res.data.parkingList
          this.parkingCount.forEach(item => {
            if (item.parkingType === '公有') {
              this.parkingUnCount.push(item)
            }
          })
          this.headerTab[3].useData = this.parkingCount.length
          this.headerTab[3].unUseData = this.parkingUnCount.length
        }
      })
    },
    // 详情跳转
    goDetail (name) {
      this.$router.push({ name: name })
    }
  }

}
</script>

<style lang="scss" scoped>
.admin-header {
  display: flex;
  height: 220px;
  justify-content: center;
  .admin-box {
    flex: 1;
    min-width: 285px;
    height: 170px;
    margin: 20px;
    border-radius: 5px;
    background-color: #fff;
    .admin-box-header {
      height: 40px;
      text-align: left;
      border-bottom: 1px solid #ccc;
      .box-title {
        font-size: 18px;
        font-weight: 700;
        height: 100%;
        line-height: 25px;
        margin: 10px 0 0 10px;
        .color-box {
          float: right;
          font-weight: 500;
          font-size: 15px;
          width: 70px;
          height: 25px;
          margin-right: 30px;
          color: #fff;
          text-align: center;
          line-height: 25px;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
    .admin-box-content {
      width: 100%;
      height: 150px;
      position: relative;
      .box-content {
        float: left;
        margin: 20px 30px 30px 30px;
        font-size: 50px;
        color: red;
      }
      .box-icon {
        width: 80px;
        height: 80px;
        right: 20px;
        top: 40%;
        transform: translate(0, -50%);
        position: absolute;
      }
      .admin-box-content-tip {
        width: 100%;
        font-weight: 700;
        color: #ccc;
        bottom: 45px;
        left: 25px;
        position: absolute;
        text-align: left;
      }
    }
  }
}
.admin-container {
  width: 100%;
  min-width: 1024px;
  min-height: 300px;
}
</style>