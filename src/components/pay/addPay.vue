<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="addPay-container">
      <el-form label-width="30%">
        <!-- 业主名称 -->
        <el-form-item label="业主名称:">
          <el-input style="width:300px;"
                    v-model="payInfo.payOwner"></el-input>
        </el-form-item>
        <!-- 电梯使用费 -->
        <el-form-item label="电梯使用费:">
          <el-input style="width:300px;"
                    v-model="payInfo.payElevator"></el-input>
        </el-form-item>
        <!-- 垃圾清运费 -->
        <el-form-item label="垃圾清运费:">
          <el-input style="width:300px;"
                    v-model="payInfo.payGarbage"></el-input>
        </el-form-item>
        <el-form-item label="公摊照明费:">
          <el-input style="width:300px;"
                    v-model="payInfo.payLighting"></el-input>
        </el-form-item>
        <!-- 费用续费时间 -->
        <el-form-item label="续费时间:">
          <el-date-picker v-model="payInfo.payStartTime"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
        <!-- 费用到期时间 -->
        <el-form-item label="到期时间:">
          <el-date-picker v-model="payInfo.payEndTime"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!-- 缴费状态 -->
        <el-form-item label="状态:">
          <el-select v-model="payInfo.payState"
                     placeholder="请选择">
            <el-option v-for="item in payState"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
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
      title: '添加收费信息',
      payInfo: [],
      payState: [
        {
          value: '已缴费'
        },
        {
          value: '未缴费'
        }
      ],
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.push('/pay')
    }
  }
}
</script>

<style lang="scss" scoped>
.addPay-container {
  width: 96%;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 300px;
  position: relative;
}
</style>