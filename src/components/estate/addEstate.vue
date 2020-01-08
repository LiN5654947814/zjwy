<template>
  <div>
    <header-nav :title="title"
                :titlePath="titlePath"
                :position="position"></header-nav>
    <div class="addEstate-container">
      <el-form label-width="20%">
        <!-- 楼宇 -->
        <el-form-item label="楼宇:">
          <el-input style="width:300px;"
                    v-model="houseInfo.houseBuilds"></el-input>
        </el-form-item>
        <!-- 单元 -->
        <el-form-item label="单元:">
          <el-input style="width:300px;"
                    v-model="houseInfo.houseUnit"></el-input>
        </el-form-item>
        <!-- 房态 -->
        <el-form-item label="房态:">
          <el-select v-model="houseInfo.sale"
                     placeholder="请选择">
            <el-option v-for="item in houseSaleSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 户型 -->
        <el-form-item label="户型:">
          <el-select v-model="houseInfo.houseApart"
                     placeholder="请选择">
            <el-option v-for="item in houseApartSelect"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 面积 -->
        <el-form-item label="面积(m²):">
          <el-input style="width:300px;"
                    v-model="houseInfo.houseArea"></el-input>
        </el-form-item>
      </el-form>
      <div class="sumbit-btn">
        <el-button type="success">
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
      title: '房产列表',
      titlePath: '/estate',
      position: '新增房产信息',
      houseInfo: {},
      houseSaleSelect: [
        {
          value: '已销售'
        },
        {
          value: '未销售'
        }
      ],
      houseApartSelect: [
        {
          value: '两房一厅'
        },
        {
          value: '三房一厅'
        },
        {
          value: '四房一厅'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.push('/estate')
    }
  }

}
</script>

<style lang="scss">
.addEstate-container {
  width: 96%;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 300px;
  position: relative;
  .sumbit-btn {
    position: absolute;
    right: 30%;
    bottom: 10%;
  }
}
</style>