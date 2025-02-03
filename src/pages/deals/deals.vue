<script lang='ts' setup>
  import { ref, onMounted } from 'vue';
  import VDropdown from '@/components/elements/v-dropdown.vue';
  import BgShapes from '@/components/bgShapes.vue';
  import Status from './status.vue';
  import { DealType, StatusType } from './dealsTypes';
  import { useDeals } from './dealsComposable';
  import { useFlipKit } from 'flipkit';
  
  const { fetchDeals, deals, statuses, getDealsForStatus, updateDeal } = useDeals();
  const { flip, measure } = useFlipKit();

  onMounted(async () => {
    await fetchDeals();
  });

  const options = ref([
    {value: 'all', title: 'All Companies'},
    {value: '1', title: '1'},
    {value: '2', title: '2'},
  ])
  const selected = ref(options.value[0]);
  const moveDeal = async ({deal, status}: {deal: DealType, status: StatusType}) => {
    const dealsForStatus = getDealsForStatus(deal.status)
    const dealsForTargetStatus = getDealsForStatus(status.value)
    
    measure([
      ...dealsForStatus.map(d => `deal-${d.id}`), 
      ...dealsForTargetStatus.map(d => `deal-${d.id}`),
      ...statuses.value.map(s => `status-${s.value}`)
    ]);

    try {
      await updateDeal(deal.id, { status: status.value });
      
      flip([
        { keys: [`deal-${deal.id}`], animate: ['position'], "z-index": 2 },
        { keys: [...statuses.value.map(s => `status-${s.value}`)], animate: ['height'] },
        { 
          keys: [ ...dealsForStatus.filter((d) => d.id != deal.id), ...dealsForTargetStatus].map(d => `deal-${d.id}`), 
          animate: ['position'], "z-index": 1 
        },
      ]);
    } catch (error) {
      await fetchDeals();
    }
  }
</script>

<template>
  <section aria-label="container" class="flex-grow flex flex-col px-8 lg:px-32 py-32 relative">
    <BgShapes />
    
    <section aria-label="title" class="relative py-4 mb-8">
      <h1 class="text-4xl font-semibold">
        Deals Tracker
      </h1>
      <div class="text-md font-medium text-gray-400">
        For questions, please make comments on items, email, or feel free to call to resolve your issue.
      </div>
      <div class="flex mt-4">
        <VDropdown 
          :options="options"
          v-model="selected"
          direction="down"
        />
      </div>
    </section>

    <section v-if="statuses" aria-label="items" class="relative flex flex-col gap-14">
      <template v-for="(status, sindex) in statuses">
        <Status 
          :status="status" 
          :deals="deals" 
          @moveDeal="event => moveDeal(event)" 
        />
      </template>
    </section>
  </section>
</template>
