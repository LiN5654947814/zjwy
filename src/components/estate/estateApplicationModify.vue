<template>
  <div>
    <header-nav :title="title"
                :position="position">
    </header-nav>
    <div class="estateApplication-modify">
      <div class="popUp">
        <div class="estateApplication-modify-container">
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
            <!-- 物业费结算 -->
            <el-form-item label="物业费:">
              <span style="font-size:17px;
                       font-weight:700;">{{housePropCost}}</span>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="housePropCostList.clean"
                           @change="cleanUp()">清洁卫生费用——70</el-checkbox>
              <el-checkbox v-model="housePropCostList.ecology"
                           @change="ecologyUp()">绿化养护费用——50</el-checkbox>
              <el-checkbox v-model="housePropCostList.order"
                           @change="orderUp()">秩序维护费用——100</el-checkbox>
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
      position: '编辑房产信息',
      estateInfo: '',
    }
  },
  mounted () {
    this.getEstateInfo()
  },
  methods: {
    getEstateInfo () {
      this.estateInfo = this.$route.query.estateInfo
    }
  }
}
</script>

<style lang="scss">
.popUp {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .estateApplication-modify-container {
    width: 96%;
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
    background-color: #fff;
    min-height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .sumbit-btn {
      position: absolute;
      right: 30%;
      bottom: 10%;
    }
  }
}
</style>