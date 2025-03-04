<template>
  <div class="patient-detail">
    <!-- 患者基本信息 -->
    <div class="info-section">
      <el-descriptions :column="4" border>
        <el-descriptions-item label="姓名">{{ patientInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ patientInfo.gender }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ patientInfo.age }}</el-descriptions-item>
        <el-descriptions-item label="ID">{{ patientInfo.id }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 图片展示区域 -->
    <div class="image-section">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="image-container">
            <div class="section-title">OCT图像</div>
            <div class="upload-area" @click="handleOctUpload">
              <el-upload
                class="upload"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleOctChange"
              >
                <div class="upload-content">
                  <el-icon v-if="!octImage"><Plus /></el-icon>
                  <img v-else :src="octImage" class="preview-image"/>
                  <div v-if="!octImage">点击上传OCT图像</div>
                </div>
              </el-upload>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="image-container">
            <div class="section-title">眼底图像</div>
            <div class="upload-area" @click="handleFundusUpload">
              <el-upload
                class="upload"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleFundusChange"
              >
                <div class="upload-content">
                  <el-icon v-if="!fundusImage"><Plus /></el-icon>
                  <img v-else :src="fundusImage" class="preview-image"/>
                  <div v-if="!fundusImage">点击上传眼底图像</div>
                </div>
              </el-upload>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 分析结果区域 -->
    <div class="result-section">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="result-container">
            <div class="section-title">分割结果</div>
            <div class="result-content">
              <div class="placeholder">上传图片后显示分割结果</div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="result-container">
            <div class="section-title">分类结果</div>
            <div class="result-content">
              <div class="placeholder">上传图片后显示分类结果</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const octImage = ref('')
const fundusImage = ref('')
const patientInfo = ref({
  name: '李萍',
  gender: '女',
  age: '27',
  id: '1'
})

const handleOctChange = (file) => {
  octImage.value = URL.createObjectURL(file.raw)
}

const handleFundusChange = (file) => {
  fundusImage.value = URL.createObjectURL(file.raw)
}
</script>

<style lang="scss" scoped>
.patient-detail {
  padding: 20px;

  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #303133;
  }

  .image-section {
    margin: 20px 0;
    
    .image-container {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

      .upload-area {
        height: 300px;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          border-color: #409EFF;
        }

        .upload {
          height: 100%;
          width: 100%;
          
          .upload-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #909399;

            .el-icon {
              font-size: 40px;
              margin-bottom: 10px;
            }
          }
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }

  .result-section {
    .result-container {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
      min-height: 200px;

      .result-content {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f5f7fa;
        border-radius: 4px;

        .placeholder {
          color: #909399;
        }
      }
    }
  }
}
</style> 