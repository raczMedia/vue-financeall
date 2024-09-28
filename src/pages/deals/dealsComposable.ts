import { Status } from './dealsTypes';
import { ref, Ref } from 'vue';

const statuses: Ref<Status[]> = ref([]);

export const useDeals = () => {
  const setStatuses = (value: Status[]) => {
    statuses.value = value;
  }

  return { setStatuses, statuses };
};
