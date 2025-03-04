<template>
  <div class="quick-actions">
    <el-menu class="action-menu">
      <el-menu-item index="1">
        <el-icon><Document /></el-icon>
        <span>病历</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><Timer /></el-icon>
        <span>预约</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><List /></el-icon>
        <span>检查申请</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Message /></el-icon>
        <span>会诊申请</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { Document, Timer, List, Message } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.quick-actions {
  padding: 10px;
  .action-menu {
    border-right: none;
  }
}
</style> 