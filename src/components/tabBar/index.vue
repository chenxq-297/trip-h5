<script setup>
import { getAssetURL } from '@/utils/getAssetsImg'
import { tabBarData } from '@/assets/data/tabBar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const currentActive = ref(0)
const barItemClk = (item, currentIndex) => {
    currentActive.value = currentIndex
    router.push(item.path)
}
</script>

<template>
    <div class="tabbar">
        <div class="bar-item" v-for="(item, index) in tabBarData" :key="item.text"
            :class="{ active: currentActive === index }" @click="barItemClk(item, index)">
            <img v-show="currentActive !== index" :src="getAssetURL(item.Image)">
            <img v-show="currentActive === index" :src="getAssetURL(item.ImageActive)">
            <span class="text">{{ item.text }}</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;

    border-top: 1px solid #f3f3f3;

    display: flex;

    .bar-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        &.active {
            color: var(--primary-color);
        }

        img {
            width: 36px;
        }

        .text {
            font-size: 12px;
            margin-top: 2px;
        }
    }
}
</style>
