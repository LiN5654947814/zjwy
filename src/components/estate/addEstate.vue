<template>
  <div>
    <header-nav :title="title"
                :titlePath="titlePath"
                :position="position"></header-nav>
    <div class="addEstate-container">
      <el-form label-width="20%">
        <!-- 楼宇 -->
        <el-form-item label="楼宇:">
          <el-select v-model="houseInfo.estateBuilds"
                     placeholder="请选择">
            <el-option v-for="item in buildSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 单元 -->
        <el-form-item label="单元:">
          <el-select v-model="houseInfo.estateUnit"
                     placeholder="请选择">
            <el-option v-for="item in unitSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 楼层 -->
        <el-form-item label="楼层:">
          <el-select v-model="houseInfo.estateFloor"
                     placeholder="请选择">
            <el-option v-for="item in floorSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 门牌 -->
        <el-form-item label="门牌:">
          <el-input style="width:300px;"
                    v-model="houseInfo.estatePlate"></el-input>
        </el-form-item>
        <!-- 户型 -->
        <el-form-item label="户型:">
          <el-select v-model="houseInfo.estateApart"
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
      // 楼宇
      buildSelect: [
        {
          value: 'A栋'
        },
        {
          value: 'B栋'
        },
        {
          value: 'C栋'
        }
      ],
      // 单元
      unitSelect: [
        {
          value: 'A区'
        },
        {
          value: 'B区'
        },
        {
          value: 'C区'
        },
        {
          value: 'D区'
        }
      ],
      // 楼层
      floorSelect: [],
      // 户型
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
  mounted () {
    this.mountedFloor()
  },
  methods: {
    goBack () {
      this.$router.push('/estateApplication')
    },
    // 渲染楼层数
    mountedFloor () {
      for (let i = 1; i <= 15; i++) {
        this.floorSelect.push({ value: i })
      }
    },
    // 新增未登记房产
    addEstate () {
      let estate = {
        estateBuilds: this.houseInfo.estateBuilds,
        estateUnit: this.houseInfo.estateUnit,
        estateFloor: this.houseInfo.estateFloor,
        estatePlate: this.houseInfo.estatePlate,
        estateApart: this.houseInfo.estateApart,
        estateArea: this.houseInfo.estateArea,
        estateReno: this.houseInfo.estateReno,
        estateResgister: this.houseInfo.estateResgister,
      }
      this.$axios.post('/addEstate', {
        params: {
          estateInfo: estate
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