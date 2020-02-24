<template>
  <div>
    <header-nav :title="title"
                :titlePath="titlePath"
                :position="position"></header-nav>

    <div class="addOwner-container">
      <el-form label-width="100px">
        <!-- 业主姓名 -->
        <el-form-item label="业主姓名:">
          <el-input style="width:300px;"
                    v-model="ownerInfo.ownerName"></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别:">
          <el-radio v-model="ownerInfo.ownerSex"
                    label="男">男</el-radio>
          <el-radio v-model="ownerInfo.ownerSex"
                    label="女">女</el-radio>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号:">
          <el-input style="width:300px;"
                    v-model="ownerInfo.ownerPhone"></el-input>
        </el-form-item>
        <!-- 身份证号 -->
        <el-form-item label="身份证号:">
          <el-input style="width:300px;"
                    v-model="ownerInfo.ownerCard"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱:">
          <el-input style="width:300px;"
                    v-model="ownerInfo.ownerEmail"></el-input>
        </el-form-item>
        <!-- 初始登录密码 -->
        <el-form-item label="初始登录密码:">
          <el-input style="width:300px;"
                    v-model="ownerInfo.originalPassword"></el-input>
        </el-form-item>
      </el-form>
      <div class="sumbit-btn">
        <el-button type="success"
                   @click="addOwner">
          新增
        </el-button>
        <el-button type="danger"
                   @click="goBack">
          返回
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
      title: '业主管理',
      titlePath: '/owner',
      position: '新增业主',
      ownerInfo: {}
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.push('/owner')
    },
    // 新增业主信息
    addOwner () {
      console.log(this.ownerInfo.ownerMoveDate)
      this.$axios.post('/addOwner', {
        params: {
          ownerCard: this.ownerInfo.ownerCard,
          ownerPhone: this.ownerInfo.ownerPhone,
          ownerName: this.ownerInfo.ownerName,
          ownerSex: this.ownerInfo.ownerSex,
          ownerEmail: this.ownerInfo.ownerEmail,
          author: false,
          originalPassword: this.ownerInfo.originalPassword
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          setTimeout(() => {
            this.$router.push({ name: 'owner' })
          }, 2000)
        } else if (res.data.state === 401) {
          this.$message({
            type: 'error',
            message: res.data.message
          })
          return
        }
      })
    }
  }
}
</script>

<style lang="scss">
.addOwner-container /deep/ .el-form-item {
  margin-left: 265px;
  float: left;
}

.addOwner-container {
  width: 98%;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 300px;
  position: relative;
  .sumbit-btn {
    position: absolute;
    right: 10%;
    bottom: 10%;
  }
}
</style>