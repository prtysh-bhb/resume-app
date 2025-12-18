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
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Professional Resume Builder</h1>
        <p class="text-sm text-gray-600">Auto-saves as you type</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden">
      <div class="h-full flex flex-col lg:flex-row">
        <!-- Left Side - Form -->
        <div class="w-full lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200">
          <ResumeForm
            v-model="resumeData"
            @reset="handleReset"
          />
        </div>

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
