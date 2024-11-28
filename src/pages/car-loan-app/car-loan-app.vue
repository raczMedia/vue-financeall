<script lang='ts' setup>
  import { useBridge, useStoryblokState } from '@/composables/storyblok/storyblokComposable';
  import { StoryblokStateType } from '@/composables/storyblok/storyblok.types';
  import FinanceApplication from '@/components/FinanceApplication.vue';
  const { state, content }: StoryblokStateType = await useStoryblokState("car-loan-application");
  useBridge(state);
</script>

<template>
  <section class="relative py-32 flex-grow">
    <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-4/5 h-full"></div>
    <div class="absolute clip-right-up-right bg-gray-300/20 left-0 top-0 w-full h-full"></div>
    
    <section class="px-8 lg:px-32 relative z-10">
      <h1 class="font-bold mb-10">
        <div class="text-5xl text-fa-blue mb-2">Drive Your Perfect Car</div>
        <div class="text-3xl text-fa-secondary-blue">We'll Handle the Financing!</div>
      </h1>
    </section>
    <section class="px-8 lg:px-32 md:flex relative z-10 gap-4">
      <div class="w-full md:w-1/4 mt-4 text-lg shadow-lg bg-white/60 px-6 py-4 rounded-lg flex-shrink-0">
        <h2 class="text-2xl mt-2 font-semibold mb-4">
          <span class="text-3xl text-fa-blue font-bold">
            Why You’ll Love Financing with Us:
          </span>  
        </h2>
        <div class="mb-4">
          At Financifi, getting the car you want is easy and hassle-free. 
          <div>
            With fast approvals, flexible terms, and options for 
            <span class="text-fa-blue font-bold">every credit situation</span>, 
            we make owning & financing your new or used vehicle effortless. 
          </div>
        </div>
        <ul class="flex flex-col gap-4">
          <li>
            <strong>Super-Fast Approvals:</strong>
            <div>Our quick online application gets the ball rolling.</div>
            <div>Apply in minutes from anywhere</div>
          </li>
          <li>
            <strong>Custom Terms:</strong>
            <div>Flexible payments designed for your budget.</div>
            <div>Get matched with the best financing options.</div>
          </li>
          <li>
            <strong>Low Rates, Big Savings: </strong>
            <div>Enjoy competitive rates that keep your payments manageable.</div>
            <div>Explore our access to a range of competitively priced new and used vehicles.</div>
          </li>
          <li>
            <strong>Credit Issues? We’ve Got You!:</strong> 
            <div>Whether your credit is great, so-so, or in need of help, we’ll find the best solution for you.</div>
          </li>
        </ul>
      </div>
      <FinanceApplication :content="content" :useBackground="false" class="pt-6" />
    </section>
  </section>
  
  
</template>
