<script setup>
import logo from "~/assets/logo.svg";
import screenshot from "~/assets/screenshot.png";
</script>

<template>
  <div class="relative">
    <div class="sticky bg-white top-0 w-full py-3">
      <div
        class="flex justify-between items-center container mx-auto max-w-7xl px-5 md:px-10"
      >
        <img :src="logo" alt="logo" />
        <div class="flex items-center gap-10">
          <nuxt-link to="">Documentation</nuxt-link>
          <nuxt-link to="">Pricing</nuxt-link>
          <button class="bg-main text-white rounded-full h-[45px] px-8">
            Get started
          </button>
        </div>
      </div>
    </div>
    <div class="bg-slate-50 h-[900px] overflow-hidden">
      <div class="container mx-auto max-w-3xl pt-24">
        <h1 class="text-6xl font-bold text-center text-main leading-tight">
          <span>Stupidly simple</span> feature flag management
        </h1>
        <p class="text-slate-400 text-2xl text-center mt-5">
          Built for developers with simple lives 🫵
        </p>
      </div>
      <div class="mt-14 border rounded-xl container mx-auto max-w-6xl">
        <img :src="screenshot" alt="logo" class="rounded-xl" />
      </div>
    </div>
  </div>
</template>
