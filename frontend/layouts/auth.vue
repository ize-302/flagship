<script setup>
import logo from "~/assets/logo.svg";
</script>
<template>
  <div class="h-screen flex justify-center items-center bg-main">
    <div
      class="max-w-md container border rounded-lg px-8 py-10 bg-white shadow-sm space-y-5"
    >
      <img :src="logo" alt="logo" />
      <slot />
    </div>
  </div>
</template>
