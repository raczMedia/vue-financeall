<script lang='ts' setup>
  import { DealType, StatusType } from './dealsTypes';
  import { ref, computed, watch } from 'vue';
  import Deal from './deal.vue';
  
  const emit = defineEmits(['moveDeal']);
  const props = defineProps<{
    deals: DealType[],
    status: StatusType,
  }>();

  const open = ref(true);

  const filteredDeals = computed(() => {
    if (! props.deals || ! props.status) {
      return [];
    }

    return props.deals.filter(deal => deal.status === props.status.value)
  });

  watch(
    () => filteredDeals.value,
    (deals, prevDeals) => {
      if (prevDeals.length > 0 && deals.length <= 0) {
        open.value = false;
      }

      if (prevDeals.length <= 0 && deals.length > 0) {
        open.value = true;
      }
    }
  )
</script>
<template>
  <div :data-flip-key="`status-${props.status.value}`">
    <h3 
      class="text-fa-blue font-bold text-2xl mb-4 cursor-pointer inline-flex gap-2 items-center" 
      @click="open = !open"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-down" :class="{'-rotate-90': !open}" />
      {{ status.name }} 
      <span class="text-gray-400 text-sm">({{ filteredDeals.length }})</span>
    </h3>
    <div 
      class="grid grid-cols-3 gap-4 transition-all duration-200 relative" 
      :class="{'h-0 overflow-hidden': !open}"
    >
      <template v-for="deal in filteredDeals" :key="`deal-${deal.id}`">
        <Deal 
          :data-flip-key="`deal-${deal.id}`"
          :deal="deal"
          @moveDeal="status => $emit('moveDeal', { deal, status })"
        />
      </template>
    </div>
  </div>
</template>
