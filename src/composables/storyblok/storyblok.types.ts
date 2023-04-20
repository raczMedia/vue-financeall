import { FormPageType } from "@/components/form/utils/formTypes"
import { ComputedRef, ShallowReactive } from "vue"
import { LooseObject } from "../jsUtils"

export interface StoryblokStateType {
  content: ComputedRef<FormPageType>
  state: ShallowReactive<{story: LooseObject}>
}
