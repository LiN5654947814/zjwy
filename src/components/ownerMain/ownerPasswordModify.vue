<template>
  <div>
    <header-nav :title="title">
    </header-nav>
    <div class="owner-password-modify-container">
      <div class="password-form">
        <el-form label-width="40%">
          <el-form-item label="原密码:">
            <el-input style="width:300px;"
                      v-model="inputOriginalPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码:">
            <el-input style="width:300px;"
                      v-model="newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:">
            <el-input style="width:300px;"
                      v-model="newPassword_"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="modifyPassword">修改</el-button>
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
      title: '修改密码',
      inputOriginalPassword: '',
      newPassword: '',
      newPassword_: ''
    }
  },
  methods: {
    goBack () {
      this.$router.push('/ownerApplication')
    },
    // 修改密码
    modifyPassword () {
      let ownerInfo = JSON.parse(sessionStorage.getItem('owner'))
      ownerInfo.inputOriginalPassword = this.inputOriginalPassword
      ownerInfo.newPassword = this.newPassword
      ownerInfo.newPassword_ = this.newPassword_
      if (ownerInfo.inputOriginalPassword.trim().length === 0) {
        this.$message({
          type: 'error',
          message: '请输入原密码'
        })
      } else if (ownerInfo.newPassword.trim().length === 0) {
        this.$message({
          type: 'error',
          message: '请输入新密码'
        })
      } else if (ownerInfo.newPassword_.trim().length === 0) {
        this.$message({
          type: 'error',
          message: '请再次输入原密码'
        })
      }
      else {
        this.$confirm('确定要修改密码？', '提示', {
          confirmButtonText: '确定',
          canceButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/modifyPassword', {
            params: {
              ownerInfo: ownerInfo
            }
          }).then(res => {
            if (res.data.state === 200) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.$router.push('/login')
              localStorage.removeItem('token')
            }
          })

        })
      }
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