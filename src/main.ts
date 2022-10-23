import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

// @ts-ignore
import { StoryblokVue, apiPlugin } from "@storyblok/vue";
import './css/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMapPin, faMobileAlt, faAt, faChevronDown } from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
library.add([faFacebook, faLinkedin, faTwitter, faMapPin, faMobileAlt, faAt, faChevronDown ])

const app = createApp(App)

app
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(StoryblokVue, {
    accessToken: import.meta.env.VITE_STORYBLOK_API_KEY,
    use: [apiPlugin],
  })

app.mount('#app');
