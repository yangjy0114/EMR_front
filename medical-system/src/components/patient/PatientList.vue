<template>
  <div class="patient-list-container">
    <!-- 就诊列表 -->
    <div class="list-section">
      <div class="section-header">就诊</div>
      <div class="table-container">
        <el-table 
          :data="patients" 
          style="width: 100%" 
          size="small" 
          :border="true"
          @row-click="handleRowClick"
        >
          <el-table-column type="expand">
            <template #default="props">
              <div style="padding: 0 20px">
                <el-icon><CaretRight /></el-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80" />
          <el-table-column prop="gender" label="性别" width="60" />
          <el-table-column prop="age" label="年龄" width="60" />
        </el-table>
      </div>
    </div>

    <!-- 待诊列表 -->
    <div class="list-section">
      <div class="section-header">待诊</div>
      <div class="table-container">
        <el-table :data="waitingPatients" style="width: 100%" size="small" :border="true">
          <el-table-column type="expand">
            <template #default="props">
              <div style="padding: 0 20px">
                <el-icon><CaretRight /></el-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80" />
          <el-table-column prop="gender" label="性别" width="60" />
          <el-table-column prop="age" label="年龄" width="60" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleRowClick = (row) => {
  router.push({
    name: 'patientDetail',
    params: { id: row.id }
  })
}

const patients = ref([
  {
    id: '1',
    name: '李萍',
    gender: '女',
    age: '27'
  }
])

const waitingPatients = ref([
  {
    id: '2',
    name: '张明',
    gender: '男',
    age: '45'
  },
  {
    id: '3',
    name: '王华',
    gender: '女',
    age: '33'
  }
])
</script>

<style lang="scss" scoped>
.patient-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #a6c5e8;
  border-radius: 4px;
  background-color: #fff;
  
  .list-section {
    height: 50%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #a6c5e8;
    
    &:last-child {
      border-bottom: none;
    }
    
    .section-header {
      padding: 8px 12px;
      background-color: #e6f1fc;
      color: #1e1e1e;
      font-size: 13px;
      border-bottom: 1px solid #a6c5e8;
      flex-shrink: 0;
    }
    
    .table-container {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      
      :deep(.el-table) {
        height: 100%;
        --el-table-border-color: #a6c5e8;
        --el-table-header-bg-color: #f5f7fa;
        --el-table-row-hover-bg-color: #e6f1fc;
        
        .el-table__row {
          cursor: pointer;
          
          &.selected {
            background-color: #e6f1fc;
          }
        }
        
        .el-table__cell {
          padding: 4px 0;
        }
      }
    }
  }
}
</style> 