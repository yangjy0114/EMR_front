<template>
  <div class="patient-list-container">
    <!-- 就诊列表 -->
    <div class="list-section" style="height: 64px">
      <div class="section-header">就诊中123s</div>
      <div class="table-container">
        <el-table 
          :data="inTreatmentPatients" 
          style="width: 100%" 
          size="small" 
          :border="true"
          @row-click="handleRowClick"
          :show-header="false"
        >
          <el-table-column prop="name" label="姓名" width="90" />
          <el-table-column prop="gender" label="性别" width="60" />
          <el-table-column prop="age" label="年龄" width="90" />
        </el-table>
      </div>
    </div>

    <!-- 待诊列表 -->
    <div class="list-section" style="height: calc(50% - 32px)">
      <div class="section-header">待诊</div>
      <div class="table-container">
        <el-table 
          :data="waitingPatients" 
          style="width: 100%" 
          size="small" 
          :border="true"
          @row-click="handleRowClick"
        >
          <el-table-column prop="name" label="姓名" width="90" />
          <el-table-column prop="gender" label="性别" width="60" />
          <el-table-column prop="age" label="年龄" width="90" />
        </el-table>
      </div>
    </div>

    <!-- 已就诊列表 -->
    <div class="list-section" style="height: calc(50% - 32px)">
      <div class="section-header">已就诊</div>
      <div class="table-container">
        <el-table 
          :data="treatedPatients" 
          style="width: 100%" 
          size="small" 
          :border="true"
          @row-click="handleRowClick"
        >
          <el-table-column prop="name" label="姓名" width="90" />
          <el-table-column prop="gender" label="性别" width="60" />
          <el-table-column prop="age" label="年龄" width="90" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const store = useStore()

// 模拟数据 - 就诊中只有一个患者
const inTreatmentPatients = ref([
  {
    id: '1',
    name: '李萍',
    gender: '女',
    age: '27',
    serialNo: '202005090005',
    cardNo: '202003100012',
    medicalHistory: {
      allergies: '头孢噻肟钠，氯雷他定，甲氧氯普胺',
      history: '支气管哮喘，慢性荨麻疹，高血压'
    },
    records: [
      {
        id: '1',
        timestamp: '20250218133317',
        diagnosis: [
          { type: '糖尿病视网膜病变', description: '双眼视网膜微血管异常，点状出血' },
          { type: '高血压', description: '三级极高危，血压控制不佳' }
        ],
        prescription: [
          {
            medicine: '缬沙坦胶囊',
            manufacturer: '诺华制药（瑞士）',
            specification: '80mg*7片/盒',
            dosage: '80mg',
            frequency: '每日一次',
            days: '30',
            price: '89.50',
            effect: '用于治疗高血压，可有效降低血压'
          }
        ]
      }
    ]
  }
])

