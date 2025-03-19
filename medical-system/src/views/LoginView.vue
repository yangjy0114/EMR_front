<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>医疗系统登录</h2>
      </div>
      <div class="login-form">
        <el-form 
          ref="formRef"
          :model="loginForm"
          :rules="rules"
          label-width="0"
          size="large"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary" 
              :loading="loading"
              style="width: 100%"
              @click="handleLogin"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useStore } from '../components/store'

const router = useRouter()
const store = useStore()
const formRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 模拟用户数据
const mockUsers = [
  {
    username: 'doctor1',
    password: '123456',
    realName: '张医生',
    department: '眼科',
    avatar: ''
  },
  {
    username: 'doctor2',
    password: '123456',
    realName: '李医生',
    department: '眼科',
    avatar: ''
  }
]

const handleLogin = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    
    loading.value = true
    
    // 模拟登录请求
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.username === loginForm.username && u.password === loginForm.password
      )
      
      if (user) {
        // 保存用户信息到 store
        store.setCurrentUser({
          ...user,
          token: 'mock-token-' + Date.now()
        })
        
        // 保存到 localStorage
        localStorage.setItem('userInfo', JSON.stringify(user))
        localStorage.setItem('token', 'mock-token-' + Date.now())
        
        ElMessage.success('登录成功')
        router.push('/')
      } else {
        ElMessage.error('用户名或密码错误')
      }
      
      loading.value = false
    }, 1000)
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .login-box {
    width: 400px;
    padding: 30px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    
    .login-header {
      text-align: center;
      margin-bottom: 30px;
      
      h2 {
        color: #303133;
        font-weight: 500;
      }
    }
    
    .login-form {
      .el-form-item {
        margin-bottom: 25px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
      
      :deep(.el-input__wrapper) {
        background-color: #f5f7fa;
      }
      
      :deep(.el-input__prefix) {
        color: #909399;
      }
    }
  }
}
</style> 