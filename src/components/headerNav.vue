<template>
  <div>
    您所在的位置：
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="title">{{title}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="position">{{position}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ['title', 'position'],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
</style>