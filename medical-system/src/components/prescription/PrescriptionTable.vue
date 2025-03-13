<template>
  <div class="prescription-table">
    <div class="table-header">
      <div class="title">处方信息</div>
      <div class="actions" v-if="editable">
        <el-button type="primary" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </div>
    </div>
    <el-table :data="data" style="width: 100%" size="small" :row-style="{ height: '50px' }">
      <el-table-column prop="medicine" label="药品" width="150">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.medicine }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="manufacturer" label="生产厂商" width="180">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.manufacturer }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="specification" label="规格" width="100">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.specification }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dosage" label="用量" width="100">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.dosage }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="frequency" label="频次" width="100">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.frequency }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="days" label="天数" width="80">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.days }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="费用" width="100">
        <template #default="scope">
          <span style="font-size: 14px">¥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="effect" label="药物作用">
        <template #default="scope">
          <span style="font-size: 14px">{{ scope.row.effect }}</span>
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
    medicine: '',
    dosage: '',
    frequency: '',
    days: ''
  })
}

const handleDelete = (index) => {
  if (!props.editable) return
  props.data.splice(index, 1)
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