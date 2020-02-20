<template>
  <div>
    <header-nav :title="title"
                :position="position"></header-nav>
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
      title: '我的报修',
      position: '报修详情'
    }
  }

}
</script>

<style lang="scss" scoped>
</style>