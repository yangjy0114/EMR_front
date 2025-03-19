import { reactive, readonly } from 'vue'

const state = reactive({
  currentPatient: null,
  aiAnalysisResults: null,
  currentUser: null
})

export function useStore() {
  function setCurrentPatient(patient) {
    state.currentPatient = patient
  }
  
  function setAiAnalysisResults(results) {
    state.aiAnalysisResults = results
  }
  
  function setCurrentUser(user) {
    state.currentUser = user
  }
  
  function clearCurrentUser() {
    state.currentUser = null
  }

  return {
    state: readonly(state),
    setCurrentPatient,
    setAiAnalysisResults,
    setCurrentUser,
    clearCurrentUser
  }
} 