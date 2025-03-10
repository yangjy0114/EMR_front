<template>
  <div class="diagnosis-table">
    <div class="table-header">
      <div class="title">诊断信息</div>
      <div class="actions">
        <el-button type="primary" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </div>
    </div>
    <el-table :data="diagnosisList" style="width: 100%" size="small">
      <el-table-column prop="type" label="类型" width="100">
        <template #default="scope">
          <el-select v-model="scope.row.type" size="small" style="width: 90px">
            <el-option label="单纯性肥胖" value="单纯性肥胖" />
            <el-option label="高血压" value="高血压" />
            <el-option label="糖尿病" value="糖尿病" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template #default="scope">
          <el-input v-model="scope.row.description" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70">
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
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const diagnosisList = ref([
  {
    type: '单纯性肥胖',
    description: '体重指数AAA(BMI)≥28.0'
  }
])

const handleAdd = () => {
  diagnosisList.value.push({
    type: '',
    description: ''
  })
}

const handleDelete = (index) => {
  diagnosisList.value.splice(index, 1)
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
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style> 