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
  <div class="h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div class="max-w-4xl mx-auto space-y-4">
      <!-- Download Button -->
      <div class="flex justify-between items-center mb-2">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Live Preview</h2>
          <p class="text-xs text-gray-600 mt-0.5">Updates in real-time</p>
        </div>
        <button
          @click="handleDownloadPdf"
          :disabled="isGenerating"
          class="btn-primary shadow-elegant-lg flex items-center"
        >
          <svg v-if="!isGenerating" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <svg v-else class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm">{{ isGenerating ? 'Generating...' : 'Download PDF' }}</span>
        </button>
      </div>

      <!-- Resume Preview Card -->
      <div class="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        <div
          ref="resumeRef"
          class="resume-container bg-white"
        >
          <!-- Header Section -->
          <header class="header-section">
            <h1 class="resume-name">
              {{ resumeData.header.name || 'Your Name' }}
            </h1>
            <p class="resume-title">
              {{ resumeData.header.title || 'Professional Title' }}
            </p>
            <p class="resume-email">
              {{ resumeData.header.email || 'your.email@example.com' }}
            </p>
          </header>

          <!-- Profile Overview Section -->
          <section v-if="resumeData.profileOverview" class="resume-section">
            <h2 class="section-heading">Professional Summary</h2>
            <p class="section-content">
              {{ resumeData.profileOverview }}
            </p>
          </section>

          <!-- Key Highlights Section -->
          <section v-if="resumeData.keyHighlights.some(h => h.trim())" class="resume-section">
            <h2 class="section-heading">Key Highlights</h2>
            <ul class="highlights-list">
              <li
                v-for="(highlight, index) in resumeData.keyHighlights.filter(h => h.trim())"
                :key="index"
                class="highlight-item"
              >
                {{ highlight }}
              </li>
            </ul>
          </section>

          <!-- Professional Experience Section -->
          <section v-if="resumeData.professionalExperience.some(exp => exp.jobTitle || exp.company)" class="resume-section">
            <h2 class="section-heading">Professional Experience</h2>
            <div class="experience-container">
              <div
                v-for="(experience, index) in resumeData.professionalExperience.filter(exp => exp.jobTitle || exp.company)"
                :key="index"
                class="experience-item"
              >
                <div class="experience-header">
                  <div class="experience-info">
                    <h3 class="job-title">{{ experience.jobTitle || 'Job Title' }}</h3>
                    <p class="company-name">{{ experience.company || 'Company Name' }}</p>
                  </div>
                  <p class="job-duration">{{ experience.duration || 'Duration' }}</p>
                </div>
                <ul
                  v-if="experience.responsibilities.some(r => r.trim())"
                  class="responsibilities-list"
                >
                  <li
                    v-for="(responsibility, respIndex) in experience.responsibilities.filter(r => r.trim())"
                    :key="respIndex"
                    class="responsibility-item"
                  >
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Technical Skills Section -->
          <section v-if="resumeData.technicalSkills.some(skill => skill.category || skill.skills)" class="resume-section">
            <h2 class="section-heading">Technical Skills</h2>
            <div class="skills-container">
              <div
                v-for="(skill, index) in resumeData.technicalSkills.filter(s => s.category || s.skills)"
                :key="index"
                class="skill-row"
              >
                <span class="skill-category">{{ skill.category || 'Category' }}:</span>
                <span class="skill-list">{{ skill.skills || 'Skills' }}</span>
              </div>
            </div>
          </section>

          <!-- Project Experience Section -->
          <section v-if="resumeData.projectExperience.some(proj => proj.title || proj.description)" class="resume-section last-section">
            <h2 class="section-heading">Project Experience</h2>
            <div class="projects-container">
              <div
                v-for="(project, index) in resumeData.projectExperience.filter(p => p.title || p.description)"
                :key="index"
                class="project-item"
              >
                <h3 class="project-title">{{ project.title || 'Project Title' }}</h3>
                <p class="project-description">{{ project.description || 'Project description' }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Resume Container */
.resume-container {
  width: 8.5in;
  padding: 0.65in 0.75in;
  margin: 0 auto;
  font-family: 'Georgia', 'Cambria', 'Times New Roman', serif;
  color: #1a1a1a;
  line-height: 1.5;
  background: white;
}

/* Header Section */
.header-section {
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2.5px solid #1a1a1a;
}

.resume-name {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.375rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.resume-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.resume-email {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

/* Section Styles */
.resume-section {
  margin-bottom: 1.25rem;
}

.last-section {
  margin-bottom: 0;
}

.section-heading {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.625rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #94a3b8;
}

.section-content {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #1e293b;
  text-align: justify;
}

/* Highlights */
.highlights-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.highlight-item {
  font-size: 0.875rem;
  color: #1e293b;
  margin-bottom: 0.375rem;
  padding-left: 1rem;
  position: relative;
  line-height: 1.55;
}

.highlight-item::before {
  content: '•';
  position: absolute;
  left: 0;
  font-weight: 700;
  color: #0f172a;
}

/* Experience */
.experience-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.experience-item {
  page-break-inside: avoid;
  break-inside: avoid;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.experience-info {
  flex: 1;
}

.job-title {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.company-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  line-height: 1.3;
}

.job-duration {
  font-size: 0.8125rem;
  color: #64748b;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.responsibilities-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibility-item {
  font-size: 0.875rem;
  color: #1e293b;
  margin-bottom: 0.3rem;
  padding-left: 0.875rem;
  position: relative;
  line-height: 1.55;
}

.responsibility-item::before {
  content: '◦';
  position: absolute;
  left: 0;
  color: #475569;
  font-weight: 700;
}

/* Skills */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-row {
  font-size: 0.875rem;
  display: flex;
  line-height: 1.5;
}

.skill-category {
  font-weight: 700;
  color: #0f172a;
  min-width: 9rem;
  flex-shrink: 0;
}

.skill-list {
  color: #1e293b;
  flex: 1;
}

/* Projects */
.projects-container {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.project-item {
  page-break-inside: avoid;
  break-inside: avoid;
}

.project-title {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.375rem;
  line-height: 1.3;
}

.project-description {
  font-size: 0.875rem;
  color: #1e293b;
  line-height: 1.55;
}

/* Print styles for PDF */
@media print {
  .resume-container {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0.65in 0.75in !important;
    box-shadow: none;
  }
}

/* Page break controls */
section {
  page-break-inside: avoid;
  break-inside: avoid;
}
</style>
