<template>
  <div class="diagnosis-table">
    <div class="table-header">
      <div class="title">诊断信息</div>
      <div class="actions" v-if="editable">
        <el-button type="primary" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </div>
    </div>
    <el-table :data="data" style="width: 100%" size="small" :row-style="{ height: '50px' }">
      <el-table-column prop="type" label="类型" width="180">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70" v-if="editable">
        <template #default="scope">
          <el-button 
            type="danger" 
            size="small"
            @click="handleDelete(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'

// 接收属性
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  editable: {
    type: Boolean,
    default: true
  }
})

const handleAdd = () => {
  if (!props.editable) return
  props.data.push({
    type: '',
    description: ''
  })
}

const handleDelete = (index) => {
  if (!props.editable) return
  props.data.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.diagnosis-table {
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    .title {
      font-size: 15px;
      font-weight: bold;
    }
  }
  
  :deep(.el-table) {
    th {
      font-size: 14px;
      background-color: #f5f7fa;
      height: 45px !important;
    }
  }
}
</style> 