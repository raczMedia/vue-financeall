import { reactive, computed, onMounted } from 'vue';
// @ts-ignore
import { useStoryblokBridge, useStoryblokApi, StoryblokEventPayload } from "@storyblok/vue";

// @ts-ignore
export async function useStoryblokState(story, passedMode = "published") {
    const storyblokApi = useStoryblokApi();

    const mode = location.href.includes('draft--')
        ? 'draft'
        : passedMode;

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

// @ts-ignore
export async function useBridge(state) {
    onMounted(() => {
        useStoryblokBridge(state.story.id, (event: StoryblokEventPayload) => {
            state = { ...state, story: event }
        })
    })
}
