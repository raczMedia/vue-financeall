import { reactive, computed } from 'vue';
import { onMounted } from "vue";
// @ts-ignore
import { useStoryblokBridge, useStoryblokApi, StoryblokEventPayload } from "@storyblok/vue";

// @ts-ignore
export async function useStoryblokState(story) {

    const storyblokApi = useStoryblokApi();

    const { data } = await storyblokApi.get(`cdn/stories/${story}`, {
        version: 'draft',
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
            state.story = event
        })
    });
}
