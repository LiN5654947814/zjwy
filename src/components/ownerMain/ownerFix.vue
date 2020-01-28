<template>
  <div>
    <header-nav :title="title"></header-nav>
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
      title: '报修提交'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>