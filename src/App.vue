<script setup>
import { useRoute, useRouter } from 'vue-router';

import Tabbar from '@/components/tabBar/index.vue'

const router = useRouter()
const route = router.options.routes.filter(item => item?.meta?.keepAlive === true).map(item => item.name)
console.log(route);
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-if="!route?.meta?.keepAlive" />
    <KeepAlive>
      <component :is="Component" v-if="route?.meta?.keepAlive" />
    </KeepAlive>
  </router-view>

  <Tabbar v-show="!useRoute().meta?.hideTabBar" />
</template>

<style scoped></style>
