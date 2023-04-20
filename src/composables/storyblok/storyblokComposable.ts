// @ts-ignore
import { useStoryblokBridge, useStoryblokApi, StoryblokEventPayload } from "@storyblok/vue";
import { reactive, computed, onMounted } from 'vue';
import { LooseObject } from '../jsUtils';

export async function useStoryblokState(story: string, passedMode: string = "published") {
    const storyblokApi = useStoryblokApi();
    
    const mode = location.href.includes('draft--')
        ? 'draft'
        : passedMode;
        // : import.meta.env.VITE_STORYBLOK_MODE || passedMode;

    const { data } = await storyblokApi.get(`cdn/stories/${story}`, {
        version: mode,
    });
    
    const state = reactive({
        story: data.story,
    });

    const content = computed(() => {
        return state.story.content;
    })

    return { state, content };
}

export async function useBridge(state: LooseObject) {
    onMounted(() => {
        useStoryblokBridge(state.story.id, (event: StoryblokEventPayload) => {
            state.story = event
        })
    })
}
