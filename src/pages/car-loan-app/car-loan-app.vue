<script lang='ts' setup>

</script>

<template>
  <section class="py-32 px-8 lg:px-32 md:flex gap-16">
    <div class="w-full md:w-[60%]">
      <h1 class="font-bold mb-10">
        <div class="text-5xl text-fa-blue mb-2">Drive Your Perfect Car</div>
        <div class="text-3xl text-fa-secondary-blue">We'll Handle the Financing!</div>
      </h1>
      <div class="w-full flex flex-col gap-4 text-lg">
        <div>
          At Financifi, getting the car you want is easy and hassle-free. 
          <div>
            With fast approvals, flexible terms, and options for 
            <span class="text-fa-blue font-bold">every credit situation</span>, 
            we make owning & financing your new or used vehicle effortless. 
          </div>
        </div>
  
        <div class="shadow-lg mt-4 p-6 pt-12 relative">
          <div
            class="absolute inset-0 w-full h-full bg-cover opacity-20 bg-[center_top_-8rem] transform blur-sm" 
            style="background-image: url('https://a.storyblok.com/f/155950/1024x1792/e44b0f3d17/car-loan-background.png')"
          ></div>
          <div class="relative z-20">
            <h2 class="text-2xl mt-2 font-semibold mb-4">
              <span class="text-3xl text-fa-blue font-bold">
                Why You’ll Love Financing with Us:
              </span>  
            </h2>
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

            <button 
              onclick="window.askAva.openModal({ product: 'creditTool' });"
              class="bg-fa-secondary-blue text-left text-white px-6 py-4 rounded mt-8 flex shadow-lg shadow-white w-full md:w-auto"
            >
              <div class="border-l-4 border-white pl-4">
                <div class="inline-flex text-xl">
                  Ready to hit the road?
                </div>
                <div class="font-bold text-3xl md:text-2xl">
                  Apply now 
                </div> 
                <div></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-[40%] md:border-l-4 md:border-fa-blue md:mt-0 mt-8 md:p-2 rounded-lg">
      <div class="AskAva-embed" data-product="creditTool"></div>
    </div>
  </section>
</template>
