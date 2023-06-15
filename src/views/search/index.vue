<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="search">{{ $route.query.startDate }}</div>
    <!-- <div class="search">{{ router.currentRoute.query.endDate }}</div> -->
</template>

<style scoped></style>
