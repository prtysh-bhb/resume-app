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
  <div class="h-full overflow-y-auto bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <button
          @click="handleReset"
          class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Reset All
        </button>
      </div>

      <!-- Personal Information Section -->
      <section class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            :value="modelValue.header.name"
            @input="updateHeader('name', ($event.target as HTMLInputElement).value)"
            placeholder="John Doe"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </section>

      <!-- Profile Overview Section -->
      <section class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Profile Overview</h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary
          </label>
          <textarea
            :value="modelValue.profileOverview"
            @input="updateProfileOverview(($event.target as HTMLTextAreaElement).value)"
            placeholder="Brief professional summary highlighting your expertise and career goals..."
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>
        </div>
      </section>

      <!-- Key Highlights Section -->
      <section class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Key Highlights</h2>
          <button
            @click="addHighlight"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            + Add Highlight
          </button>
        </div>

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
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            v-if="modelValue.keyHighlights.length > 1"
            @click="removeHighlight(index)"
            class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            Remove
          </button>
        </div>
      </section>

      <!-- Professional Experience Section -->
      <section class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Professional Experience</h2>
          <button
            @click="addExperience"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            + Add Experience
          </button>
        </div>

        <div
          v-for="(experience, expIndex) in modelValue.professionalExperience"
          :key="expIndex"
          class="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-gray-900">Experience {{ expIndex + 1 }}</h3>
            <button
              v-if="modelValue.professionalExperience.length > 1"
              @click="removeExperience(expIndex)"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove Experience
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
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                :value="experience.company"
                @input="updateExperience(expIndex, 'company', ($event.target as HTMLInputElement).value)"
                placeholder="Tech Company Inc."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-medium text-gray-700">Responsibilities</label>
              <button
                @click="addResponsibility(expIndex)"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Responsibility
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
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                v-if="experience.responsibilities.length > 1"
                @click="removeResponsibility(expIndex, respIndex)"
                class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Skills Section -->
      <section class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Technical Skills</h2>
          <button
            @click="addSkillCategory"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            + Add Category
          </button>
        </div>

        <div
          v-for="(skill, index) in modelValue.technicalSkills"
          :key="index"
          class="border border-gray-200 rounded-lg p-4 space-y-3"
        >
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-gray-900">Category {{ index + 1 }}</h3>
            <button
              v-if="modelValue.technicalSkills.length > 1"
              @click="removeSkillCategory(index)"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove Category
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              :value="skill.category"
              @input="updateSkillCategory(index, 'category', ($event.target as HTMLInputElement).value)"
              placeholder="Programming Languages"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
            <input
              type="text"
              :value="skill.skills"
              @input="updateSkillCategory(index, 'skills', ($event.target as HTMLInputElement).value)"
              placeholder="JavaScript, TypeScript, Python, Java"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      <!-- Project Experience Section -->
      <section class="bg-white rounded-lg shadow-sm p-6 space-y-4 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Project Experience</h2>
          <button
            @click="addProject"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            + Add Project
          </button>
        </div>

        <div
          v-for="(project, index) in modelValue.projectExperience"
          :key="index"
          class="border border-gray-200 rounded-lg p-4 space-y-3"
        >
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-gray-900">Project {{ index + 1 }}</h3>
            <button
              v-if="modelValue.projectExperience.length > 1"
              @click="removeProject(index)"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove Project
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
            <input
              type="text"
              :value="project.title"
              @input="updateProject(index, 'title', ($event.target as HTMLInputElement).value)"
              placeholder="E-commerce Platform"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              :value="project.description"
              @input="updateProject(index, 'description', ($event.target as HTMLTextAreaElement).value)"
              placeholder="Brief description of the project and your role..."
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            ></textarea>
          </div>
        </div>
      </section>
    </div>

    <!-- Reset Confirmation Modal -->
    <div
      v-if="showResetConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Confirm Reset
        </h2>
        <p class="text-gray-600 mb-6">
          Are you sure you want to reset all data? This action cannot be undone.
        </p>
        <div class="flex gap-3">
          <button
            @click="confirmReset"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Yes, Reset All
          </button>
          <button
            @click="cancelReset"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
