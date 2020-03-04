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
        <!-- 手机号 -->
        <el-form-item label="手机号:">
          <el-input style="width:300px;"
                    v-model="payInfo.payOwnerPhone"></el-input>
        </el-form-item>
        <!-- 身份证 -->
        <el-form-item label="身份证:">
          <el-input style="width:300px;"
                    v-model="payInfo.payOwnerCard"></el-input>
        </el-form-item>
        <!-- 所在单元 -->
        <el-form-item label="所在单元:">
          <el-input style="width:300px;"
                    v-model="payInfo.payOwnerUnit"></el-input>
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
        <!-- 公摊照明费 -->
        <el-form-item label="公摊照明费:">
          <el-input style="width:300px;"
                    v-model="payInfo.payLighting"></el-input>
        </el-form-item>
        <el-form-item label="公告管理费:">
          <el-input style="width:300px;"
                    v-model="payInfo.payApplication"></el-input>
        </el-form-item>
        <!-- 应缴月 -->
        <el-form-item label="应费月份：:">
          <el-date-picker v-model="payInfo.payDate"
                          type="month"
                          placeholder="选择月"
                          style="margin-right:20px;"
                          value-format="yyyy-MM">
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
          <el-button type="success"
                     @click="addPay">新增</el-button>
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
      payInfo: {},
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
    },
    // 新增
    addPay () {
      this.$axios.post('/addPay', {
        params: {
          payInfo: this.payInfo
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(() => {
            this.$router.push('/pay')
          }, 500)
        }
      })
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