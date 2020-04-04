<template>
  <div>
    <header-nav :title="title"
                :titlePath="titlePath"
                :position="position"></header-nav>

    <div class="addOwner-container">
      <el-form label-width="110px"
               :model="ownerInfo"
               :rules="rules">
        <!-- 业主姓名 -->
        <el-form-item label="业主姓名:"
                      prop="ownerName">
          <el-input style="width:300px;"
                    v-model="ownerInfo.ownerName"></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别:"
                      prop="ownerSex">
          <el-radio v-model="ownerInfo.ownerSex"
                    label="男">男</el-radio>
          <el-radio v-model="ownerInfo.ownerSex"
                    label="女">女</el-radio>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号:"
                      prop="ownerPhone">
          <el-input style="width:300px;"
                    v-model="ownerInfo.ownerPhone"></el-input>
        </el-form-item>
        <!-- 身份证号 -->
        <el-form-item label="身份证号:"
                      prop="ownerCard">
          <el-input style="width:300px;"
                    v-model="ownerInfo.ownerCard"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱:"
                      prop="ownerEmail">
          <el-input style="width:300px;"
                    v-model="ownerInfo.ownerEmail"></el-input>
        </el-form-item>
        <!-- 初始登录密码 -->
        <el-form-item label="初始登录密码:"
                      placeholder="请输入6位数的密码"
                      prop="originalPassword">
          <el-input style="width:300px;"
                    v-model="ownerInfo.originalPassword"></el-input>
        </el-form-item>
      </el-form>
      <div class="sumbit-btn">
        <el-button type="success"
                   id="addOwner"
                   @click="addOwner('ownerform')">
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
      ownerInfo: {

      },
      rules: {
        ownerName: [
          { required: true, message: "请输入业主姓名", trigger: 'blur' }
        ],
        ownerSex: [
          { required: true, message: '请选择业主性别', trigger: 'blur' }
        ],
        ownerCard: [
          { required: true, message: '请输入业主身份证', trigger: 'blur' }
        ],
        ownerPhone: [
          { required: true, message: '请输入业主手机号', trigger: 'blur' }
        ],
        ownerEmail: [
          { required: true, message: '请输入业主邮箱', trigger: 'blur' }
        ],
        originalPassword: [
          { required: true, message: '请输入业主6位数的初始密码', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.push('/owner')
    },
    // 新增业主信息
    addOwner () {
      let owner = this.ownerInfo
      this.$axios.post('/addOwner', {
        params: {
          owner: owner
        }
      }).then(res => {
        if (res.data.state === 200) {
          this.status = res.data.state
          this.message = res.data.message
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          setTimeout(() => {
            this.$router.push({ name: 'owner' })
          }, 2000)
        }
      })
    }

  }

}

</script>

<style lang="scss">
.addOwner-container /deep/ .el-form-item {
  margin-left: 345px;
  float: left;
}

.addOwner-container {
  width: 98%;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 375px;
  position: relative;
  .sumbit-btn {
    position: absolute;
    right: 10%;
    bottom: 10%;
  }
}
</style>