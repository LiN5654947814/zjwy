<template>
  <div>
    <header-nav :title="title"
                :titlePath="titlePath"
                :position="position"></header-nav>
    <div class="estate-register">
      <el-form label-width="100px">
        <el-form-item label="所选楼宇">
          <el-input style="width:300px;"
                    v-model="estateInfo.houseBuilds"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="所选单元">
          <el-input style="width:300px;"
                    v-model="estateInfo.houseUnit"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="所选楼层">
          <el-input style="width:300px;"
                    v-model="estateInfo.houseFloor"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="所选房屋门牌">
          <el-input style="width:300px;"
                    v-model="estateInfo.housePlate"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="房屋户型">
          <el-input style="width:300px;"
                    v-model="estateInfo.houseApart"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="房屋面积(m²)">
          <el-input style="width:300px;"
                    v-model="estateInfo.houseArea"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="基础物业费">
          <el-input style="width:300px;"
                    v-model="estateInfo.houseCost"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="装修情况">
          <el-input style="width:300px;"
                    v-model="estateInfo.houseReno"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定业主">
          <el-input style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="迁入日期">
          <el-date-picker type="date"
                          style="width:300px;"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <div class="estate-register-btn">
        <el-button type="primary">登记</el-button>
        <el-button type="danger"
                   @click="goBack">返回</el-button>
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
      title: '房产销售登记',
      titlePath: '/estateApplication',
      position: '房产登记',
      estateInfo: {}
    }
  },
  mounted () {
    this.getEstateInfo()
  },
  methods: {
    getEstateInfo () {
      this.estateInfo = this.$route.query.estateInfo
    },
    goBack () {
      this.$router.push('/estateApplication')
    }
  }
}
</script>

<style lang="scss">
.estate-register /deep/ .el-form-item {
  margin-left: 265px;
  float: left;
}
.estate-register {
  width: 98%;
  margin: 20px;
  padding: 20px 10px 10px 0;
  min-height: 500px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .estate-register-btn {
    left: 50%;
    top: 85%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
}
</style>