// 增加更多待诊患者
const waitingPatients = ref([
  {
    id: '3',
    name: '王华',
    gender: '女',
    age: '33',
    serialNo: '202005090007',
    cardNo: '202003100014',
    medicalHistory: {
      allergies: '无',
      history: '糖尿病'
    },
    records: [
      {
        id: '1',
        timestamp: '20250218141023',
        diagnosis: [
          { type: '2型糖尿病', description: '血糖控制欠佳' }
        ],
        prescription: [
          {
            medicine: '二甲双胍片',
            manufacturer: '中美上海施贵宝制药有限公司',
            specification: '0.5g*20片/盒',
            dosage: '0.5g',
            frequency: '每日三次',
            days: '30',
            price: '35.80',
            effect: '用于改善胰岛素抵抗，降低血糖'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: '刘强',
    gender: '男',
    age: '56',
    serialNo: '202005090008',
    cardNo: '202003100015',
    medicalHistory: {
      allergies: '磺胺类药物',
      history: '高血压，高血脂'
    },
    records: [
      {
        id: '1',
        timestamp: '20250218142045',
        diagnosis: [
          { type: '高血脂', description: '甘油三酯和总胆固醇升高' },
          { type: '高血压', description: '血压波动较大' }
        ],
        prescription: [
          {
            medicine: '阿托伐他汀钙片',
            manufacturer: '辉瑞制药有限公司',
            specification: '20mg*7片/盒',
            dosage: '20mg',
            frequency: '每日一次',
            days: '30',
            price: '120.50',
            effect: '降低血脂，预防心血管疾病'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: '赵丽',
    gender: '女',
    age: '42',
    serialNo: '202005090009',
    cardNo: '202003100016',
    medicalHistory: {
      allergies: '青霉素',
      history: '甲状腺功能减退'
    },
    records: [
      {
        id: '1',
        timestamp: '20250218143012',
        diagnosis: [
          { type: '甲状腺功能减退', description: 'TSH升高，T3、T4降低' }
        ],
        prescription: [
          {
            medicine: '左甲状腺素钠片',
            manufacturer: '默克制药（德国）',
            specification: '50μg*100片/瓶',
            dosage: '100μg',
            frequency: '每日一次',
            days: '30',
            price: '65.00',
            effect: '补充甲状腺素，改善甲减症状'
          }
        ]
      }
    ]
  }
])

// 增加更多已就诊患者
const treatedPatients = ref([
  {
    id: '2',
    name: '张明',
    gender: '男',
    age: '45',
    serialNo: '202005090006',
    cardNo: '202003100013',
    medicalHistory: {
      allergies: '青霉素，阿莫西林',
      history: '高血压，冠心病'
    },
    records: [
      {
        id: '1',
        timestamp: '20250218140051',
        diagnosis: [
          { type: '高血压', description: '血压控制不佳，需要调整用药' }
        ],
        prescription: [
          {
            medicine: '氨氯地平片',
            manufacturer: '辉瑞制药有限公司',
            specification: '5mg*7片/盒',
            dosage: '5mg',
            frequency: '每日一次',
            days: '30',
            price: '75.00',
            effect: '用于治疗高血压，降低血压'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: '陈勇',
    gender: '男',
    age: '38',
    serialNo: '202005090010',
    cardNo: '202003100017',
    medicalHistory: {
      allergies: '无',
      history: '胃溃疡'
    },
    records: [
      {
        id: '1',
        timestamp: '20250218144023',
        diagnosis: [
          { type: '胃溃疡', description: '胃镜检查示胃窦部溃疡' }
        ],
        prescription: [
          {
            medicine: '奥美拉唑肠溶胶囊',
            manufacturer: '阿斯利康制药有限公司',
            specification: '20mg*14粒/盒',
            dosage: '20mg',
            frequency: '每日两次',
            days: '14',
            price: '48.00',
            effect: '抑制胃酸分泌，促进溃疡愈合'
          }
        ]
      }
    ]
  },
  {
    id: '7',
    name: '杨芳',
    gender: '女',
    age: '29',
    serialNo: '202005090011',
    cardNo: '202003100018',
    medicalHistory: {
      allergies: '红霉素',
      history: '过敏性鼻炎'
    },
    records: [
      {
        id: '1',
        timestamp: '20250218145034',
        diagnosis: [
          { type: '过敏性鼻炎', description: '季节性发作，伴有鼻塞、流涕' }
        ],
        prescription: [
          {
            medicine: '氯雷他定片',
            manufacturer: '拜耳医药保健有限公司',
            specification: '10mg*6片/盒',
            dosage: '10mg',
            frequency: '每日一次',
            days: '14',
            price: '38.50',
            effect: '抗过敏，缓解鼻炎症状'
          }
        ]
      }
    ]
  }
])

// 处理点击行事件
const handleRowClick = (row) => {
  // 存储选中的患者数据到全局状态
  store.setCurrentPatient({
    basicForm: {
      serialNo: row.serialNo,
      cardNo: row.cardNo,
      name: row.name,
      gender: row.gender,
      age: row.age
    },
    medicalHistory: row.medicalHistory,
    medicalRecords: row.records
  })
  
  // 跳转到病历页面
  router.push({
    name: 'history'
  })
}
</script>

<style lang="scss" scoped>
.patient-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #a6c5e8;
  border-radius: 4px;
  background-color: #fff;
  width: 240px; // 设置固定宽度
  
  .list-section {
    min-height: 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #a6c5e8;
    
    &:last-child {
      border-bottom: none;
    }
    
    .section-header {
      padding: 4px 12px;
      background-color: #e6f1fc;
      color: #1e1e1e;
      font-size: 13px;
      border-bottom: 1px solid #a6c5e8;
      flex-shrink: 0;
      height: 24px;
      line-height: 16px;
      display: flex;
      align-items: center;
    }
    
    .table-container {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      
      :deep(.el-table) {
        height: 100%;
        --el-table-border-color: #a6c5e8;
        --el-table-header-bg-color: #f5f7fa;
        --el-table-row-hover-bg-color: #e6f1fc;
        
        // 移除表格的外边距和内边距
        margin: 0;
        padding: 0;
        border: none;
        
        .el-table__row {
          cursor: pointer;
          height: 32px;
          
          &.selected {
            background-color: #e6f1fc;
          }
        }
        
        .el-table__cell {
          padding: 0;
        }

        .cell {
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          padding: 0 2px; // 只保留最小的内边距
        }

        // 确保表格内容区域填满容器
        .el-table__inner-wrapper,
        .el-table__body-wrapper {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        
        // 移除表格边框
        &::before,
        &::after {
          display: none;
        }
      }
    }
  }
}
</style> 