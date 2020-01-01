<template>
  <div>
    <div class="arrears">
      <div class="arrears-title">当前欠费户</div>
      <el-table :data="currentList"
                style="width: 100%">
        <el-table-column prop="date"
                         label="应缴月"
                         width="180">
        </el-table-column>
        <el-table-column prop="address"
                         label="单元"
                         width="180">
        </el-table-column>
        <el-table-column prop="cost"
                         label="金额(元)">
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination small
                       layout="prev, pager, next"
                       :current-page.sync="filters.page"
                       :page-size="filters.limit"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '1',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '2',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '3',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '4',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '5',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '6',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '7',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '8',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '9',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      },
      {
        id: '10',
        date: '2020-1',
        address: 'A栋-102',
        cost: '500'
      }
      ],
      filters: {
        page: 0,
        limit: 3
      }
    }
  },
  computed: {
    total () {
      return this.tableData.length
    },
    currentList () {
      let ret = this.tableData.slice((this.filters.page - 1) * this.filters.limit, this.filters.page * this.filters.limit)
      return ret
    }
  },

}
</script>

<style lang="scss">
.arrears {
  float: right;
  width: 35%;
  margin-right: 30px;
  height: 300px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  .arrears-title {
    width: 99%;
    height: 50px;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
</style>