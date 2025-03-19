<script setup>
import NavBar from './components/layout/NavBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <!-- 登录页面不显示导航栏和主布局 -->
  <template v-if="route.path === '/login'">
    <router-view></router-view>
  </template>
  
  <!-- 其他页面显示完整布局 -->
  <el-container v-else class="app-container">
    <el-header height="75px" class="app-header">
      <nav-bar></nav-bar>
    </el-header>
    
    <el-main class="app-main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss">
.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .app-header {
    padding: 0;
    height: auto !important;
    flex-shrink: 0;
  }
  
  .app-main {
    flex: 1;
    padding: 10px;
    background-color: #f5f7fa;
    overflow: hidden;  // 改为 hidden
  }
}
</style>
