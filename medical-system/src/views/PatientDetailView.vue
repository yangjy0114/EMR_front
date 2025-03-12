<template>
  <div class="patient-detail">
    <!-- 患者基本信息部分 -->
    <div class="info-section">
      <div class="info-container">
        <el-descriptions :column="4" border style="flex: 0 0 600px;">
          <el-descriptions-item label="姓名">{{ patientInfo.name }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ patientInfo.gender }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ patientInfo.age }}</el-descriptions-item>
          <el-descriptions-item label="ID">{{ patientInfo.id }}</el-descriptions-item>
        </el-descriptions>
        
        <div class="action-buttons">
          <el-select 
            v-model="selectedScan" 
            placeholder="选择扫描时间"
            style="width: 200px"
            @change="handleScanSelect"
            value-key="id"
          >
            <el-option
              v-for="record in scanRecords"
              :key="record.id"
              :label="formatTimestamp(record.timestamp)"
              :value="record"
            />
          </el-select>
          <el-button 
            type="primary" 
            @click="handleAnalysis"
            :disabled="!hasSelectedScan"
          >
            <el-icon><VideoPlay /></el-icon>AI影像分析
          </el-button>
          <el-button 
            type="primary" 
            @click="handleGenerateReport"
            :disabled="!hasAnalyzed"
          >
            <el-icon><Document /></el-icon>AI生成报告
          </el-button>
        </div>
      </div>
    </div>

    <!-- 图片展示区域 -->
    <div class="image-section">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="image-container">
            <div class="section-title">OCT图像</div>
            <div class="image-area">
              <img v-if="octImage" :src="octImage" class="preview-image"/>
              <div v-else class="placeholder">
                <el-icon><Picture /></el-icon>
                <div>请选择扫描记录</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="image-container">
            <div class="section-title">眼底图像</div>
            <div class="image-area">
              <img v-if="fundusImage" :src="fundusImage" class="preview-image"/>
              <div v-else class="placeholder">
                <el-icon><Picture /></el-icon>
                <div>请选择扫描记录</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="image-container">
            <div class="section-title">分割结果</div>
            <div class="image-area">
              <img v-if="segImage" :src="segImage" class="preview-image"/>
              <div v-else class="placeholder">
                <el-icon><Picture /></el-icon>
                <div>请选择AI影像分析</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 分类结果展示 -->
    <div class="classification-section">
      <div class="classification-container">
        <div class="section-title">分类结果</div>
        <div class="classification-content">
          <span class="result-text">{{ classificationResult }}</span>
        </div>
      </div>
    </div>

    <!-- 诊断报告区域 -->
    <div class="report-section">
      <div class="report-container">
        <div class="section-title">AI 诊断报告</div>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="等待生成诊断报告..."
          v-model="aiReport"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-detail {
  padding: 20px;

  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #303133;
  }

  .info-section {
    .info-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

      .action-buttons {
        display: flex;
        gap: 12px;
        
        .el-button {
          padding: 12px 20px;
          font-size: 14px;
          
          .el-icon {
            margin-right: 6px;
            font-size: 16px;
          }
        }
      }
    }
  }

  .image-section {
    margin: 20px 0;
    
    .image-container {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

      .image-area {
        height: 300px;
        width: 300px;
        margin: 0 auto;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        
        .preview-image {
          width: 100%;
          height: 100%;
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
    }
  }

  .classification-section {
    margin-bottom: 20px;
    
    .classification-container {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

      .classification-content {
        padding: 10px;
        background: #f5f7fa;
        border-radius: 4px;
        min-height: 40px;
        display: flex;
        align-items: center;

        .result-text {
          color: #909399;
        }
      }
    }
  }

  .report-section {
    .report-container {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

      :deep(.el-textarea__inner) {
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { Picture, VideoPlay, Document } from '@element-plus/icons-vue'

const octImage = ref('')
const fundusImage = ref('')
const segImage = ref('')
const classificationResult = ref('等待分析...')
const aiReport = ref('')
const selectedScan = ref(null)
const patientInfo = ref({
  name: '李萍',
  gender: '女',
  age: '27',
  id: '1234567890123'
})

// 添加状态控制变量
const hasSelectedScan = ref(false)  // 是否已选择扫描记录
const hasAnalyzed = ref(false)      // 是否已完成分析

// 修改扫描记录数据，使用新的图片命名格式
const scanRecords = ref([
  {
    id: '1',
    timestamp: '20250218133317',
    patientId: 'p001',
    octImage: '/mock/images/oct/p001_oct.png',
    fundusImage: '/mock/images/fundus/p001_fundus.png'
  },
  {
    id: '2',
    timestamp: '20250218140051',
    patientId: 'p002',
    octImage: '/mock/images/oct/p002_oct.png',
    fundusImage: '/mock/images/fundus/p002_fundus.png'
  }
])

// 修改时间戳格式化函数
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

// 修改选择处理函数
const handleScanSelect = (record) => {
  if (!record) return
  console.log('Selected record:', record)
  
  // 重置状态
  hasAnalyzed.value = false
  aiReport.value = ''
  classificationResult.value = '等待分析...'
  segImage.value = ''
  
  // 只显示OCT和眼底图
  octImage.value = record.octImage
  fundusImage.value = record.fundusImage
  
  hasSelectedScan.value = true
}

// 修改影像分析处理函数
const handleAnalysis = () => {
  const currentScan = selectedScan.value
  if (!currentScan) return
  
  // 显示分割结果
  segImage.value = `/mock/images/segmentation/segmented_${currentScan.patientId}_fundus.png`
  
  // 获取分类结果
  fetch('/mock/data/classification.json')
    .then(res => res.json())
    .then(data => {
      classificationResult.value = data.result
      hasAnalyzed.value = true  // 标记分析完成
    })
}

// 修改生成报告处理函数
const handleGenerateReport = () => {
  if (!hasAnalyzed.value) return  // 如果未完成分析，不生成报告
  
  fetch('/mock/data/report.json')
    .then(res => res.json())
    .then(data => {
      aiReport.value = data.text
    })
}
</script> 