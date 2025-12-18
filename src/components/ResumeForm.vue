<script setup lang="ts">
import { ref } from 'vue';
import type { ResumeData } from '@/types/resume';

const props = defineProps<{
  modelValue: ResumeData;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: ResumeData];
  reset: [];
}>();

const showResetConfirm = ref(false);

const updateData = (updates: Partial<ResumeData>) => {
  emit('update:modelValue', { ...props.modelValue, ...updates });
};

// Header updates
const updateHeader = (field: keyof ResumeData['header'], value: string) => {
  updateData({
    header: { ...props.modelValue.header, [field]: value }
  });
};

// Profile Overview
const updateProfileOverview = (value: string) => {
  updateData({ profileOverview: value });
};

// Key Highlights
const addHighlight = () => {
  updateData({
    keyHighlights: [...props.modelValue.keyHighlights, '']
  });
};

const updateHighlight = (index: number, value: string) => {
  const highlights = [...props.modelValue.keyHighlights];
  highlights[index] = value;
  updateData({ keyHighlights: highlights });
};

const removeHighlight = (index: number) => {
  updateData({
    keyHighlights: props.modelValue.keyHighlights.filter((_, i) => i !== index)
  });
};

// Professional Experience
const addExperience = () => {
  updateData({
    professionalExperience: [
      ...props.modelValue.professionalExperience,
      { jobTitle: '', company: '', duration: '', responsibilities: [''] }
    ]
  });
};

const updateExperience = (index: number, field: string, value: string) => {
  const experiences = [...props.modelValue.professionalExperience];
  experiences[index] = { ...experiences[index], [field]: value };
  updateData({ professionalExperience: experiences });
};

const addResponsibility = (expIndex: number) => {
  const experiences = [...props.modelValue.professionalExperience];
  experiences[expIndex].responsibilities.push('');
  updateData({ professionalExperience: experiences });
};

const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
  const experiences = [...props.modelValue.professionalExperience];
  experiences[expIndex].responsibilities[respIndex] = value;
  updateData({ professionalExperience: experiences });
};

const removeResponsibility = (expIndex: number, respIndex: number) => {
  const experiences = [...props.modelValue.professionalExperience];
  experiences[expIndex].responsibilities = experiences[expIndex].responsibilities.filter((_, i) => i !== respIndex);
  updateData({ professionalExperience: experiences });
};

const removeExperience = (index: number) => {
  updateData({
    professionalExperience: props.modelValue.professionalExperience.filter((_, i) => i !== index)
  });
};

// Technical Skills
const addSkillCategory = () => {
  updateData({
    technicalSkills: [...props.modelValue.technicalSkills, { category: '', skills: '' }]
  });
};

const updateSkillCategory = (index: number, field: 'category' | 'skills', value: string) => {
  const skills = [...props.modelValue.technicalSkills];
  skills[index] = { ...skills[index], [field]: value };
  updateData({ technicalSkills: skills });
};

const removeSkillCategory = (index: number) => {
  updateData({
    technicalSkills: props.modelValue.technicalSkills.filter((_, i) => i !== index)
  });
};

// Project Experience
const addProject = () => {
  updateData({
    projectExperience: [...props.modelValue.projectExperience, { title: '', description: '' }]
  });
};

const updateProject = (index: number, field: 'title' | 'description', value: string) => {
  const projects = [...props.modelValue.projectExperience];
  projects[index] = { ...projects[index], [field]: value };
  updateData({ projectExperience: projects });
};

const removeProject = (index: number) => {
  updateData({
    projectExperience: props.modelValue.projectExperience.filter((_, i) => i !== index)
  });
};

// Reset functionality
const handleReset = () => {
  showResetConfirm.value = true;
};

const confirmReset = () => {
  emit('reset');
  showResetConfirm.value = false;
};

const cancelReset = () => {
  showResetConfirm.value = false;
};
</script>

