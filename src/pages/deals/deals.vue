<script lang='ts' setup>
  import { ref, onMounted } from 'vue';
  import VDropdown from '@/components/elements/v-dropdown.vue';
  import BgShapes from '@/components/bgShapes.vue';
  import Status from './status.vue';
  import { DealType } from './dealsTypes.ts';
  import { useDeals } from './dealsComposable';

  const deals = ref([
    {
      id: 1,
      name: "Kyle J", 
      vehicle: "2020 Lincoln Nautilus",
      mileage: "24,445 km",
      vin: "12345678912345678",
      status: 'new'
    },
    {
      id: 2,
      name: "Matthew B", 
      vehicle: "2018 Porche 911",
      mileage: "3,445 km",
      vin: "12345678912345678",
      status: 'new'
    },
    {
      id: 3,
      name: "Graham K", 
      vehicle: "1989 Ford Mustang",
      mileage: "124,445 km",
      vin: "12336748912345678",
      status: 'intro'
    },
    {
      id: 4,
      name: "Joe J", 
      vehicle: "2021 Chrysler 300",
      mileage: "33,145 km",
      vin: "12345674412345678",
      status: 'pre-approved'
    },
  ])
  const statusList = [
    {
      name: 'New App',
      value: 'new',
    },
    {
      name: "Intro Call / Doc Collection",
      value: 'intro',
    },
    {
      name: "Pre-Approved",
      value: 'pre-approved'
    }
  ];

  const { setStatuses, statuses } = useDeals();

  onMounted(() => {
    setStatuses(statusList);
  })

  const options = ref([
    {value: 'all', title: 'All Companies'},
    {value: '1', title: '1'},
    {value: '2', title: '2'},
  ])
  const selected = ref(options.value[0]);
  const moveDeal = ({deal, status}: {deal: DealType, status: Status}) => {
    const item = deals.value.find(d => d.id === deal.id);

    if (item) {
      item.status = status.value;
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
