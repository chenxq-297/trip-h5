<script setup>
import { computed, ref, onDeactivated, onUnmounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia';

import CityGroup from './cpns/city-group.vue';

const router = useRouter()

const cityStore = useCityStore()

cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

const serchValue = ref('')
const onSearch = (val) => showToast(val);
const onCancel = () => router.back()


const activeTabs = ref(0)
const currentGroup = computed(() => allCities.value[activeTabs.value])
onActivated(() => {
    console.log(297);
})
onDeactivated(() => {
    console.log('deactivated');
})
onUnmounted(() => {
    console.log(123);
})
</script>

<template>
    <header>
        <van-search v-model="serchValue" shape="round" show-action placeholder="请输入搜索内容" @search="onSearch"
            @cancel="onCancel" />
        <van-tabs v-model:active="activeTabs">
            <template v-for="(value, key, index) in allCities" :key="key">
                <van-tab :title="value.title" :name="key"></van-tab>
            </template>
        </van-tabs>
    </header>

    <main>
        <template v-for="(value, key, index) in allCities" :key="index">
            <CityGroup v-show="key === activeTabs" :cityArr="value" />
        </template>
    </main>
</template>

<style lang="less" scoped>
// 滑动时会被main内容覆盖 而main内部有固定定位 
header {
    position: relative;
    z-index: 9;
}

main {
    height: calc(100vh - 98px);
    overflow-y: auto;
}
</style>
