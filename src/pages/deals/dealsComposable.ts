import { StatusType } from './dealsTypes';
import { ref, Ref } from 'vue';

const statuses: Ref<StatusType[]> = ref([
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
]);
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
]);

export const useDeals = () => {
  const setStatuses = (value: StatusType[]) => {
    statuses.value = value;
  }

  const getDealsForStatus = (status: string) => {
    return deals.value.filter(deal => deal.status === status);
  }

  return { 
    statuses, 
    deals, 
    setStatuses, 
    getDealsForStatus 
  };
};
