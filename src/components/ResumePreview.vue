<script setup lang="ts">
import { ref } from 'vue';
import type { ResumeData } from '@/types/resume';
import { usePdfGenerator } from '@/composables/usePdfGenerator';

const props = defineProps<{
  resumeData: ResumeData;
}>();

const { generatePdf, generateFileName } = usePdfGenerator();
const resumeRef = ref<HTMLElement | null>(null);
const isGenerating = ref(false);

const handleDownloadPdf = async () => {
  if (!resumeRef.value) return;

  isGenerating.value = true;
  try {
    const fileName = generateFileName(props.resumeData.header.name);
    await generatePdf(resumeRef.value, fileName);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    isGenerating.value = false;
  }
};
</script>

<template>
  <div class="h-full overflow-y-auto bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto space-y-4">
      <!-- Download Button -->
      <div class="flex justify-end">
        <button
          @click="handleDownloadPdf"
          :disabled="isGenerating"
          class="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg"
        >
          {{ isGenerating ? 'Generating PDF...' : 'Download PDF' }}
        </button>
      </div>

      <!-- Resume Preview -->
      <div
        ref="resumeRef"
        class="bg-white shadow-lg rounded-lg p-12 min-h-[11in]"
        style="width: 8.5in;"
      >
        <!-- Header Section -->
        <header class="border-b-2 border-gray-300 pb-4 mb-6">
          <h1 class="text-4xl font-bold text-gray-900 mb-1">
            {{ resumeData.header.name || 'Your Name' }}
          </h1>
          <p class="text-xl text-gray-700 mb-2">
            {{ resumeData.header.title || 'Professional Title' }}
          </p>
          <p class="text-gray-600">
            {{ resumeData.header.email || 'your.email@example.com' }}
          </p>
        </header>

        <!-- Profile Overview Section -->
        <section v-if="resumeData.profileOverview" class="mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Profile Overview
          </h2>
          <p class="text-gray-700 leading-relaxed">
            {{ resumeData.profileOverview }}
          </p>
        </section>

        <!-- Key Highlights Section -->
        <section v-if="resumeData.keyHighlights.some(h => h.trim())" class="mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Key Highlights
          </h2>
          <ul class="list-disc list-outside ml-5 space-y-1">
            <li
              v-for="(highlight, index) in resumeData.keyHighlights.filter(h => h.trim())"
              :key="index"
              class="text-gray-700"
            >
              {{ highlight }}
            </li>
          </ul>
        </section>

        <!-- Professional Experience Section -->
        <section v-if="resumeData.professionalExperience.some(exp => exp.jobTitle || exp.company)" class="mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div class="space-y-4">
            <div
              v-for="(experience, index) in resumeData.professionalExperience.filter(exp => exp.jobTitle || exp.company)"
              :key="index"
              class="mb-4"
            >
              <div class="flex justify-between items-start mb-1">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ experience.jobTitle || 'Job Title' }}
                  </h3>
                  <p class="text-gray-700 font-medium">
                    {{ experience.company || 'Company Name' }}
                  </p>
                </div>
                <p class="text-gray-600 text-sm">
                  {{ experience.duration || 'Duration' }}
                </p>
              </div>
              <ul
                v-if="experience.responsibilities.some(r => r.trim())"
                class="list-disc list-outside ml-5 space-y-1 mt-2"
              >
                <li
                  v-for="(responsibility, respIndex) in experience.responsibilities.filter(r => r.trim())"
                  :key="respIndex"
                  class="text-gray-700"
                >
                  {{ responsibility }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Technical Skills Section -->
        <section v-if="resumeData.technicalSkills.some(skill => skill.category || skill.skills)" class="mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Technical Skills
          </h2>
          <div class="space-y-2">
            <div
              v-for="(skill, index) in resumeData.technicalSkills.filter(s => s.category || s.skills)"
              :key="index"
              class="flex"
            >
              <span class="font-semibold text-gray-900 min-w-[180px]">
                {{ skill.category || 'Category' }}:
              </span>
              <span class="text-gray-700">
                {{ skill.skills || 'Skills' }}
              </span>
            </div>
          </div>
        </section>

        <!-- Project Experience Section -->
        <section v-if="resumeData.projectExperience.some(proj => proj.title || proj.description)" class="mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Project Experience
          </h2>
          <div class="space-y-3">
            <div
              v-for="(project, index) in resumeData.projectExperience.filter(p => p.title || p.description)"
              :key="index"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                {{ project.title || 'Project Title' }}
              </h3>
              <p class="text-gray-700">
                {{ project.description || 'Project description' }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure proper print styling for PDF generation */
@media print {
  .bg-white {
    background-color: white !important;
  }
}
</style>
