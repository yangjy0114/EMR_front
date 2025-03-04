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
      
      <!-- 右侧快捷操作区 -->
      <el-aside width="150px" class="aside-container">
        <quick-actions></quick-actions>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import PatientList from '../components/patient/PatientList.vue'
import QuickActions from '../components/layout/QuickActions.vue'
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  
  .content-container {
    height: 100%;
    
    .aside-container {
      padding: 10px;
      background: #fff;
    }
    
    .main-content {
      padding: 0;
    }
  }
}
</style> 