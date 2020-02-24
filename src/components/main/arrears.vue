<template>
  <div>
    <div class="arrears">
      <div class="arrears-title">当前欠费户</div>
      <el-table :data="currentList"
                style="width: 100%">
        <el-table-column prop="payDate"
                         label="应缴月"
                         width="100">
        </el-table-column>
        <el-table-column prop="payOwnerUnit"
                         label="单元"
                         width="180">
        </el-table-column>
        <el-table-column prop="payOwner"
                         label="业主"
                         width="110">
        </el-table-column>
        <el-table-column prop="count"
                         width="200"
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
      tableData: [],
      filters: {
        page: 0,
        limit: 3
      }
    }
  },
  mounted () {
    this.getAllArrears()
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
  methods: {
    // 获取未缴费的信息
    getAllArrears () {
      this.$axios.get('/getAllPay').then(res => {
        if (res.data.state === 200) {
          let currentList = res.data.payList
          currentList.forEach(item => {
            if (item.payState === '未缴费') {
              this.tableData.push(item)
            }
          })
          this.tableData.forEach(item => {
            item.count = item.payGarbage + item.payElevator + item.payLighting
          })
        }
      })
    }
  }

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