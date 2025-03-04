<script setup>
import NavBar from './components/layout/NavBar.vue'
</script>

<template>
  <el-container class="app-container">
    <el-header height="75px" class="app-header">
      <nav-bar></nav-bar>
    </el-header>
    
    <el-main class="app-main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style>
/* 删除所有默认样式 */
#app {
  height: 100vh;
  width: 100vw;
}
</style>
