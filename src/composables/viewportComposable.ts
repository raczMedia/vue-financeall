import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';

export const useViewport = () => {
  onBeforeMount(async () => {
    window.addEventListener('resize', setBreakpoints);
  });

  onMounted(async () => {
    setBreakpoints();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', setBreakpoints);
  });

  const isDesktop = ref(false);
  const isMobile = ref(false);

  const setBreakpoints = () => {
    isDesktop.value = window.innerWidth >= 1024;
    isMobile.value = window.innerWidth <= 768;
  };

  return { isDesktop, isMobile };
};
