<template>
  <div class="prescription-table">
    <div class="table-header">
      <div class="title">处方信息</div>
      <div class="actions">
        <el-button type="primary" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </div>
    </div>
    <el-table :data="prescriptionList" style="width: 100%" size="small">
      <el-table-column prop="medicine" label="药品" width="120">
        <template #default="scope">
          <el-select v-model="scope.row.medicine" size="small" style="width: 110px">
            <el-option label="阿司匹林" value="阿司匹林" />
            <el-option label="布洛芬" value="布洛芬" />
            <el-option label="头孢" value="头孢" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="dosage" label="用量" width="100">
        <template #default="scope">
          <el-input v-model="scope.row.dosage" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="frequency" label="频次" width="120">
        <template #default="scope">
          <el-select v-model="scope.row.frequency" size="small" style="width: 110px">
            <el-option label="每日一次" value="每日一次" />
            <el-option label="每日两次" value="每日两次" />
            <el-option label="每日三次" value="每日三次" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="days" label="天数" width="80">
        <template #default="scope">
          <el-input v-model="scope.row.days" size="small" />
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

const prescriptionList = ref([
  {
    medicine: '阿司匹林',
    dosage: '100mg',
    frequency: '每日一次',
    days: '7'
  }
])

const handleAdd = () => {
  prescriptionList.value.push({
    medicine: '',
    dosage: '',
    frequency: '',
    days: ''
  })
}

const handleDelete = (index) => {
  prescriptionList.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.prescription-table {
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