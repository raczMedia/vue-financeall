<script setup lang="ts">
  import { ref } from 'vue'
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

  const open = ref(false)
  const openIt = () => {
    open.value = true;
  }

  const props = defineProps<{
    size: string,
    title: string,
  }>();
</script>

<template>
  <button @click="openIt()" class="relative z-10 cursor-pointer">
    {{ title }}
    <Teleport to="body">
      <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-30" @close="open = false">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>
          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-16 text-center sm:items-center sm:p-0">
              <TransitionChild 
                as="template" 
                enter="ease-out duration-300" 
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
                enter-to="opacity-100 translate-y-0 sm:scale-100" 
                leave="ease-in duration-200" 
                leave-from="opacity-100 translate-y-0 sm:scale-100" 
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel 
                  class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full "
                  :class="size === 'lg' ? 'max-w-[90%] h-full max-h-[90vh] overflow-y-auto' : 'sm:max-w-lg'"
                >
                  <div 
                    class="absolute top-2 right-2 text-fa-blue w-8 h-8 flex items-center justify-center cursor-pointer transform hover:scale-110"
                    @click="open = false"
                  >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                    </svg>
                  </div>
                  <div class="bg-gray-100 px-2 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <slot name="body" />
                  </div>
                  <div class="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <slot name="footer" />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </Teleport>
  </button>
</template>
