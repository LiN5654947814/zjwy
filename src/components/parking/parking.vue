<template>
  <div>
    <headerNav :title="title"></headerNav>
    <!-- 搜索 -->
    <div class="parking-select">
      <el-form>
        <el-form-item>
          <span style="margin-right:20px;
                         font-weight:700;
                         font-size:17px;">按条件搜索：</span>
        </el-form-item>
        <el-form-item>
          车位编号：<el-input style="width:150px;
                                    margin-right:10px;">
          </el-input>
        </el-form-item>
        <el-form-item>
          车位类型：<el-select v-model="parkingInfo.parkingType"
                     placeholder="请选择">
            <el-option v-for="item in parkingSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          车位位置：<el-select v-model="parkingInfo.parkingLocation"
                     placeholder="请选择">
            <el-option v-for="item in parkingSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          业主名：<el-input style="width:150px;
                                    margin-right:10px;">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            搜索
          </el-button>
          <el-button type="warning">
            清空
          </el-button>
          <el-button type="success"
                     @click="addParking">
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="parking-container">
      <div class="parking-table">
        <el-table :data="currentList"
                  style="width: 100%;
                  padding-left:5px;"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="parkingNum"
                           label="车位编号"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingType"
                           label="车位类型"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingLocation"
                           label="车位位置"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingStartTime"
                           label="车位租赁开始时间"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingEndTime"
                           label="车位租赁结束时间"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column prop="parkingOwner"
                           label="业主"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="getParkingInfo(scope.row)">
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
    <!-- 编辑弹窗 -->
    <div class="popUpbox"
         v-if="isParking">
      <div class="parking-info">
        <div class="parking-info-header">
          <div class="parking-header-title">
            编辑车位信息
          </div>
          <img src="../../assets/icon/close.png"
               class="parking-header-close"
               @click="closePopUp">
        </div>
        <div class="parking-info-container">
          <el-form label-width="30%">
            <!-- 车位编号 -->
            <el-form-item label="车位编号:">
              <el-input style="width:300px;"
                        v-model="parkingInfo.parkingNum"></el-input>
            </el-form-item>
            <!-- 车位类型 -->
            <el-form-item label="车位类型:">
              <el-input style="width:300px;"
                        v-model="parkingInfo.parkingType"></el-input>
            </el-form-item>
            <!-- 车位位置 -->
            <el-form-item label="车位位置:">
              <el-input style="width:300px;"
                        v-model="parkingInfo.parkingLocation"></el-input>
            </el-form-item>
            <!-- 车位租赁开始时间 -->
            <el-form-item label="车位租赁开始时间:">
              <el-date-picker v-model="parkingInfo.parkingStartTime"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>

            </el-form-item>
            <!-- 车位租赁结束时间 -->
            <el-form-item label="车位租赁结束时间:">
              <el-date-picker v-model="parkingInfo.parkingEndTime"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <!-- 所属业主 -->
            <el-form-item label="所属业主:">
              <el-input v-model="parkingInfo.parkingOwner"
                        style="width:300px;"></el-input>
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
      title: '车位管理',
      parkingSelect: [
        {
          value: '私有'
        },
        {
          value: '公有'
        }
      ],
      parkingInfo: [],
      // 分页器
      filters: {
        page: 0,
        limit: 10
      },
      // 模拟数据
      parkingList: [
        {
          id: '01',
          parkingNum: '0001',
          parkingType: '私有',
          parkingLocation: 'A001',
          parkingStartTime: '2020-1-10',
          parkingEndTime: '2030-1-10',
          parkingOwner: '孙笑川'
        },
        {
          id: '02',
          parkingNum: '0002',
          parkingType: '私有',
          parkingLocation: 'A002',
          parkingStartTime: '2020-1-10',
          parkingEndTime: '2030-1-10',
          parkingOwner: '孙笑川'
        },
        {
          id: '03',
          parkingNum: '0003',
          parkingType: '私有',
          parkingLocation: 'A003',
          parkingStartTime: '2020-1-10',
          parkingEndTime: '2030-1-10',
          parkingOwner: '孙笑川'
        },
        {
          id: '04',
          parkingNum: '0004',
          parkingType: '私有',
          parkingLocation: 'A004',
          parkingStartTime: '2020-1-10',
          parkingEndTime: '2030-1-10',
          parkingOwner: '孙笑川'
        },
        {
          id: '05',
          parkingNum: '0005',
          parkingType: '私有',
          parkingLocation: 'A005',
          parkingStartTime: '2020-1-10',
          parkingEndTime: '2030-1-10',
          parkingOwner: '孙笑川'
        },
        {
          id: '06',
          parkingNum: '0006',
          parkingType: '私有',
          parkingLocation: 'A006',
          parkingStartTime: '2020-1-10',
          parkingEndTime: '2030-1-10',
          parkingOwner: '孙笑川'
        },
        {
          id: '07',
          parkingNum: '0007',
          parkingType: '私有',
          parkingLocation: 'A007',
          parkingStartTime: '2020-1-10',
          parkingEndTime: '2030-1-10',
          parkingOwner: '孙笑川'
        },
        {
          id: '08',
          parkingNum: '0008',
          parkingType: '私有',
          parkingLocation: 'A008',
          parkingStartTime: '2020-1-10',
          parkingEndTime: '2030-1-10',
          parkingOwner: '孙笑川'
        },
        {
          id: '09',
          parkingNum: '0009',
          parkingType: '公有',
          parkingLocation: 'A009',
          parkingStartTime: '',
          parkingEndTime: '',
          parkingOwner: ''
        },
        {
          id: '10',
          parkingNum: '0010',
          parkingType: '公有',
          parkingLocation: 'A010',
          parkingStartTime: '',
          parkingEndTime: '',
          parkingOwner: ''
        }
      ],
      isParking: false
    }
  },
  computed: {
    total () {
      return this.parkingList.length
    },
    currentList () {
      let ret = this.parkingList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 编辑弹窗
    getParkingInfo (row) {
      this.parkingInfo = row
      this.isParking = true
      console.log(row)
    },
    // 关闭弹窗
    closePopUp () {
      this.isParking = false
    },
    // 新增车位信息
    addParking () {
      this.$router.push('/addParking')
    }
  }
}
</script>

<style lang="scss" scoped>
.parking-select /deep/ .el-select {
  margin-right: 10px;
}
.parking-select /deep/ .el-form-item {
  float: left;
}
.parking-select {
  width: 95%;
  height: 50px;
  margin: 20px;
  padding: 20px;
  line-height: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.parking-container {
  width: 97%;
  margin: 20px;
  min-width: 1204px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .parking-table {
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
  .parking-info {
    width: 30%;
    height: 55%;
    background-color: #fff;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .parking-info-header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: relative;
      .parking-header-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 50px;
        margin-left: 20px;
      }
      .parking-header-close {
        width: 40px;
        height: 40px;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        cursor: pointer;
      }
    }
    .parking-info-container {
      width: 100%;
      height: 86%;
      text-align: left;
      margin-top: 25px;
      position: relative;
      .sumbit-btn {
        right: 50px;
        bottom: 10px;
        position: absolute;
      }
    }
  }
}
</style>