<template>
  <div>
    <header-nav :title="title"
                :titlePath="titlePath"
                :position="position"></header-nav>
    <div class="addEstate-container">
      <el-form label-width="20%">
        <!-- 楼宇 -->
        <el-form-item label="楼宇:">
          <el-input style="width:300px;"
                    v-model="houseInfo.houseBuilds"></el-input>
        </el-form-item>
        <!-- 单元 -->
        <el-form-item label="单元:">
          <el-input style="width:300px;"
                    v-model="houseInfo.houseUnit"></el-input>
        </el-form-item>
        <!-- 楼层 -->
        <el-form-item label="楼层:">
          <el-input style="width:300px;"
                    v-model="houseInfo.houseArea"></el-input>
        </el-form-item>
        <!-- 户型 -->
        <el-form-item label="户型:">
          <el-select v-model="houseInfo.houseApart"
                     placeholder="请选择">
            <el-option v-for="item in houseApartSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 面积 -->
        <el-form-item label="面积(m²):">
          <el-input style="width:300px;"
                    v-model="houseInfo.houseArea"></el-input>
        </el-form-item>
        <!-- 装修 -->
        <el-form-item label="是否已装修:">
          <el-select v-model="houseInfo.houseReno"
                     placeholder="请选择">
            <el-option v-for="item in houseRenoSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="sumbit-btn">
        <el-button type="success">
          新增
        </el-button>
        <el-button type="danger"
                   @click="goBack">
          返回
        </el-button>
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
      title: '房产登记',
      titlePath: '/estateApplication',
      position: '新增房产信息',
      houseInfo: {},
      houseSaleSelect: [
        {
          value: '已销售'
        },
        {
          value: '未销售'
        }
      ],
      houseApartSelect: [
        {
          value: '两房一厅'
        },
        {
          value: '三房一厅'
        },
        {
          value: '四房一厅'
        }
      ],
      // 物业费
      housePropCost: 0,
      // 物业费选择
      housePropCostList: [],
      // 装修
      houseRenoSelect: [
        {
          value: '已装修'
        },
        {
          value: '未装修'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.push('/estateApplication')
    },
    cleanUp () {
      if (this.housePropCostList.clean === true) {
        this.housePropCost = this.housePropCost + 70
      }
      if (this.housePropCostList.clean === false) {
        this.housePropCost = this.housePropCost - 70
      }
    },
    ecologyUp () {
      if (this.housePropCostList.ecology === true) {
        this.housePropCost = this.housePropCost + 50
      }
      if (this.housePropCostList.ecology === false) {
        this.housePropCost = this.housePropCost - 50
      }
    },
    orderUp () {
      if (this.housePropCostList.order === true) {
        this.housePropCost = this.housePropCost + 100
      }
      if (this.housePropCostList.order === false) {
        this.housePropCost = this.housePropCost - 100
      }
    }
  }

}
</script>

<style lang="scss">
.addEstate-container {
  width: 96%;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 300px;
  position: relative;
  .sumbit-btn {
    position: absolute;
    right: 30%;
    bottom: 10%;
  }
}
</style>