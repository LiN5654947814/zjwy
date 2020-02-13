<template>
  <div>
    <header-nav :title="title"
                :position="position"></header-nav>
    <div class="parking-register">
      <el-form label-width="30%">
        <!-- 车位编号 -->
        <el-form-item label="车位编号:">
          <el-input style="width:300px;"
                    v-model="parkingInfo.parkingNum"
                    disabled></el-input>
        </el-form-item>
        <!-- 车位类型 -->
        <el-form-item label="车位类型:">
          <el-select v-model="parkingInfo.parkingType"
                     placeholder="请选择"
                     disabled>
            <el-option v-for="item in parkingTypeSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 车位租赁开始时间 -->
        <el-form-item label="车位租赁开始时间:">
          <el-date-picker v-model="parkingInfo.parkingStartTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
        <!-- 车位租赁结束时间 -->
        <el-form-item label="车位租赁结束时间:">
          <el-date-picker v-model="parkingInfo.parkingEndTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!-- 所属业主 -->
        <el-form-item label="所属业主:">
          <el-input v-model="parkingInfo.parkingOwner"
                    style="width:300px;"></el-input>
        </el-form-item>
        <!-- 业主身份证 -->
        <el-form-item label="业主身份证:">
          <el-input v-model="parkingInfo.parkingOwnerCard"
                    style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <div class="parking-btn">
        <el-button type="danger"
                   @click="goBack">
          返回
        </el-button>
        <el-button type="success"
                   @click="parkingRegister">
          提交登记
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
      title: '公有车位',
      position: '车位登记',
      parkingInfo: {},
      parkingTypeSelect: [
        {
          value: '私有'
        }
      ]
    }
  },
  mounted () {
    this.parkingInfo = JSON.parse(this.$route.query.parkingInfo)
  },
  methods: {
    goBack () {
      this.$router.push('/parkingApplication')
    },
    // 登记车位信息
    parkingRegister () {
      this.$confirm('确定要为该业主登记当前车位？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/parkingRegister', {
          params: {
            parkingInfo: this.parkingInfo
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.$router.push('/parkingApplication')
          } else if (res.data.state === 401) {
            this.$message({
              type: 'error',
              message: res.data.message
            })
            return
          }
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.parking-register {
  width: 98%;
  margin: 20px;
  padding: 20px 10px 10px 0;
  min-height: 300px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .parking-btn {
    position: absolute;
    bottom: 30px;
    right: 200px;
  }
}
</style>