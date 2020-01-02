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
                 :style="{'background-color':item.color}">
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
      headerTab: [{
        id: '1',
        title: '业主登记量',
        color: '#1f79c2',
        tips: '未迁入',
        useData: '11',
        unUseData: '10',
        icon: require('../../assets/icon/owner.png')
      },
      {
        id: '2',
        title: '房屋销售量',
        color: '#1CC0C4',
        tips: '未出售',
        useData: '14',
        unUseData: '5',
        icon: require('../../assets/icon/house.png')
      },
      {
        id: '3',
        title: '报修统计量',
        color: '#E44B59',
        tips: '未修理',
        useData: '16',
        unUseData: '200',
        icon: require('../../assets/icon/wrench.png')
      }, {
        id: '4',
        title: '车位使用量',
        color: '#11AC89',
        tips: '未停放',
        useData: '13',
        unUseData: '200',
        icon: require('../../assets/icon/parking.png')
      }],
      title: ''
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
    min-width: 390px;
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