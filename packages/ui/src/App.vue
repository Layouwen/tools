<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
import Home from "./pages/home/index.vue";
</script>

<template>
  <n-message-provider>
    <Home />
  </n-message-provider>
</template>

<style scoped>
</style>
