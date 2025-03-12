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
          <el-button type="primary" @click="handleSelectImages">
            <el-icon><Picture /></el-icon>选择影像
          </el-button>
          <el-button type="primary" @click="handleAnalysis" :disabled="!octImage || !fundusImage">
            <el-icon><VideoPlay /></el-icon>影像分析
          </el-button>
          <el-button type="primary" @click="handleGenerateReport">
            <el-icon><Document /></el-icon>生成报告
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
            <div class="upload-area">
              <el-upload
                v-if="!octImage"
                class="upload"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleOctUpload"
              >
                <div class="upload-content">
                  <el-icon><Plus /></el-icon>
                  <div>点击上传OCT图像</div>
                </div>
              </el-upload>
              <img v-else :src="octImage" class="preview-image"/>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="image-container">
            <div class="section-title">眼底图像</div>
            <div class="upload-area">
              <img v-if="fundusImage" :src="fundusImage" class="preview-image"/>
              <div v-else class="upload-content">
                <el-icon><Plus /></el-icon>
                <div>点击上传眼底图像</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="image-container">
            <div class="section-title">分割结果</div>
            <div class="result-content">
              <img v-if="segImage" :src="segImage" class="preview-image"/>
              <div v-else class="placeholder">上传图片后显示分割结果</div>
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

      .upload-area, .result-content {
        height: 300px;
        width: 300px;
        margin: 0 auto;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        overflow: hidden;
        
        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .upload-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
import { Plus, Picture, VideoPlay, Document } from '@element-plus/icons-vue'

const octImage = ref('')
const fundusImage = ref('')
const segImage = ref('')
const classificationResult = ref('等待分析...')
const aiReport = ref('')
const patientInfo = ref({
  name: '李萍',
  gender: '女',
  age: '27',
  id: '1234567890123'
})

// 处理选择影像
const handleSelectImages = () => {
  octImage.value = '/mock/images/oct/p001_oct_20250218133317.tif'
  fundusImage.value = '/mock/images/fundus/p001_fundus_20250218133317.tif'
}

const handleOctUpload = (file) => {
  octImage.value = URL.createObjectURL(file.raw)
}

// 处理影像分析
const handleAnalysis = () => {
  if (!octImage.value || !fundusImage.value) return
  
  segImage.value = '/mock/images/segmentation/segmented_p002_fundus_20250218140051_20250218141702.png'
  
  fetch('/mock/data/classification.json')
    .then(res => res.json())
    .then(data => {
      classificationResult.value = data.result
    })
}

// 处理生成报告
const handleGenerateReport = () => {
  fetch('/mock/data/report.json')
    .then(res => res.json())
    .then(data => {
      aiReport.value = data.text
    })
}
</script> 