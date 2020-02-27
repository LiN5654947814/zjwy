<template>
  <div>
    <header-nav :title="title"
                :position="position"></header-nav>
    <div class="addParking-container">
      <el-form label-width="30%">
        <!-- 车位编号 -->
        <el-form-item label="车位编号:">
          <el-input style="width:300px;"
                    v-model="parkingInfo.parkingNum"></el-input>
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
                          placeholder="选择日期"
                          :disabled="isAdd">
          </el-date-picker>

        </el-form-item>
        <!-- 车位租赁结束时间 -->
        <el-form-item label="车位租赁结束时间:">
          <el-date-picker v-model="parkingInfo.parkingEndTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                          :disabled="isAdd">
          </el-date-picker>
        </el-form-item>
        <!-- 所属业主 -->
        <el-form-item label="所属业主:">
          <el-input v-model="parkingInfo.parkingOwner"
                    style="width:300px;"
                    :disabled="isAdd"></el-input>
        </el-form-item>
        <el-form-item label="车位状态:">
          <el-input v-model="parkingInfo.parkingStatus"
                    style="width:300px;"
                    :disabled="isAdd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     @click="goBack">返回</el-button>
          <el-button type="success"
                     @click="addParking">新增</el-button>
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
      title: '公有车位',
      position: '增加公有车位',
      parkingInfo: {
        parkingType: '公有',
        parkingStatus: '正常'
      },
      parkingTypeSelect: [
        {
          'value': '公有'
        },
        {
          'value': '私有'
        }
      ],
      isAdd: true
    }
  },
  methods: {
    goBack () {
      this.$router.push('/parkingApplication')
    },
    // 新增车位信息
    addParking () {
      this.$axios.post('/addParking', {
        params: {
          parkingInfo: this.parkingInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.$router.push({ name: 'parkingApplication' })
        } else if (res.data.state === 401) {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
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