<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  loadExisting: [];
  startFresh: [];
}>();

const handleLoadExisting = () => {
  emit('loadExisting');
};

const handleStartFresh = () => {
  emit('startFresh');
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">
        Welcome Back!
      </h2>
      <p class="text-gray-600 mb-6">
        We found existing resume data. Would you like to continue where you left off or start fresh?
      </p>
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="handleLoadExisting"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Load Existing Data
        </button>
        <button
          @click="handleStartFresh"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Start Fresh
        </button>
      </div>
    </div>
  </div>
</template>
