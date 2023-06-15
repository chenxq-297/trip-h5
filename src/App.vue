<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useIndex } from './stores';

import Loading from '@/components/loading/index.vue'
import Tabbar from '@/components/tabBar/index.vue'

// const router = useRouter()
// const route = router.options.routes.filter(item => item?.meta?.keepAlive === true).map(item => item.name)

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-if="!route?.meta?.keepAlive" />
    <KeepAlive>
      <component :is="Component" v-if="route?.meta?.keepAlive" />
    </KeepAlive>
  </router-view>

  <Tabbar v-show="!useRoute().meta?.hideTabBar" />
  <Loading />
</template>

<style scoped></style>
