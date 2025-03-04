import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import PatientHistory from '../views/PatientHistory.vue'
import PatientDetailView from '../views/PatientDetailView.vue'
import NewMedicalRecord from '../views/NewMedicalRecord.vue'
import Prescription from '../views/Prescription.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
          path: 'image-analysis',
          name: 'imageAnalysis',
          component: PatientDetailView
        },
        {
          path: 'new-record',
          name: 'newRecord',
          component: NewMedicalRecord
        },
        {
          path: 'prescription',
          name: 'prescription',
          component: Prescription
        }
      ]
    }
  ]
})

export default router
