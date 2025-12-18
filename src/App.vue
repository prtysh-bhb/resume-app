<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LoadDataModal from './components/LoadDataModal.vue';
import ResumeForm from './components/ResumeForm.vue';
import ResumePreview from './components/ResumePreview.vue';
import { useLocalStorage } from './composables/useLocalStorage';
import { getDefaultResumeData } from './types/resume';
import type { ResumeData } from './types/resume';

const {
  loadFromLocalStorage,
  clearLocalStorage,
  hasStoredData,
  setupAutoSave
} = useLocalStorage();

const resumeData = ref<ResumeData>(getDefaultResumeData());
const showLoadModal = ref(false);

onMounted(() => {
  // Check if there's existing data in localStorage
  if (hasStoredData()) {
    showLoadModal.value = true;
  } else {
    // Set up auto-save for new users
    setupAutoSave(resumeData);
  }
});

const handleLoadExisting = () => {
  const storedData = loadFromLocalStorage();
  if (storedData) {
    resumeData.value = storedData;
  }
  showLoadModal.value = false;
  setupAutoSave(resumeData);
};

const handleStartFresh = () => {
  clearLocalStorage();
  resumeData.value = getDefaultResumeData();
  showLoadModal.value = false;
  setupAutoSave(resumeData);
};

const handleReset = () => {
  clearLocalStorage();
  resumeData.value = getDefaultResumeData();
};
</script>

<template>
  <div class="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-elegant border-b border-gray-200">
      <div class="max-w-screen-2xl mx-auto px-6 py-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center shadow-elegant">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Resume Builder</h1>
              <p class="text-xs text-gray-500">Create professional resumes in minutes</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-1.5 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-xs font-medium">Auto-saved</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden">
      <div class="h-full flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
        <!-- Left Side - Form -->
        <div class="w-full lg:w-1/2 h-1/2 lg:h-full">
          <ResumeForm
            v-model="resumeData"
            @reset="handleReset"
          />
        </div>

        <!-- Divider -->
        <div class="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

        <!-- Right Side - Preview -->
        <div class="w-full lg:w-1/2 h-1/2 lg:h-full">
          <ResumePreview :resume-data="resumeData" />
        </div>
      </div>
    </main>

    <!-- Load Data Modal -->
    <LoadDataModal
      :show="showLoadModal"
      @load-existing="handleLoadExisting"
      @start-fresh="handleStartFresh"
    />
  </div>
</template>
