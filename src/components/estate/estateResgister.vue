<template>
  <div>
    <header-nav :title="title"
                :titlePath="titlePath"
                :position="position"></header-nav>
    <div class="estate-register">
      <el-form label-width="100px">
        <el-form-item label="所选楼宇">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateBuilds"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="所选单元">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateUnit"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="所选楼层">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateFloor"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="所选房屋门牌">
          <el-input style="width:300px;"
                    v-model="estateInfo.estatePlate"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="房屋户型">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateApart"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="房屋面积(m²)">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateArea"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="装修情况">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateReno"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定业主">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateOwner"></el-input>
        </el-form-item>
        <el-form-item label="业主身份证">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateOwnerCard"></el-input>
        </el-form-item>
        <el-form-item label="迁入日期">
          <el-date-picker type="date"
                          style="width:300px;"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"
                          v-model="estateInfo.estateMoveDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input style="width:300px;"
                    v-model="estateInfo.estateContent"></el-input>
        </el-form-item>
      </el-form>
      <div class="estate-register-btn">
        <el-button type="primary"
                   @click="addEstateRegister">登记</el-button>
        <el-button type="danger"
                   @click="goBack">返回</el-button>
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
      title: '房产销售登记',
      titlePath: '/estateApplication',
      position: '房产登记',
      estateInfo: {
      }
    }
  },
  mounted () {
    this.getEstateInfo()
  },
  methods: {
    getEstateInfo () {
      this.estateInfo = JSON.parse(this.$route.query.estateInfo)
    },
    goBack () {
      this.$router.push('/estateApplication')
    },
    // 新增登记房产
    addEstateRegister () {
      this.estateInfo.estateResgister = '已登记'
      this.$confirm('确定要为该业主登记当前房产？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/estateRegister', {
          params: {
            id: this.estateInfo.id,
            estateBuilds: this.estateInfo.estateBuilds,
            estateUnit: this.estateInfo.estateUnit,
            estateFloor: this.estateInfo.estateFloor,
            estatePlate: this.estateInfo.estatePlate,
            estateApart: this.estateInfo.estateApart,
            estateArea: this.estateInfo.estateArea,
            estateReno: this.estateInfo.estateReno,
            estateResgister: this.estateInfo.estateResgister,
            estateOwner: this.estateInfo.estateOwner,
            estateOwnerCard: this.estateInfo.estateOwnerCard,
            ownerMoveDate: this.estateInfo.estateMoveDate,
            estateContent: this.estateInfo.estateContent
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            setTimeout(() => {
              this.$router.push({ name: 'estateApplication' })
            }, 500)
          } 
        })
      })

    }
  }
}
</script>

<style lang="scss">
.estate-register /deep/ .el-form-item {
  margin-left: 265px;
  float: left;
}
.estate-register {
  width: 98%;
  margin: 20px;
  padding: 20px 10px 10px 0;
  min-height: 675px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .estate-register-btn {
    left: 65%;
    top: 95%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
}
</style>