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
                    v-model="houseInfo.estateBuilds"></el-input>
        </el-form-item>
        <!-- 单元 -->
        <el-form-item label="单元:">
          <el-input style="width:300px;"
                    v-model="houseInfo.estateUnit"></el-input>
        </el-form-item>
        <!-- 楼层 -->
        <el-form-item label="楼层:">
          <el-input style="width:300px;"
                    v-model="houseInfo.estateFloor"></el-input>
        </el-form-item>
        <!-- 门牌 -->
        <el-form-item label="门牌:">
          <el-input style="width:300px;"
                    v-model="houseInfo.estatePlate"></el-input>
        </el-form-item>
        <!-- 户型 -->
        <el-form-item label="户型:">
          <el-input style="width:300px;"
                    v-model="houseInfo.estateApart"></el-input>
        </el-form-item>
        <!-- 面积 -->
        <el-form-item label="面积(m²):">
          <el-input style="width:300px;"
                    v-model="houseInfo.estateArea"></el-input>
        </el-form-item>
        <!-- 登记状态 -->
        <el-form-item label="登记状态:">
          <el-input style="width:300px;"
                    v-model="houseInfo.estateResgister"
                    disabled></el-input>
        </el-form-item>
        <!-- 装修 -->
        <el-form-item label="是否已装修:">
          <el-select v-model="houseInfo.estateReno"
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
        <el-button type="success"
                   @click="addEstate">
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
      houseInfo: {
        estateResgister: '未登记'
      },
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
    // 新增未登记房产
    addEstate () {
      this.$axios.post('/addEstate', {
        params: {
          estateBuilds: this.houseInfo.estateBuilds,
          estateUnit: this.houseInfo.estateUnit,
          estateFloor: this.houseInfo.estateFloor,
          estatePlate: this.houseInfo.estatePlate,
          estateApart: this.houseInfo.estateApart,
          estateArea: this.houseInfo.estateArea,
          estateReno: this.houseInfo.estateReno,
          estateResgister: this.houseInfo.estateResgister,
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(() => {
            this.$router.push({ name: 'estateApplication' })
          }, 2000)
        } else if (res.data.state === 401) {
          this.$message({
            type: 'error',
            message: res.data.message
          })
          return
        }
      })
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