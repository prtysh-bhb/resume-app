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
  <div class="h-full overflow-y-auto bg-gradient-to-br from-gray-100 to-gray-200 p-8">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Download Button -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Live Preview</h2>
          <p class="text-sm text-gray-600 mt-1">Your resume updates in real-time</p>
        </div>
        <button
          @click="handleDownloadPdf"
          :disabled="isGenerating"
          class="btn-primary shadow-elegant-lg"
        >
          <svg v-if="!isGenerating" class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <svg v-else class="animate-spin w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isGenerating ? 'Generating PDF...' : 'Download PDF' }}
        </button>
      </div>

      <!-- Resume Preview -->
      <div class="bg-white shadow-elegant-xl rounded-lg overflow-hidden">
        <div
          ref="resumeRef"
          class="bg-white p-16 resume-content"
          style="width: 8.5in; min-height: 11in;"
        >
          <!-- Header Section -->
          <header class="mb-8 pb-6 border-b-2 border-gray-800">
            <h1 class="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              {{ resumeData.header.name || 'Your Name' }}
            </h1>
            <p class="text-xl text-gray-700 font-medium mb-3">
              {{ resumeData.header.title || 'Professional Title' }}
            </p>
            <p class="text-gray-600 font-medium">
              {{ resumeData.header.email || 'your.email@example.com' }}
            </p>
          </header>

          <!-- Profile Overview Section -->
          <section v-if="resumeData.profileOverview" class="mb-7">
            <h2 class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b-2 border-gray-300 pb-1">
              Professional Summary
            </h2>
            <p class="text-gray-800 leading-relaxed text-justify">
              {{ resumeData.profileOverview }}
            </p>
          </section>

          <!-- Key Highlights Section -->
          <section v-if="resumeData.keyHighlights.some(h => h.trim())" class="mb-7">
            <h2 class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b-2 border-gray-300 pb-1">
              Key Highlights
            </h2>
            <ul class="space-y-2">
              <li
                v-for="(highlight, index) in resumeData.keyHighlights.filter(h => h.trim())"
                :key="index"
                class="text-gray-800 flex items-start"
              >
                <span class="inline-block w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span class="flex-1">{{ highlight }}</span>
              </li>
            </ul>
          </section>

          <!-- Professional Experience Section -->
          <section v-if="resumeData.professionalExperience.some(exp => exp.jobTitle || exp.company)" class="mb-7">
            <h2 class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b-2 border-gray-300 pb-1">
              Professional Experience
            </h2>
            <div class="space-y-5">
              <div
                v-for="(experience, index) in resumeData.professionalExperience.filter(exp => exp.jobTitle || exp.company)"
                :key="index"
                class="experience-item"
              >
                <div class="flex justify-between items-baseline mb-2">
                  <div class="flex-1">
                    <h3 class="text-base font-bold text-gray-900">
                      {{ experience.jobTitle || 'Job Title' }}
                    </h3>
                    <p class="text-gray-700 font-semibold">
                      {{ experience.company || 'Company Name' }}
                    </p>
                  </div>
                  <p class="text-gray-600 text-sm font-medium whitespace-nowrap ml-4">
                    {{ experience.duration || 'Duration' }}
                  </p>
                </div>
                <ul
                  v-if="experience.responsibilities.some(r => r.trim())"
                  class="space-y-1.5 mt-2"
                >
                  <li
                    v-for="(responsibility, respIndex) in experience.responsibilities.filter(r => r.trim())"
                    :key="respIndex"
                    class="text-gray-800 flex items-start text-sm"
                  >
                    <span class="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span class="flex-1">{{ responsibility }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Technical Skills Section -->
          <section v-if="resumeData.technicalSkills.some(skill => skill.category || skill.skills)" class="mb-7">
            <h2 class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b-2 border-gray-300 pb-1">
              Technical Skills
            </h2>
            <div class="space-y-2.5">
              <div
                v-for="(skill, index) in resumeData.technicalSkills.filter(s => s.category || s.skills)"
                :key="index"
                class="flex text-sm"
              >
                <span class="font-bold text-gray-900 min-w-[160px] flex-shrink-0">
                  {{ skill.category || 'Category' }}:
                </span>
                <span class="text-gray-800 flex-1">
                  {{ skill.skills || 'Skills' }}
                </span>
              </div>
            </div>
          </section>

          <!-- Project Experience Section -->
          <section v-if="resumeData.projectExperience.some(proj => proj.title || proj.description)" class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b-2 border-gray-300 pb-1">
              Project Experience
            </h2>
            <div class="space-y-4">
              <div
                v-for="(project, index) in resumeData.projectExperience.filter(p => p.title || p.description)"
                :key="index"
              >
                <h3 class="text-base font-bold text-gray-900 mb-1">
                  {{ project.title || 'Project Title' }}
                </h3>
                <p class="text-gray-800 text-sm">
                  {{ project.description || 'Project description' }}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resume-content {
  font-family: 'Georgia', 'Cambria', 'Times New Roman', serif;
  line-height: 1.5;
}

.resume-content h1,
.resume-content h2,
.resume-content h3 {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Ensure proper page breaks for PDF */
.experience-item {
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Print styles for better PDF generation */
@media print {
  body {
    margin: 0;
    padding: 0;
  }

  .resume-content {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0.75in;
    box-shadow: none;
  }
}
</style>
