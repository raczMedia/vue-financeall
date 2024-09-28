<script lang="ts" setup>
  import { DealType } from './dealsTypes.ts';
  import { useDeals } from './dealsComposable';
  import { Status } from './dealsTypes';
  import { computed, onMounted } from 'vue';
  import VDropdown from '@/components/elements/v-dropdown.vue';

  const { statuses } = useDeals();

  const props = defineProps<{
    deal: DealType,
  }>();

  const emit = defineEmits(['moveDeal']);
  const statusOptions = computed(() => {
    if (! statuses.value) {
      return null;
    }

    return statuses.value.map((status: Status) => {
      status.title = status.name;
      
      return status;
    })
  });
  
  const changeStatus = (status: Status) => {
    emit('moveDeal', status);
  }
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-fa-blue text-white">
          {{ deal.name[0] }}
        </div>
        <h4>{{ deal.name }}</h4>
      </div>
      <VDropdown 
        :options="statusOptions"
        :modelValue="statusOptions.find(stat => stat.value == props.deal.status)"
        @update:modelValue="status => changeStatus(status)"
        class="flex"
      >
        <template v-slot:toggle="{ toggleOpen }">
          <div class="
            relative flex flex-grow items-center justify-center gap-1 cursor-pointer rounded-full px-3
            bg-blue-400 hover:bg-blue-500 text-xs
          "
          @click="toggleOpen()"
        >
            <font-awesome-icon icon="fa-solid fa-pencil" size="sm" class="text-white" />
          </div>
        </template>
      </VDropdown>
    </div>
    <div class="shadow-md bg-white p-4 rounded-md">
      <div class="flex">
        <strong>Vehicle:</strong> <span>{{ deal.vehicle }}</span>
      </div>
      <div class="flex">
        <strong>Mileage:</strong> <span>{{ deal.mileage }}</span>
      </div>
      <div class="flex">
        <strong>VIN:</strong> <span>{{ deal.vin }}</span>
      </div>
    </div>
  </div>
</template>
