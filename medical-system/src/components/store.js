import { reactive, readonly } from 'vue'

const state = reactive({
  currentPatient: null
})

export function useStore() {
  function setCurrentPatient(patient) {
    state.currentPatient = patient
  }

  return {
    state: readonly(state),
    setCurrentPatient
  }
} 