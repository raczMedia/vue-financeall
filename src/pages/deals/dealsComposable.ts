import { StatusType, DealType } from './dealsTypes';
import { ref, Ref, onMounted } from 'vue';
import { supabase } from '@/utils/supabase';
import { useFlipKit } from 'flipkit';

type Dealer = {
  id: number | string;
  name: string;
  status: string;
}

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

const deals: Ref<DealType[]> = ref([]);
const dealers: Ref<Dealer[]> = ref([]);
const loading = ref(false);
const error = ref<string | null>(null);

export const useDeals = () => {
  const { flip, measure } = useFlipKit();

  const fetchDealers = async () => {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: supabaseError } = await supabase
        .from('dealers')
        .select('*');
      
      if (supabaseError) throw supabaseError;
      
      dealers.value = data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred fetching dealers';
      console.error('Error fetching dealers:', e);
    } finally {
      loading.value = false;
    }
  };

  const fetchDeals = async () => {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: supabaseError } = await supabase
        .from('deals')
        .select();

      console.log({ data });
      
      if (supabaseError) throw supabaseError;
      
      deals.value = data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred fetching deals';
      console.error('Error fetching deals:', e);
    } finally {
      loading.value = false;
    }
  };

  const getDealsForStatus = (
    status: string,
    attribute?: keyof DealType,
    prefix: string = ''
  ): DealType[] | (string | number)[] => {
    const filteredDeals = deals.value.filter(deal => deal.status === status);
    
    return attribute 
      ? filteredDeals.map(deal => `${prefix}${deal[attribute]}`)
      : filteredDeals;
  };

  const createDeal = async (deal: Omit<DealType, 'id'>) => {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: supabaseError } = await supabase
        .from('deals')
        .insert(deal)
        .select()
        .single();
      
      if (supabaseError) {
        throw supabaseError;
      }
      
      deals.value.push(data);

      return data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred creating the deal';
      console.error('Error creating deal:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const updateDeal = async (id: number | string, updates: Partial<DealType>) => {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: supabaseError } = await supabase
        .from('deals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (supabaseError) throw supabaseError;
      
      const index = deals.value.findIndex(d => d.id === id);
      if (index !== -1) {
        deals.value[index] = data;
      }
      
      return data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred updating the deal';
      console.error('Error updating deal:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const updateDealStatus = async (deal: DealType, status: StatusType) => {
    const dealsForStatus = getDealsForStatus(deal.status, 'id', 'deal-') as string[];
    const dealsForTargetStatus = getDealsForStatus(status.value, 'id', 'deal-') as string[];
    const statusKeys = statuses.value.map(s => `status-${s.value}`) as string[];
    
    measure([
      ...dealsForStatus, 
      ...dealsForTargetStatus,
      ...statusKeys
    ]);

    await updateDeal(deal.id, { status: status.value });
    
    flip([
      { keys: [...statusKeys], animate: ['height'] },
      { keys: [ ...dealsForStatus, ...dealsForTargetStatus], animate: ['position'] },
    ]);
  };

  return { 
    statuses, 
    deals,
    dealers,
    loading,
    error,
    fetchDeals,
    fetchDealers,
    getDealsForStatus,
    createDeal,
    updateDeal,
    updateDealStatus
  };
};
