<script setup>
import { storeToRefs } from 'pinia';

import useHomeStore from '@/stores/modules/home';

const homeStore = useHomeStore()
homeStore.fatchCategories()
const { categories } = storeToRefs(homeStore)
</script>

<template>
    <div class="categories">
        <template v-for="item in categories">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div class="text">{{ item.title }}</div>
            </div>
        </template>
    </div>
</template>

<style lang="less" scoped>
.categories {
    display: flex;
    overflow-x: auto;
    height: 80px;
    padding: 0 10px;
    margin-top: 8px;

    &::-webkit-scrollbar {
        display: none;
    }

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        width: 70px;
        flex-shrink: 0;

        img {
            width: 32px;
        }

        .text {
            font-size: 12px;
            margin-top: 8px;
        }
    }
}
</style>
