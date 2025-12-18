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
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-2xl shadow-elegant-xl max-w-lg w-full p-8 transform transition-all">
        <!-- Icon -->
        <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-3 text-center">
          Welcome Back!
        </h2>
        <p class="text-gray-600 mb-8 text-center leading-relaxed">
          We found existing resume data. Would you like to continue where you left off or start fresh?
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <button
            @click="handleLoadExisting"
            class="flex-1 btn-primary py-4 text-base font-semibold"
          >
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Load Existing
          </button>
          <button
            @click="handleStartFresh"
            class="flex-1 btn-secondary py-4 text-base font-semibold"
          >
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Start Fresh
          </button>
        </div>
      </div>
    </div>
  </Transition>
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
