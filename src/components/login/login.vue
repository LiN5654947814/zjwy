<template>
  <div class="login-container">
    <!-- 背景图片 -->
    <img src="../../assets/image/login_background.png"
         class="login-background">

    <!-- 登录表单 -->
    <div class="login-form">
      <div class="login-form-icon">
        <img src="../../assets/icon/admin_login.png">
      </div>
      <div class="login-title">
        至简物业管理系统
      </div>
      <!-- 输入部分 -->
      <el-form label-width="100px">
        <!-- 账号 -->
        <el-form-item label="账号">
          <el-input placeholder="请输入账号"
                    style="width:300px;"
                    v-model="username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input placeholder="请输入密码"
                    style="width:300px;"
                    v-model="password"
                    show-password></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码">
          <el-input placeholder="请输入验证码"
                    style="width:150px;"
                    v-model="inputCheck"></el-input>
          <input type="button"
                 v-model="checkCode"
                 class="login-checkCode"
                 @click="reCheckCode" />
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary"
                     style="width:300px;"
                     @click.enter="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { async } from 'q'
export default {
  name: 'login',
  data () {
    return {
      // 验证码
      checkCode: '',
      inputCheck: '',
      username: '',
      password: ''
    }
  },
  created () {
    this.createCode()
  },
  methods: {
    // 图片验证码
    createCode () {
      let code = ''
      // 验证码长度
      let codeLength = 4
      // 随机生成验证码
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
      for (let i = 0; i < codeLength; i++) {
        // 取得随机数（0~35）
        let index = Math.floor(Math.random() * 36)
        // 根据索引取得随机数加上code
        code += random[index]
        // console.log(code)
      }
      this.checkCode = code
    },
    // 点击刷新验证码
    reCheckCode () {
      this.createCode()
    },
    login () {
      let upCaseCode = this.inputCheck.toUpperCase()
      // 前端判断账户密码是否为空
      if (this.username === '' && this.password === '') {
        this.$message({
          type: 'warning',
          message: '账户或密码不能为空'
        })
        return
      }
      // 判断验证码 
      else if (upCaseCode != this.checkCode) {
        this.$message({
          type: 'warning',
          message: '验证码错误'
        })
        return
      } else {
        // 发起登录请求
        this.$axios.post('/login', {
          params: {
            username: this.username,
            password: this.password
          }
        }).then(res => {
          if (res.data.state === 200) {
            // 登录检测成功后设置token
            const token = localStorage.setItem('token', res.data.token)
            const author = localStorage.setItem('author', res.data.author)
            // 判断权限
            if (res.data.author === true) {
              this.$message({
                type: 'success',
                message: '登录成功，你的身份为管理员'
              })
              setTimeout(() => {
                this.$router.push('/main')
              }, 1000)
            } else if (res.data.author == false) {
              this.$message({
                type: 'success',
                message: '登录成功，你的身份为业主'
              })
              let ownerInfo = {
                author: res.data.author,
                ownerName: res.data.ownerName,
                ownerPhone: res.data.ownerPhone,
                ownerCard: res.data.ownerCard
              }
              sessionStorage.setItem('owner', JSON.stringify(ownerInfo))
              setTimeout(() => {
                this.$router.push('/ownerApplication')
              }, 1000)
            }
          } else {
            this.$message({
              type: 'error',
              message: '用户名或密码错误'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form /deep/ .el-form-item {
  margin-bottom: 15px;
}
.login-checkCode /deep/ .el-input__inner {
  text-align: center;
}

.login-container {
  height: 100%;
  overflow: hidden;
  position: relative;
  .login-background {
    width: 100%;
  }
  .login-form {
    width: 475px;
    height: 350px;
    border-radius: 10px;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .login-form-icon {
      width: 120px;
      height: 70px;
      text-align: center;
      top: -18%;
      left: 50%;
      background-color: #fff;
      border-radius: 50%;
      transform: translate(-50%, 50%);
      position: absolute;
      z-index: 999;
      img {
        width: 50%;
      }
    }
    .login-title {
      font-size: 20px;
      font-weight: 700;
      width: 100%;
      text-align: center;
      margin-top: 50px;
      margin-bottom: 30px;
    }
    .login-content {
      width: 440px;
      height: 260px;
      border: 1px solid black;
      margin: 0 auto;
    }
    .login-checkCode {
      font-size: 16px;
      font-weight: 700;
      width: 130px;
      float: right;
      margin-right: 75px;
      height: 40px;
      text-align: center;
      color: blue;
      background-color: #cccccc;
      border: 1px solid #cccccc;
      cursor: pointer;
    }
  }
  .login-form-icon {
    width: 120px;
    height: 70px;
    text-align: center;
    top: -20%;
    left: 50%;
    background-color: #fff;
    border-radius: 50%;
    transform: translate(-50%, 50%);
    position: absolute;
    z-index: 999;
    img {
      width: 50%;
    }
  }
}
</style>