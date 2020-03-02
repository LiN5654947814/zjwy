<template>
  <div>
    <header-nav :title="title"
                :mainPath="mainPath"></header-nav>
    <div class="owner-select">
      <span style="margin-right:20px;
                    font-weight:700;">按条件搜索：</span>
      业主姓名：<el-input v-model="currentInfo.ownerName"
                placeholder="请输入内容"
                style="width:217px;
                         margin-right:20px;"></el-input>
      迁入时间：
      <el-date-picker v-model="currentInfo.moveDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['00:00:00','23:59:59']"
                      value-format="yyyy-MM-dd"
                      style="margin-right:20px;">
      </el-date-picker>
      <el-button type="primary"
                 @click="serachOwner">
        搜索
      </el-button>
      <el-button type="warning"
                 @click='clearSearch'>
        清空
      </el-button>
      <el-button type="success"
                 @click="addOwner">
        新增
      </el-button>
      <el-button type="danger"
                 @click="deleteOwnerList">
        批量删除
      </el-button>
    </div>
    <div class="owner-container">
      <div class="owner-table">
        <el-table :data="currentList"
                  style="width: 100%;
                  padding-left:5px;"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="ownerName"
                           label="业主姓名"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerSex"
                           label="性别"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerPhone"
                           label="联系手机号"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerUnit"
                           label="所在楼宇单元"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerEstate"
                           label="房产数"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerParking"
                           label="车位拥有"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerMoveDate"
                           label="迁入时间"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getOwnerInfo(scope.row)">
                编辑
              </el-button>
              <el-button type="danger"
                         @click="deleteOwner(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="export-btn">
        <el-button @click="exportExcel"
                   size="mini"
                   type="primary">全部导出</el-button>
        <el-button @click="exportExcelBySelect"
                   size="mini"
                   type="primary">勾选导出</el-button>
      </div>
      <div class="pagination">
        <div class="pagination-total">共{{total}}条</div>
        <el-pagination layout="prev, pager, next"
                       :current-page.sync="filters.page"
                       :page-size="filters.limit"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 编辑业主信息弹窗 -->
    <div class="popUpbox"
         v-if="isOwner">
      <div class="owner-info">
        <div class="owner-info-header">
          <div class="owner-header-title">
            编辑业主信息
          </div>
          <img src="../../assets/icon/close.png"
               class="owner-header-close"
               @click="closePopUp">
        </div>
        <div class="owner-info-container">
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
            <!-- 所在单元 -->
            <el-form-item label="所在单元:">
              <el-select v-model="ownerInfo.ownerUnit"
                         placeholder="请选择"
                         @change="changeUnit">
                <el-option v-for="item in houseUnit"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 车位拥有数 -->
            <el-form-item label="车位数:">
              <el-input style="width:300px;"
                        v-model="ownerInfo.ownerParking"></el-input>
            </el-form-item>
            <!-- 房产数 -->
            <el-form-item label="房产数:">
              <el-input style="width:300px;"
                        v-model="ownerInfo.ownerEstate"></el-input>
            </el-form-item>
            <!-- 迁入时间 -->
            <el-form-item label="迁入时间:">
              <el-date-picker v-model="ownerInfo.ownerMoveDate"
                              type="date"
                              placeholder="选择日期"
                              disabled=""
                              style="width:300px;
                              margin-right:80px;">
              </el-date-picker>
              <span style="font-size:10px;">（注：若业主拥有多个房产则以第一套登记迁入时间为主）</span>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     class="sumbit-btn"
                     @click="modifyOwner">
            保存
          </el-button>
        </div>
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
      mainPath: '/main',
      isOwner: false,
      ownerList: [],
      // 房屋单元
      houseUnit: [],
      moveDate: [],
      filters: {
        page: 0,
        limit: 10
      },
      // 勾选
      multipleSelection: [],
      // 搜索条件
      currentInfo: {
        ownerName: '',
        moveDate: []
      },
      // 渲染选中业主信息
      ownerInfo: {},
    }
  },
  mounted () {
    this.getAllOwner()
  },
  computed: {
    total () {
      return this.ownerList.length
    },
    currentList () {
      let ret = this.ownerList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 查看当前业主信息
    getOwnerInfo (row) {
      this.isOwner = true
      this.ownerInfo = row
      console.log(this.ownerInfo)
      this.currentTitle = '编辑'
      row.estates.forEach((item, index) => {
        this.houseUnit.push({ id: index, value: item.estateBuilds + '-' + item.estateUnit + '-' + item.estatePlate })
      })
    },
    changeUnit () {
      this.$forceUpdate()
    },
    // 编辑业主
    modifyOwner () {
      this.$confirm('确定要修改该业主信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/modifyOwner', {
          params: {
            id: this.ownerInfo.id,
            ownerCard: this.ownerInfo.ownerCard,
            ownerPhone: this.ownerInfo.ownerPhone,
            ownerName: this.ownerInfo.ownerName,
            ownerSex: this.ownerInfo.ownerSex,
            ownerEmail: this.ownerInfo.ownerEmail,
            ownerParking: this.ownerInfo.ownerParking,
            ownerEstate: this.ownerInfo.ownerEstate,
            originalPassword: this.ownerInfo.originalPassword
          }
        }).then(res => {
          if (res.data.state === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.isOwner = false
            this.getAllOwner()
          } else if (res.data.state === 401) {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      })
    },
    // 请求所有业主信息
    getAllOwner () {
      this.$axios.get('/getAllOwner').then(res => {
        if (res.data.state === 200) {
          let currentOwnerList = res.data.owners
          currentOwnerList.forEach((item, index) => {
            if (item.author === false) {
              if (item.estates.length != 0) {
                item.ownerMoveDate = item.estates[0].ownerMoveDate
                item.ownerUnit = item.estates[0].estateBuilds + '-' + item.estates[0].estateUnit + '-' + item.estates[0].estatePlate
                item.ownerEstate = item.estates.length
              }
              if (item.parkings.length != 0) {
                item.ownerParking = item.parkings.length
              }
            }
          })
          this.ownerList = currentOwnerList
          this.ownerList.forEach((item, index) => {
            if (item.author === true) {
              this.ownerList.splice(index, 1)
            }
          })
        }
      })
    },
    // 关闭弹窗
    closePopUp () {
      this.isOwner = false
      this.houseUnit = []
      this.getAllOwner()
    },
    // 按条件搜索业主
    serachOwner () {
      this.$axios.post('/searchOwner', {
        params: {
          ownerName: this.currentInfo.ownerName,
          ownerMoveDate: this.currentInfo.moveDate
        }
      }).then(res => {
        if (res.data.state === 200) {
          let currentList = []
          currentList = res.data.ownerInfo
          console.log(currentList)
          if (currentList.length != 0) {
            currentList.forEach(item => {
              if (item.owner != null && item.owner) {
                item.id = item.owner.id
                item.ownerName = item.owner.ownerName
                item.ownerSex = item.owner.ownerSex
                item.ownerPhone = item.owner.ownerPhone
                item.ownerParking = item.owner.ownerParking
                item.ownerEstate = item.owner.ownerEstate
                item.ownerCard = item.owner.ownerCard
                item.ownerEmail = item.owner.ownerEmail
                item.ownerUnit = item.estateBuilds + '-' + item.estateUnit + '-' + item.estatePlate
              }
              if (item.estate != null && item.estate) {
                item.ownerMoveDate = item.estate.ownerMoveDate
                item.ownerUnit = item.estate.estateBuilds + '-' + item.estate.estateUnit + '-' + item.estate.estatePlate
              }
              this.ownerList = currentList
            })
          } else {
            this.ownerList = []
          }
        }

      })
    },
    // 清空
    clearSearch () {
      this.currentInfo.ownerName = ''
      this.currentInfo.moveDate = ''
      this.getAllOwner()
    },
    // 新增页面
    addOwner () {
      this.$router.push('/owner/addowner')
    },
    // 单个删除业主
    deleteOwner (row) {
      console.log(row.estate)
      this.$confirm('确定要删除该业主信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.estates.length != 0) {
          this.$message({
            type: 'error',
            message: '请解绑所选业主名下房产信息'
          })
        } else if (row.parkings.length != 0) {
          this.$message({
            type: 'error',
            message: '请解绑所选业主名下的车位信息'
          })
        }
        else {
          this.$axios.post('/deleteOwner', {
            params: {
              id: row.id,
              ownerCard: row.ownerCard
            }
          }).then(res => {
            if (res.data.state === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getAllOwner()
            }
          })
        }
      })
    },
    // 批量删除
    deleteOwnerList () {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先勾选要删除的数据'
        })
        return
      }
      let num = this.multipleSelection.length
      this.$confirm('确定要删除该' + num + '位业主信息？', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach(owner => {
          if (owner.estates.length != 0) {
            setTimeout(() => {
              this.$message({
                type: 'error',
                message: `请解绑业主(` + owner.ownerName + `)名下房产信息`
              })
            }, 500)
          } else if (owner.parkings.length != 0) {
            this.$message({
              type: 'error',
              message: `请解绑所选业主(` + owner.ownerName + `)名下的车位信息`
            })
          }
          else {
            this.$axios.post('/deleteOwners', {
              params: {
                deleteOwners: this.multipleSelection
              }
            }).then(res => {
              if (res.data.state === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                setTimeout(() => {
                  this.getAllOwner()
                }, 1000)
              }
            })
          }
        })
      })
    },
    // 导出excel
    exportExcel () {
      let name = new Date().getTime()
      this.$axios.get('/exportOwnerExcel', { responseType: 'blob' }).then(ret => {
        console.log(new Blob([ret.data]))
        const url = window.URL.createObjectURL(new Blob([ret.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}-业主表.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    // 勾选导出
    exportExcelBySelect () {
      let name = new Date().getTime()
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先勾选要导出的数据'
        })
      } else {
        this.$axios.post('/exportOwnerExcelBySelect', {
          params: {
            exportList: this.multipleSelection
          }
        }, { responseType: 'blob' }).then(ret => {
          console.log(new Blob([ret.data]))
          const url = window.URL.createObjectURL(new Blob([ret.data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', `${name}-业主表.xlsx`)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
      }
    }
  }


}
</script>

<style lang="scss">
.owner-container /deep/ .el-select {
  margin-right: 20px;
}

.owner-select {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.owner-container {
  width: 97%;
  margin: 20px;
  min-width: 1204px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .owner-table {
    min-height: 710px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
    .pagination-total {
      bottom: 7px;
      right: 130px;
      position: absolute;
      width: 100px;
      font-size: 15px;
    }
  }
}

.popUpbox {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .owner-info {
    width: 25%;
    height: 75%;
    background-color: #fff;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .owner-info-header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .owner-header-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
        margin-left: 20px;
      }
      .owner-header-close {
        width: 40px;
        height: 40px;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .owner-info-container {
      width: 100%;
      height: 86%;
      text-align: left;
      margin-top: 25px;
      position: relative;
      .sumbit-btn {
        right: 50px;
        bottom: -5px;
        position: absolute;
      }
    }
  }
}
</style>