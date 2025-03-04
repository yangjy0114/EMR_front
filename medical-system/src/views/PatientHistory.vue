<template>
  <div class="patient-history">
    <div class="patient-basic-info">
      <el-form :model="basicForm" label-width="70px" size="small" inline>
        <el-form-item label="流水号">
          <el-input v-model="basicForm.serialNo" style="width: 150px" />
        </el-form-item>
        <el-form-item label="卡号">
          <el-input v-model="basicForm.cardNo" style="width: 150px" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="basicForm.name" style="width: 100px" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="basicForm.gender" style="width: 60px" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="basicForm.age" style="width: 60px" />
        </el-form-item>
      </el-form>
    </div>

    <div class="diagnosis-info">
      <diagnosis-table></diagnosis-table>
    </div>
    
    <div class="prescription-info">
      <prescription-table></prescription-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DiagnosisTable from '../components/prescription/DiagnosisTable.vue'
import PrescriptionTable from '../components/prescription/PrescriptionTable.vue'

const basicForm = ref({
  serialNo: '202005090005',
  cardNo: '202003100012',
  name: '李萍',
  gender: '女',
  age: '27'
})
</script>

<style lang="scss" scoped>
.patient-history {
  .patient-basic-info {
    padding: 10px;
    border-bottom: 1px solid #e4e7ed;
  }
  
  .diagnosis-info,
  .prescription-info {
    padding: 10px;
  }
}
</style> 