import { DealStatusType, DealerType, DealType } from './dealsTypes';
import { ref, Ref } from 'vue';
import { supabase } from '@/utils/supabase';
import { useFlipKit } from 'flipkit';

const statuses: Ref<DealStatusType[]> = ref([
  {
    name: 'New App',
    value: 'new',
    sort: 1
  },
  {
    name: "Intro Call / Doc Collection",
    value: 'intro',
    sort: 2
  },
  {
    name: "Pre-Approved",
    value: 'pre-approved',
    sort: 3
  }
]);

const deals: Ref<DealType[]> = ref([]);
const dealers: Ref<DealerType[]> = ref([]);
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

  const fetchDealStatuses = async () => {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: supabaseError } = await supabase
        .from('deal_statuses')
        .select('*')
        .order('sort', { ascending: true });
      
      if (supabaseError) throw supabaseError;
      
      statuses.value = data.map(status => ({
        name: status.name,
        value: status.value
      }));
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred fetching deal statuses';
      console.error('Error fetching deal statuses:', e);
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

  const updateDealStatus = async (deal: DealType, status: DealStatusType) => {
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

  const createDealStatus = async (dealStatus: DealStatusType) => {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: supabaseError } = await supabase
        .from('deal_statuses')
        .insert(dealStatus)
        .select()
        .single();
      
      if (supabaseError) throw supabaseError;
      
      statuses.value = [
        ...statuses.value,
        { name: data.name, value: data.value, sort: data.sort }
      ].sort((a, b) => {
        const aStatus = statuses.value.find(s => s.value === a.value);
        const bStatus = statuses.value.find(s => s.value === b.value);
        return (aStatus?.sort || 0) - (bStatus?.sort || 0);
      });
      
      return data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred creating deal status';
      console.error('Error creating deal status:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return { 
    statuses, 
    deals, 
    dealers,
    loading,
    error,
    fetchDeals,
    fetchDealers,
    fetchDealStatuses,
    getDealsForStatus,
    createDeal,
    updateDeal,
    updateDealStatus,
    createDealStatus
  };
};
