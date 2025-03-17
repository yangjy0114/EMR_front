import { reactive, readonly } from 'vue'

const state = reactive({
  currentPatient: null,
  aiAnalysisResults: null
})

export function useStore() {
  function setCurrentPatient(patient) {
    state.currentPatient = patient
  }
  
  function setAiAnalysisResults(results) {
    state.aiAnalysisResults = results
  }

  return {
    state: readonly(state),
    setCurrentPatient,
    setAiAnalysisResults
  }
} 