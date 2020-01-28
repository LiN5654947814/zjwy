<template>
  <div>
    <header-nav :title="title">
    </header-nav>
    <div class="owner-password-modify-container">
      <div class="password-form">
        <el-form label-width="40%">
          <el-form-item label="原密码:">
            <el-input style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="新密码:">
            <el-input style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:">
            <el-input style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">修改</el-button>
            <el-button type="danger"
                       @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
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
      title: '修改密码'
    }
  },
  methods: {
    goBack () {
      this.$router.push('/ownerApplication')
    }
  }

}
</script>

<style lang="scss" scoped>
.password-form /deep/ .el-form-item {
  margin-top: 20px;
}
.owner-password-modify-container {
  width: 97%;
  min-height: 300px;
  margin: 20px;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
}
</style>