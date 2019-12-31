<template>
  <div>
    <div class="bulletin">
      <div class="bulletin-title">
        公告栏信息
        <div class="bulletin-color-box">
          详情
        </div>
      </div>
      <div class="pagination">
        <el-pagination small
                       layout="prev, pager, next"
                       :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="scss">
.bulletin {
  width: 65%;
  margin-left: 20px;
  height: 300px;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  .bulletin-title {
    width: 99%;
    height: 50px;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
    .bulletin-color-box {
      float: right;
      width: 70px;
      height: 25px;
      margin: 15px;
      font-size: 15px;
      line-height: 25px;
      font-weight: 400;
      text-align: center;
      color: #fff;
      border-radius: 5px;
      background-color: #ffd700;
      cursor: pointer;
    }
  }
  .pagination {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
</style>
