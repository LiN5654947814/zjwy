<template>
  <div>
    <header-nav :title="title"></header-nav>
    <div class="owner-container">
      <div class="owner-select">
        <span style="margin-right:20px;
                    font-weight:700;">按条件搜索：</span>
        业主姓名：<el-input v-model="input"
                  placeholder="请输入内容"
                  style="width:217px;
                         margin-right:20px;"></el-input>
        楼层单元：
        <el-select v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        迁入时间：
        <el-select v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary">
          搜索
        </el-button>
        <el-button type="warning">
          清空
        </el-button>
      </div>
      <div class="owner-table">
        <el-table :data="currentList"
                  style="width: 100%;
                  padding-left:5px;">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="ownerName"
                           label="业主姓名"
                           width="250"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerPhone"
                           label="联系手机号"
                           width="250"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseUnit"
                           label="所在单元"
                           width="250"
                           align="center">
          </el-table-column>
          <el-table-column prop="houseProp"
                           label="房产数"
                           width="250"
                           align="center">
          </el-table-column>
          <el-table-column prop="ownerParking"
                           label="车位拥有"
                           width="250"
                           align="center">
          </el-table-column>
          <el-table-column prop="cost"
                           label="操作">
            <template slot-scope="scope">
              <el-button type="info">
                查看
              </el-button>
              <el-button type="primary">
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
      ownerList: [{
        id: '01',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '02',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      }, {
        id: '03',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      }, {
        id: '04',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '05',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '06',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '07',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '08',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '09',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '10',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '11',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '12',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      },
      {
        id: '13',
        ownerName: '孙笑川',
        ownerPhone: '134458752',
        houseUnit: 'A栋-304',
        houseProp: '1',
        ownerParking: '1'
      }],
      filters: {
        page: 0,
        limit: 10
      }
    }
  },
  computed: {
    total () {
      return this.ownerList.length
    },
    currentList () {
      let ret = this.ownerList.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
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
</style>