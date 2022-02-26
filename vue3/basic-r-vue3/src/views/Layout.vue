<template>
  <!-- 顶部通栏 -->
  <nav>
    <navbar/>
  </nav>

  <!-- 头部组件 -->
  <header>头部组件</header>

  <!-- 内容容器 -->
  <div class="main">
    <router-view/>
  </div>
  <!-- 内容容器 -->

  <!-- 底部组件 -->
  <footer>底部组件</footer>

</template>

<script>

import navbar from "@/components/navbar";

export default {
name: "Layout",
  components: {
  navbar,
  }

}
</script>

<style scoped>

</style>
