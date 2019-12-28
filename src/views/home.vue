<template>
  <el-container direction="vertical">
    <!-- 头部区域 -->
    <el-header>
      <img src="../assets/icon/logo.png"
           class="header-logo">
      <span class="header-title">至简物业管理系统</span>
      <el-popover placement="bottom-start"
                  width="150"
                  trigger="hover"
                  class="header-admin">
        <el-button style="border:none;
                          width:100%;"
                   @click="outLogin">退出</el-button>
        <img src="../assets/icon/header_admin.png"
             slot="reference">
      </el-popover>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <!-- 左侧菜单 -->
        <el-menu text-color="#fff"
                 active-text-color="#ffd04b"
                 background-color="#333744">
          <!-- 首尔 -->
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 业主管理 -->
          <el-menu-item index="2">
            <i class="el-icon-s-custom"></i>
            <span slot="title">业主管理</span>
          </el-menu-item>
          <!-- 房产管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>房产管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">房产列表</el-menu-item>
              <el-menu-item index="1-2">房产销售登记</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 车位管理 -->
          <el-menu-item index="4">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">车位管理</span>
          </el-menu-item>
          <!-- 保修管理 -->
          <el-menu-item index="5">
            <i class="el-icon-document"></i>
            <span slot="title">保修管理</span>
          </el-menu-item>
          <!-- 收费管理 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>收费管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">费用列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 中心信息区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    outLogin () {
      this.$confirm('未保存数据将不会被更改,是否继续？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          this.$router.push('/login')
          window.localStorage.removeItem('token')
          this.$message({
            type: 'success',
            message: '已退出登录'
          })
        }, 500)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  .header-logo {
    float: left;
    width: 50px;
    height: 50px;
    margin-top: 5px;
  }
  .header-title {
    margin-left: 10px;
    font-size: 25px;
    font-weight: 900;
  }
  .header-admin {
    float: right;
    margin: 5px 20px 0 0;
    img {
      width: 50px;
      height: 50px;
    }
  }
}

.el-aside {
  background-color: #333744;
  color: #333;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>