<template>
  <div class="new-record">
    <!-- 患者基本信息 -->
    <div class="patient-basic-info">
      <el-form :model="basicForm" label-width="70px" size="small" inline>
        <el-form-item label="流水号">
          <el-input v-model="basicForm.serialNo" style="width: 120px" readonly />
        </el-form-item>
        <el-form-item label="卡号">
          <el-input v-model="basicForm.cardNo" style="width: 120px" readonly />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="basicForm.name" style="width: 80px" readonly />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="basicForm.gender" style="width: 50px" readonly />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="basicForm.age" style="width: 50px" readonly />
        </el-form-item>
      </el-form>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 左侧AI辅助信息 -->
      <div class="ai-assist-section">
        <div class="section-box">
          <div class="section-title">分割结果</div>
          <div class="image-container">
            <img v-if="segImage" :src="segImage" class="preview-image"/>
            <div v-else class="placeholder">
              <el-icon><Picture /></el-icon>
              <div>暂无分割结果</div>
            </div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">分类结果</div>
          <div class="classification-content">
            {{ classificationResult }}
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">AI诊断建议</div>
          <div class="ai-report-content">
            {{ aiReport }}
          </div>
        </div>
      </div>

      <!-- 右侧病历信息 -->
      <div class="record-section">
        <!-- 病史信息 -->
        <div class="section-box">
          <el-form :model="medicalHistory" label-width="85px" size="small">
            <el-form-item label="药物过敏">
              <el-input 
                v-model="medicalHistory.allergies" 
                type="textarea"
                :rows="2"
                placeholder="请输入药物过敏史"
              />
            </el-form-item>
            <el-form-item label="既往病史">
              <el-input 
                v-model="medicalHistory.history" 
                type="textarea"
                :rows="2"
                placeholder="请输入既往病史"
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 诊断信息 -->
        <div class="section-box">
          <diagnosis-table :data="diagnosisData" :editable="true"></diagnosis-table>
        </div>

        <!-- 处方信息 -->
        <div class="section-box">
          <prescription-table :data="prescriptionData" :editable="true"></prescription-table>
        </div>

        <!-- 操作按钮 -->
        <div class="actions">
          <el-button type="primary" @click="handleSubmit">保存病历</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Picture } from '@element-plus/icons-vue'
import DiagnosisTable from '../components/prescription/DiagnosisTable.vue'
import PrescriptionTable from '../components/prescription/PrescriptionTable.vue'
import { useStore } from '../components/store'

const store = useStore()

// 基本信息
const basicForm = ref({
  serialNo: '',
  cardNo: '',
  name: '',
  gender: '',
  age: ''
})

// AI辅助信息
const segImage = ref('')
const classificationResult = ref('暂无分类结果')
const aiReport = ref('暂无AI诊断建议')

// 病历信息
const medicalHistory = ref({
  allergies: '',
  history: ''
})
const diagnosisData = ref([])
const prescriptionData = ref([])

// 从store获取患者信息
const initPatientInfo = () => {
  const patient = store.state.currentPatient
  if (patient) {
    basicForm.value = patient.basicForm
    // 可以选择是否预填充病史信息
    // medicalHistory.value = patient.medicalHistory
  }
}

// 提交处理
const handleSubmit = () => {
  // 这里添加表单验证逻辑
  const formData = {
    basicInfo: basicForm.value,
    medicalHistory: medicalHistory.value,
    diagnosis: diagnosisData.value,
    prescription: prescriptionData.value
  }
  
  console.log('提交的病历数据：', formData)
  // 这里添加提交到后端的逻辑
}

// 重置处理
const handleReset = () => {
  medicalHistory.value = {
    allergies: '',
    history: ''
  }
  diagnosisData.value = []
  prescriptionData.value = []
}

// 组件挂载时初始化
onMounted(() => {
  initPatientInfo()
})
</script>

<style lang="scss" scoped>
.new-record {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .patient-basic-info {
    padding: 10px;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }
  
  .main-content {
    flex: 1;
    display: flex;
    gap: 20px;
    min-height: 0;
    
    .ai-assist-section {
      width: 400px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      
      .image-container {
        height: 300px;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        .preview-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .placeholder {
          text-align: center;
          color: #909399;
          
          .el-icon {
            font-size: 40px;
            margin-bottom: 10px;
          }
        }
      }
      
      .classification-content,
      .ai-report-content {
        padding: 12px;
        background: #f5f7fa;
        border-radius: 4px;
        min-height: 60px;
        font-size: 14px;
        line-height: 1.6;
      }
      
      .ai-report-content {
        min-height: 200px;
      }
    }
    
    .record-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-width: 0;
      
      .actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 20px 0;
      }
    }
  }
  
  .section-box {
    background: #fff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    
    .section-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #303133;
    }
  }
}
</style> 