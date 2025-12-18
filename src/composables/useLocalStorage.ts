import { watch, type Ref } from 'vue';
import type { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume-builder-data';

export function useLocalStorage() {
  /**
   * Save resume data to localStorage
   */
  const saveToLocalStorage = (data: ResumeData): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  /**
   * Load resume data from localStorage
   */
  const loadFromLocalStorage = (): ResumeData | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  };

  /**
   * Clear all resume data from localStorage
   */
  const clearLocalStorage = (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  /**
   * Check if localStorage has saved data
   */
  const hasStoredData = (): boolean => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  };

  /**
   * Auto-save resume data whenever it changes
   */
  const setupAutoSave = (resumeData: Ref<ResumeData>): void => {
    watch(
      resumeData,
      (newData) => {
        saveToLocalStorage(newData);
      },
      { deep: true }
    );
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    hasStoredData,
    setupAutoSave
  };
}
