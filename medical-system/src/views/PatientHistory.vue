<template>
  <div class="patient-history">
    <!-- 基本信息区域 -->
    <div class="patient-basic-info">
      <el-row>
        <el-col :span="18">
          <el-form :model="basicForm" label-width="70px" size="small" inline>
            <el-form-item label="流水号">
              <el-input v-model="basicForm.serialNo" style="width: 120px" />
            </el-form-item>
            <el-form-item label="卡号">
              <el-input v-model="basicForm.cardNo" style="width: 120px" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="basicForm.name" style="width: 80px" />
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="basicForm.gender" style="width: 50px" />
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="basicForm.age" style="width: 50px" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align: right; padding-right: 20px;">
          <el-select 
            v-model="selectedRecord" 
            placeholder="选择就诊记录"
            style="width: 200px"
            @change="handleRecordSelect"
          >
            <el-option
              v-for="record in medicalRecords"
              :key="record.id"
              :label="formatTimestamp(record.timestamp)"
              :value="record"
            />
          </el-select>
        </el-col>
      </el-row>

      <!-- 新增药物过敏和既往病史 -->
      <el-row style="margin-top: 10px">
        <el-col :span="24">
          <el-form :model="medicalHistory" label-width="85px" size="small" inline>
            <el-form-item label="药物过敏">
              <el-input 
                v-model="medicalHistory.allergies" 
                style="width: 300px" 
                readonly
              />
            </el-form-item>
            <el-form-item label="既往病史">
              <el-input 
                v-model="medicalHistory.history" 
                style="width: 300px" 
                readonly
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <div class="diagnosis-info">
      <diagnosis-table :data="currentDiagnosis" :editable="false"></diagnosis-table>
    </div>
    
    <div class="prescription-info">
      <prescription-table :data="currentPrescription" :editable="false"></prescription-table>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import DiagnosisTable from '../components/prescription/DiagnosisTable.vue'
import PrescriptionTable from '../components/prescription/PrescriptionTable.vue'
import { useStore } from '../components/store'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

// 基本信息表单
const basicForm = ref({
  serialNo: '',
  cardNo: '',
  name: '',
  gender: '',
  age: ''
})

// 病史信息
const medicalHistory = ref({
  allergies: '',
  history: ''
})

// 选中的记录
const selectedRecord = ref(null)
const medicalRecords = ref([])
const currentDiagnosis = ref([])
const currentPrescription = ref([])

// 监听全局状态变化
watch(() => store.state.currentPatient, (newPatient) => {
  if (newPatient) {
    // 更新基本信息
    basicForm.value = newPatient.basicForm
    
    // 更新病史信息
    medicalHistory.value = newPatient.medicalHistory
    
    // 更新就诊记录
    medicalRecords.value = newPatient.medicalRecords
    
    // 默认选中第一条记录
    if (medicalRecords.value.length > 0) {
      selectedRecord.value = medicalRecords.value[0]
      currentDiagnosis.value = selectedRecord.value.diagnosis
      currentPrescription.value = selectedRecord.value.prescription
    }
  }
}, { immediate: true })

// 处理记录选择
const handleRecordSelect = (record) => {
  if (!record) return
  currentDiagnosis.value = record.diagnosis
  currentPrescription.value = record.prescription
}

// 格式化时间戳
const formatTimestamp = (timestamp) => {
  if (!timestamp) return ''
  
  const year = timestamp.slice(0, 4)
  const month = timestamp.slice(4, 6)
  const day = timestamp.slice(6, 8)
  const hour = timestamp.slice(8, 10)
  const minute = timestamp.slice(10, 12)
  const second = timestamp.slice(12, 14)
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

// 组件挂载时，检查是否有通过路由传递的患者数据
onMounted(() => {
  if (route.state && route.state.patientInfo) {
    // 如果有，则使用路由传递的数据
    store.setCurrentPatient(route.state.patientInfo)
  }
})
</script>

<style lang="scss" scoped>
.patient-history {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .patient-basic-info {
    padding: 10px;
    border-bottom: 1px solid #e4e7ed;
    flex-shrink: 0;
  }
  
  .diagnosis-info,
  .prescription-info {
    padding: 10px;
    flex: 1;
    overflow-y: auto;
  }
}
</style> 