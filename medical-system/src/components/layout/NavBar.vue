<template>
  <div class="nav-container">
    <!-- 主导航栏 -->
    <div class="main-nav">
      <el-menu mode="horizontal" :default-active="activeIndex" class="main-menu">
        <el-menu-item index="1">设置</el-menu-item>
        <el-menu-item index="2">门诊挂号</el-menu-item>
        <el-menu-item index="3">门诊医生</el-menu-item>
        <el-menu-item index="4">门诊收费</el-menu-item>
        <el-menu-item index="5">出入院</el-menu-item>
        <el-menu-item index="6">养老入住</el-menu-item>
        <el-menu-item index="7">护士站</el-menu-item>
        <el-menu-item index="8">住院医生</el-menu-item>
        <el-menu-item index="9">辅助科室</el-menu-item>
        <el-menu-item index="10">LIS</el-menu-item>
        <el-menu-item index="11">体检</el-menu-item>
        <el-menu-item index="12">药房</el-menu-item>
        <el-menu-item index="13">物资</el-menu-item>
        <el-menu-item index="14">输血</el-menu-item>
        <el-menu-item index="15">报表中心</el-menu-item>
        <el-menu-item index="16">设备</el-menu-item>
        <el-menu-item index="17">窗口</el-menu-item>
      </el-menu>
    </div>

    <!-- 子导航栏 -->
    <div class="sub-nav">
      <div class="nav-row">
        <el-button-group>
          <el-button 
            type="primary" 
            :class="{ active: activeSubNav === 'history' }" 
            @click="handleNavClick('history')"
          >
            <el-icon><Document /></el-icon>查看病历
          </el-button>
          <el-button 
            type="primary" 
            :class="{ active: activeSubNav === 'image' }" 
            @click="handleNavClick('image')"
          >
            <el-icon><Picture /></el-icon>影像分析
          </el-button>
          <el-button 
            type="primary" 
            :class="{ active: activeSubNav === 'new' }" 
            @click="handleNavClick('new')"
          >
            <el-icon><Edit /></el-icon>添加病历
          </el-button>
          <el-button 
            type="primary" 
            :class="{ active: activeSubNav === 'prescription' }" 
            @click="handleNavClick('prescription')"
          >
            <el-icon><Notebook /></el-icon>开处方
          </el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Document, Picture, Edit, Notebook } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeIndex = ref('3')
const activeSubNav = ref('history')

const handleNavClick = (type) => {
  activeSubNav.value = type
  switch(type) {
    case 'history':
      router.push('/')
      break
    case 'image':
      router.push('/image-analysis')
      break
    case 'new':
      router.push('/new-record')
      break
    case 'prescription':
      router.push('/prescription')
      break
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  .main-nav {
    .main-menu {
      background-color: #4a7eca;
      border: none;
      padding: 0 10px;
      height: 32px;
      
      :deep(.el-menu-item) {
        height: 32px;
        line-height: 32px;
        color: white;
        padding: 0 12px;
        font-size: 14px;
        
        &:hover, &.is-active {
          background-color: #6698e8 !important;
          border-bottom: none;
        }
        
        &.is-active {
          font-weight: bold;
        }
      }
    }
  }
  
  .sub-nav {
    display: flex;
    padding: 5px 10px;
    background-color: #f0f2f5;
    border-bottom: 1px solid #dcdfe6;
    
    .nav-row {
      display: flex;
      align-items: center;
      
      .el-button {
        padding: 5px 8px;
        margin-left: 2px;
        height: 28px;
        font-size: 12px;

        .el-icon {
          margin-right: 3px;
        }
      }
    }
  }
}
</style> 