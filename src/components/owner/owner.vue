<template>
  <div>
    <header-nav :title="title"></header-nav>
    owner
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
      title: '业主管理'
    }
  }
}
</script>

<style lang="scss">
</style>