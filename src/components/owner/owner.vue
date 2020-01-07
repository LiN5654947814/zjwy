<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="owner-container">
      <div class="owner-select">
        <span style="margin-right:20px;
                    font-weight:700;">按条件搜索：</span>
        业主姓名：<el-input v-model="currentInfo.ownerName"
                  placeholder="请输入内容"
                  style="width:217px;
                         margin-right:20px;"></el-input>
        楼层单元：
        <el-select v-model="currentInfo.houseUnit"
                   placeholder="请选择">
          <el-option v-for="item in houseUnit"
                     :key="item.value"
                     :label="item.label"
                     :value="item.label">
          </el-option>
        </el-select>
        迁入时间：
        <el-date-picker v-model="currentInfo.moveDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00','23:59:59']"
                        value-format="timestamp"
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
      </div>
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
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerPhone"
                           label="联系手机号"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseUnit"
                           label="所在单元"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseProp"
                           label="房产数"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerParking"
                           label="车位拥有"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="moveDate"
                           label="迁入时间"
                           width="230"
                           align="center">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getownerInfo(scope.row)">
                编辑
              </el-button>
              <el-button type="danger">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination layout="prev, pager, next"
                       :current-page.sync="filters.page"
                       :page-size="filters.limit"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 查看业主信息弹窗 -->
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
                        label="1">男</el-radio>
              <el-radio v-model="ownerInfo.ownerSex"
                        label="2">女</el-radio>
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
              <el-input style="width:300px;"
                        v-model="ownerInfo.houseUnit"></el-input>
            </el-form-item>
            <!-- 车位拥有数 -->
            <el-form-item label="车位数:">
              <el-input style="width:300px;"
                        v-model="ownerInfo.ownerParking"></el-input>
            </el-form-item>
            <!-- 房产数 -->
            <el-form-item label="房产数:">
              <el-input style="width:300px;"
                        v-model="ownerInfo.houseProp"></el-input>
            </el-form-item>
            <!-- 迁入时间 -->
            <el-form-item label="迁入时间:">
              <el-date-picker v-model="ownerInfo.moveDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     class="sumbit-btn">
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
      isOwner: false,
      ownerList: [
        {
          id: '01',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-9-14"
        },
        {
          id: '02',
          ownerName: '李赣',
          ownerPhone: '134458752',
          houseUnit: 'B栋-303',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-30"
        }, {
          id: '03',
          ownerName: '许昊龙',
          ownerPhone: '134458752',
          houseUnit: 'C栋-302',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        }, {
          id: '04',
          ownerName: '深海鱼',
          ownerPhone: '134458752',
          houseUnit: 'A栋-301',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-8-20"
        },
        {
          id: '05',
          ownerName: '梁志斌',
          ownerPhone: '134458752',
          houseUnit: 'A栋-204',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-20"
        },
        {
          id: '06',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '07',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '08',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '09',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '10',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '11',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'B栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '12',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'C栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '13',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        }
      ],
      ownerList_: [
        {
          id: '01',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-9-14"
        },
        {
          id: '02',
          ownerName: '李赣',
          ownerPhone: '134458752',
          houseUnit: 'B栋-303',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-30"
        }, {
          id: '03',
          ownerName: '许昊龙',
          ownerPhone: '134458752',
          houseUnit: 'C栋-302',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        }, {
          id: '04',
          ownerName: '深海鱼',
          ownerPhone: '134458752',
          houseUnit: 'A栋-301',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-8-20"
        },
        {
          id: '05',
          ownerName: '梁志斌',
          ownerPhone: '134458752',
          houseUnit: 'A栋-204',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-20"
        },
        {
          id: '06',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '07',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '08',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '09',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '10',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '11',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'B栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '12',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'C栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        },
        {
          id: '13',
          ownerName: '孙笑川',
          ownerPhone: '134458752',
          houseUnit: 'A栋-304',
          houseProp: '1',
          ownerParking: '1',
          moveDate: "2019-12-31"
        }
      ],
      // 房屋单元
      houseUnit: [
        {
          value: '选项一',
          label: 'A栋'
        },
        {
          value: '选项二',
          label: 'B栋'
        },
        {
          value: '选项三',
          label: 'C栋'
        }
      ],
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
        houseUnit: '',
        moveDate: ''
      },
      // 渲染选中业主信息
      ownerInfo: {}
    }
  },
  mounted () {
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
    // 编辑业主
    getownerInfo (row) {
      this.isOwner = true
      this.ownerInfo = row
      this.currentTitle = '编辑'
    },
    // 关闭弹窗
    closePopUp () {
      this.isOwner = false
    },
    // 按条件搜索业主
    serachOwner () {
      let result = []
      console.log(this.currentInfo)
      let ownerName = this.currentInfo.ownerName
      let houseUnit = this.currentInfo.houseUnit
      let moveDate = this.currentInfo.moveDate
      this.ownerList_.forEach(item => {
        if (ownerName === '' && houseUnit != '' && moveDate != '') {
          // 业主名为空 日期 单元不为空
          if (item.houseUnit.indexOf(houseUnit) > -1 && item.moveDate > moveDate[0] && item.moveDate < moveDate[1]) {
            result.push(item)
          }
          // 业主名为空 单元为空 日期不为空
        } else if (ownerName === '' && houseUnit === '' && moveDate != '') {
          if (new Date(item.moveDate).valueOf() >= moveDate[0] && new Date(item.moveDate).valueOf() <= moveDate[1]) {
            result.push(item)
          }
          //  单元为空 业主名 日期不为空
        } else if (ownerName != '' && houseUnit === '' && moveDate != '') {
          if (item.ownerName.indexOf(ownerName) > -1 && item.moveDate > moveDate[0] && item.moveDate < moveDate[1]) {
            result.push(item)
          }
          // 日期为空 业主名 单元不为空
        } else if (ownerName != '' && houseUnit != '' && moveDate === '') {
          if (item.ownerName.indexOf(ownerName) > -1 && item.houseUnit.indexOf(houseUnit) > -1) {
            result.push(item)
          }
          // 三个都空
        } else if (ownerName != '' && houseUnit === '' && moveDate === '') {
          if (item.ownerName.indexOf(ownerName) > -1) {
            result.push(item)
          }
          // 单元不为空 业主名日期都为空
        } else if (houseUnit != '' && ownerName === '' && moveDate === '') {
          if (item.houseUnit.indexOf(houseUnit) > -1) {
            result.push(item)
          }
        }
      })
      console.log(result)
      if (ownerName === '' && houseUnit === '' && moveDate === '') {
        this.ownerList = this.ownerList_
      } else {
        this.ownerList = result
      }
    },
    // 清空
    clearSearch () {
      this.currentInfo.ownerName = ''
      this.currentInfo.houseUnit = ''
      this.currentInfo.moveDate = ''
    },
    // 新增
    addOwner () {
    }
  }


}
</script>

<style lang="scss">
.owner-container /deep/ .el-select {
  margin-right: 20px;
}

.owner-container {
  width: 98%;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .owner-select {
    width: 100%;
    padding: 20px;
    height: 50px;
  }
  .owner-table {
    min-height: 750px;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
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
        bottom: 0px;
        position: absolute;
      }
    }
  }
}
</style>