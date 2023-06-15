<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

import HouseItem01 from '@/components/houseItem01/index.vue'
import HouseItem02 from '@/components/houseItem02/index.vue'
import useHomeStore from '@/stores/modules/home';
import useDetail from '@/stores/modules/detail';

const homeStore = useHomeStore()
homeStore.fetchHouselistData()
const { houseList } = storeToRefs(homeStore)

const router = useRouter()

// 详情按钮
const itemClick = (item) => {
    useDetail().getDetailInfoDates(item.houseId)
    router.push('/detail/' + item.houseId)
}
</script>

<template>
    <div class="homeContent">
        <h2 class="title">热门精选</h2>
        <div class="list">
            <template v-for="item in houseList" :key="item.data.houseId">
                <HouseItem01 v-if="item.discoveryContentType === 3" :itemData="item.data" @click="itemClick(item.data)" />
                <HouseItem02 v-if="item.discoveryContentType === 9" :itemData="item.data" @click="itemClick(item.data)" />
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.homeContent {
    padding: 10px 8px;

    .title {
        font-size: 22px;
        padding: 10px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