<template>
  <div class="h-full overflow-y-auto bg-gray-50">
    <div class="max-w-4xl mx-auto p-6 space-y-6">
      <!-- Header with Reset Button -->
      <div class="flex justify-between items-center sticky top-0 bg-gray-50 z-10 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Resume Details</h2>
          <p class="text-sm text-gray-500 mt-1">Fill in your information below</p>
        </div>
        <button
          @click="handleReset"
          class="btn-danger text-sm"
        >
          <svg class="w-4 h-4 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Reset All
        </button>
      </div>

      <!-- Personal Information Section -->
      <section class="section-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Personal Information
        </h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              :value="modelValue.header.name"
              @input="updateHeader('name', ($event.target as HTMLInputElement).value)"
              placeholder="John Doe"
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Professional Title <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              :value="modelValue.header.title"
              @input="updateHeader('title', ($event.target as HTMLInputElement).value)"
              placeholder="Senior Software Engineer"
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              :value="modelValue.header.email"
              @input="updateHeader('email', ($event.target as HTMLInputElement).value)"
              placeholder="john.doe@email.com"
              class="input-field"
            />
          </div>
        </div>
      </section>

      <!-- Profile Overview Section -->
      <section class="section-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Profile Overview
        </h3>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary
          </label>
          <textarea
            :value="modelValue.profileOverview"
            @input="updateProfileOverview(($event.target as HTMLTextAreaElement).value)"
            placeholder="Write a compelling summary highlighting your expertise, achievements, and career goals..."
            rows="4"
            class="input-field resize-none"
          ></textarea>
        </div>
      </section>

      <!-- Key Highlights Section -->
      <section class="section-card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Key Highlights
          </h3>
          <button
            @click="addHighlight"
            class="btn-secondary text-sm py-2 px-4"
          >
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Highlight
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="(highlight, index) in modelValue.keyHighlights"
            :key="index"
            class="flex gap-2"
          >
            <input
              type="text"
              :value="highlight"
              @input="updateHighlight(index, ($event.target as HTMLInputElement).value)"
              placeholder="Key achievement or highlight..."
              class="flex-1 input-field"
            />
            <button
              v-if="modelValue.keyHighlights.length > 1"
              @click="removeHighlight(index)"
              class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors border border-red-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Professional Experience Section -->
      <section class="section-card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Professional Experience
          </h3>
          <button
            @click="addExperience"
            class="btn-secondary text-sm py-2 px-4"
          >
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Experience
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(experience, expIndex) in modelValue.professionalExperience"
            :key="expIndex"
            class="border border-gray-200 rounded-xl p-5 bg-gray-50 space-y-4"
          >
            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
              <h4 class="font-medium text-gray-900">Experience {{ expIndex + 1 }}</h4>
              <button
                v-if="modelValue.professionalExperience.length > 1"
                @click="removeExperience(expIndex)"
                class="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  :value="experience.jobTitle"
                  @input="updateExperience(expIndex, 'jobTitle', ($event.target as HTMLInputElement).value)"
                  placeholder="Senior Software Engineer"
                  class="input-field"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  :value="experience.company"
                  @input="updateExperience(expIndex, 'company', ($event.target as HTMLInputElement).value)"
                  placeholder="Tech Company Inc."
                  class="input-field"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                :value="experience.duration"
                @input="updateExperience(expIndex, 'duration', ($event.target as HTMLInputElement).value)"
                placeholder="Jan 2020 - Present"
                class="input-field"
              />
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="block text-sm font-medium text-gray-700">Responsibilities</label>
                <button
                  @click="addResponsibility(expIndex)"
                  class="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                >
                  + Add
                </button>
              </div>

              <div
                v-for="(responsibility, respIndex) in experience.responsibilities"
                :key="respIndex"
                class="flex gap-2"
              >
                <input
                  type="text"
                  :value="responsibility"
                  @input="updateResponsibility(expIndex, respIndex, ($event.target as HTMLInputElement).value)"
                  placeholder="Responsibility or achievement..."
                  class="flex-1 input-field"
                />
                <button
                  v-if="experience.responsibilities.length > 1"
                  @click="removeResponsibility(expIndex, respIndex)"
                  class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors border border-red-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Skills Section -->
      <section class="section-card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Technical Skills
          </h3>
          <button
            @click="addSkillCategory"
            class="btn-secondary text-sm py-2 px-4"
          >
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Category
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(skill, index) in modelValue.technicalSkills"
            :key="index"
            class="border border-gray-200 rounded-xl p-5 bg-gray-50 space-y-3"
          >
            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
              <h4 class="font-medium text-gray-900">Category {{ index + 1 }}</h4>
              <button
                v-if="modelValue.technicalSkills.length > 1"
                @click="removeSkillCategory(index)"
                class="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                :value="skill.category"
                @input="updateSkillCategory(index, 'category', ($event.target as HTMLInputElement).value)"
                placeholder="Programming Languages"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                :value="skill.skills"
                @input="updateSkillCategory(index, 'skills', ($event.target as HTMLInputElement).value)"
                placeholder="JavaScript, TypeScript, Python, Java"
                class="input-field"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Project Experience Section -->
      <section class="section-card mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Project Experience
          </h3>
          <button
            @click="addProject"
            class="btn-secondary text-sm py-2 px-4"
          >
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Project
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(project, index) in modelValue.projectExperience"
            :key="index"
            class="border border-gray-200 rounded-xl p-5 bg-gray-50 space-y-3"
          >
            <div class="flex justify-between items-center pb-3 border-b border-gray-200">
              <h4 class="font-medium text-gray-900">Project {{ index + 1 }}</h4>
              <button
                v-if="modelValue.projectExperience.length > 1"
                @click="removeProject(index)"
                class="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
              <input
                type="text"
                :value="project.title"
                @input="updateProject(index, 'title', ($event.target as HTMLInputElement).value)"
                placeholder="E-commerce Platform"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                :value="project.description"
                @input="updateProject(index, 'description', ($event.target as HTMLTextAreaElement).value)"
                placeholder="Brief description of the project and your role..."
                rows="3"
                class="input-field resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Reset Confirmation Modal -->
    <Transition name="modal">
      <div
        v-if="showResetConfirm"
        class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-2xl shadow-elegant-xl max-w-md w-full p-8">
          <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mb-3 text-center">
            Confirm Reset
          </h2>
          <p class="text-gray-600 mb-8 text-center leading-relaxed">
            Are you sure you want to reset all data? This action cannot be undone and all your progress will be lost.
          </p>

          <div class="flex gap-3">
            <button
              @click="confirmReset"
              class="flex-1 btn-danger py-3"
            >
              Yes, Reset All
            </button>
            <button
              @click="cancelReset"
              class="flex-1 btn-secondary py-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
  opacity: 0;
}
</style>
