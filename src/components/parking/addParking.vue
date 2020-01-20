<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="addParking-container">
      <el-form label-width="30%">
        <!-- 车位编号 -->
        <el-form-item label="车位编号:">
          <el-input style="width:300px;"
                    v-model="parkingInfo.parkingNum"></el-input>
        </el-form-item>
        <!-- 车位类型 -->
        <el-form-item label="车位类型:">
          <el-input style="width:300px;"
                    v-model="parkingInfo.parkingType"></el-input>
        </el-form-item>
        <!-- 车位位置 -->
        <el-form-item label="车位位置:">
          <el-input style="width:300px;"
                    v-model="parkingInfo.parkingLocation"></el-input>
        </el-form-item>
        <!-- 车位租赁开始时间 -->
        <el-form-item label="车位租赁开始时间:">
          <el-date-picker v-model="parkingInfo.parkingStartTime"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
        <!-- 车位租赁结束时间 -->
        <el-form-item label="车位租赁结束时间:">
          <el-date-picker v-model="parkingInfo.parkingEndTime"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!-- 所属业主 -->
        <el-form-item label="所属业主:">
          <el-input v-model="parkingInfo.parkingOwner"
                    style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     @click="goBack">返回</el-button>
          <el-button type="success">新增</el-button>
        </el-form-item>
      </el-form>
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
      title: '新增车位信息',
      parkingInfo: []
    }
  },
  methods: {
    goBack () {
      this.$router.push('/parking')
    }
  }
}
</script>

<style lang="scss" scoped>
.addParking-container {
  width: 96%;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 300px;
  position: relative;
}
</style>