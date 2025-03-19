<template>
  <div class="nav-container">
    <!-- 主导航栏 -->
    <div class="main-nav">
      <el-menu mode="horizontal" :default-active="activeIndex" class="main-menu">
        <el-menu-item index="1">设置</el-menu-item>
        <el-menu-item index="2">门诊挂号</el-menu-item>
        <el-menu-item index="3">门诊医生</el-menu-item>
        <el-menu-item index="4">门诊收费</el-menu-item>
        <el-menu-item index="5">出入院</el-menu-item>
        <el-menu-item index="6">养老入住</el-menu-item>
        <el-menu-item index="7">护士站</el-menu-item>
        <el-menu-item index="8">住院医生</el-menu-item>
        <el-menu-item index="9">辅助科室</el-menu-item>
        <el-menu-item index="10">LIS</el-menu-item>
        <el-menu-item index="11">体检</el-menu-item>
        <el-menu-item index="12">药房</el-menu-item>
        <el-menu-item index="13">物资</el-menu-item>
        <el-menu-item index="14">输血</el-menu-item>
        <el-menu-item index="15">报表中心</el-menu-item>
        <el-menu-item index="16">设备</el-menu-item>
        <el-menu-item index="17">窗口</el-menu-item>
      </el-menu>
    </div>

    <!-- 子导航栏 -->
    <div class="sub-nav">
      <!-- 第一行：导航按钮组 -->
      <div class="nav-row">
        <el-button-group>
          <el-button 
            type="primary" 
            :class="{ active: activeSubNav === 'history' }" 
            @click="handleNavClick('history')"
          >
            <el-icon><Document /></el-icon>查看病历
          </el-button>
          <el-button 
            type="primary" 
            :class="{ active: activeSubNav === 'ai' }" 
            @click="handleNavClick('ai')"
          >
            <el-icon><Monitor /></el-icon>AI辅助
          </el-button>
          <el-button 
            type="primary" 
            :class="{ active: activeSubNav === 'new' }" 
            @click="handleNavClick('new')"
          >
            <el-icon><Edit /></el-icon>添加病历
          </el-button>
        </el-button-group>
      </div>

      <!-- 第二行：功能按钮组 -->
      <div class="nav-row">
        <el-button-group>
          <el-button size="small">
            <el-icon><Plus /></el-icon>叫号
          </el-button>
          <el-button size="small">
            <el-icon><Delete /></el-icon>清空
          </el-button>
          <el-button size="small">
            <el-icon><Document /></el-icon>保存
          </el-button>
          <el-button size="small">
            <el-icon><Setting /></el-icon>作废
          </el-button>
          <el-button size="small">
            <el-icon><List /></el-icon>套餐模板
          </el-button>
          <el-button size="small">
            <el-icon><Timer /></el-icon>就诊辅助
          </el-button>
          <el-button size="small">
            <el-icon><Printer /></el-icon>打印
          </el-button>
          <el-button size="small">
            <el-icon><Location /></el-icon>我的位置
          </el-button>
          <el-button size="small">
            <el-icon><VideoCamera /></el-icon>视频会议
          </el-button>
          <el-button size="small">
            <el-icon><Document /></el-icon>查看检查申请单
          </el-button>
          <el-button size="small">
            <el-icon><Document /></el-icon>报告中心
          </el-button>
          <el-button size="small">
            <el-icon><Star /></el-icon>特殊操作
          </el-button>
          <el-button size="small">
            <el-icon><Clock /></el-icon>预约(F120)
          </el-button>
          <el-button size="small">
            <el-icon><More /></el-icon>其它操作
          </el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 用户信息区域 -->
    <div class="user-info">
      <el-dropdown @command="handleCommand" trigger="click">
        <div class="user-dropdown-link">
          <el-avatar 
            :size="28" 
            :src="store.state.currentUser?.avatar"
            :icon="UserFilled"
          />
          <span class="user-name">{{ store.state.currentUser?.realName }}</span>
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="password">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Document, Monitor, Edit,
  Plus, Delete, Setting, List,
  Timer, Printer, Location, VideoCamera,
  Star, Clock, More, UserFilled, ArrowDown
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const route = useRoute()
const activeIndex = ref('3')
const activeSubNav = ref('history')
const store = useStore()

const handleNavClick = (type) => {
  activeSubNav.value = type
  switch(type) {
    case 'history':
      router.push('/')
      break
    case 'ai':
      router.push('/ai-assist')
      break
    case 'new':
      router.push('/new-record')
      break
  }
}

const handleCommand = (command) => {
  switch (command) {
    case 'logout':
      // 清除用户信息
      store.clearCurrentUser()
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      router.push('/login')
      break
    // 其他命令的处理...
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  position: relative;  // 确保子元素的绝对定位相对于这个容器
  
  .main-nav {
    .main-menu {
      background-color: #4a7eca;
      border: none;
      padding: 0 10px;
      height: 32px;
      
      :deep(.el-menu-item) {
        height: 32px;
        line-height: 32px;
        color: white;
        padding: 0 12px;
        font-size: 14px;
        
        &:hover, &.is-active {
          background-color: #2c5499 !important;
          color: #ffffff !important;
          border-bottom: none;
          box-shadow: inset 0 -2px 0 #ffffff;
        }
        
        &.is-active {
          font-weight: bold;
        }
      }
    }
  }
  
  .sub-nav {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
    background-color: #f0f2f5;
    
    .nav-row {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .el-button {
        padding: 5px 8px;
        margin-left: 2px;
        height: 28px;
        font-size: 12px;

        .el-icon {
          margin-right: 3px;
        }
      }
    }
  }

  .user-info {
    position: absolute;
    right: 20px;
    top: 0;  // 改为顶部对齐
    height: 32px;  // 与顶部导航栏高度一致
    display: flex;
    align-items: center;
    
    .user-dropdown-link {
      display: flex;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.1);  // 半透明白色背景
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);  // 悬停时背景色加深
      }
      
      .el-avatar {
        margin-right: 6px;  // 减小头像和名字的间距
      }
      
      .user-name {
        margin: 0 4px;  // 减小名字和箭头的间距
        color: #fff;
        font-size: 14px;
      }
      
      .el-icon--right {
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style> 