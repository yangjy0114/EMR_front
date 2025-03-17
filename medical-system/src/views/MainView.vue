<template>
  <div class="main-container">
    <el-container class="content-container">
      <!-- 左侧患者列表 -->
      <el-aside width="250px" class="aside-container">
        <patient-list></patient-list>
      </el-aside>
      
      <!-- 中间主要内容区 -->
      <el-main class="main-content">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import PatientList from '../components/patient/PatientList.vue'
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  
  .content-container {
    height: 100%;
    
    .aside-container {
      padding: 10px;
      background: #fff;
      height: 100%;
      overflow: hidden;
    }
    
    .main-content {
      padding: 10px;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style> 