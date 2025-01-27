<script lang="ts" setup>
  import { useDeals } from './dealsComposable';
  import { DealType, StatusType } from './dealsTypes';
  import { computed } from 'vue';
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

  return [
      {
        title: 'Status Change', 
        isHeading: true, 
        value: 'Status Change'
      },
      ...statuses.value.map((status) => ({
        value: status.value,
        title: status.name,
        isHeading: false,
      }))
    ]
  });
  
  const changeStatus = (status: StatusType) => {
    emit('moveDeal', status);
  }
</script>

<template>
  <div class="flex flex-col gap-2 relative">
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-fa-blue text-white">
          {{ deal.name[0] }}
        </div>
        <h4>{{ deal.name }}</h4>
      </div>
      <VDropdown 
        v-if="statusOptions"
        :options="statusOptions!"
        :modelValue="statusOptions.find(stat => stat.value == props.deal.status)!"
        direction="right"
        @update:modelValue="status => changeStatus(status)"
        class="flex"
      >
        <template v-slot:toggle="{ toggleOpen }">
          <div class="
            relative flex flex-grow items-center justify-center 
            pl-3 cursor-pointer rounded-full
          "
          @click="toggleOpen()"
        >
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" size="lg" />
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
