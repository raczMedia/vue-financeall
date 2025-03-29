<script lang='ts' setup>
  import { ref, onMounted } from 'vue';
  import VDropdown from '@/components/elements/v-dropdown.vue';
  import BgShapes from '@/components/bgShapes.vue';
  import Status from './status.vue';
  import { DealType, StatusType } from './dealsTypes';
  import { useDeals } from './dealsComposable';
  import { useFlipKit } from 'flipkit';
  
  const { fetchDeals, fetchDealers, fetchDealStatuses, deals, dealers, statuses, updateDealStatus } = useDeals();
  const { flip, measure } = useFlipKit();

  onMounted(async () => {
    await Promise.all([
      fetchDeals(),
      fetchDealers(),
      fetchDealStatuses()
    ]);
  });

  const selectedDealer = ref({
    value: 'all',
    title: 'All Companies'
  });

  const moveDeal = async ({deal, status}: {deal: DealType, status: StatusType}) => {
    try {
      await updateDealStatus(deal, status);
    } catch (error) {
      await fetchDeals();
    }
  }

  const createStatus = () => {
    console.log('create status');
  }

  const createDeal = () => {
    console.log('create deal');
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
      <div class="flex justify-between mt-4">
        <VDropdown 
          :options="[{
            value: 'all',
            title: 'All Companies'
          }, ...dealers.map(dealer => ({ 
            value: dealer.id.toString(), 
            title: dealer.name 
          }))]"
          v-model="selectedDealer"
          direction="down"
        />
        <VDropdown 
          :options="[{
            value: 'new-status',
            title: 'New Status',
            trigger: createStatus
          }, {
            value: 'new-deal',
            title: 'New Deal',
            trigger: createDeal
          }]"
          direction="down"
        >
          <template v-slot:toggle="{ toggleOpen }">
            <div class="
                relative flex flex-grow items-center justify-center 
                pl-3 cursor-pointer rounded-full
              "
              @click="toggleOpen()"
            >
              <font-awesome-icon icon="fa-solid fa-gear" size="lg" />
            </div>
          </template>
        </VDropdown>
      </div>
    </section>

    <section v-if="statuses.length" aria-label="items" class="relative flex flex-col gap-14">
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
