import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import PatientHistory from '../views/PatientHistory.vue'
import PatientDetailView from '../views/PatientDetailView.vue'
import NewMedicalRecord from '../views/NewMedicalRecord.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '',
          name: 'history',
          component: PatientHistory
        },
        {
          path: 'ai-assist',
          name: 'aiAssist',
          component: PatientDetailView
        },
        {
          path: 'new-record',
          name: 'newRecord',
          component: NewMedicalRecord
        }
      ]
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.path !== '/login' && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router
