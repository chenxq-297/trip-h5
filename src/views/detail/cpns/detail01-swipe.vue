<script setup>
import { watchEffect } from 'vue'
const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []
    },
    text: {
        type: Number,
        default: 0
    }
})
// 
// let swipeGroup = {}
// watchEffect(() => {
let swipeGroup = props.swipeData.reduce((acc, item) => {
    const valueArray = acc[item.enumPictureCategory] || []
    valueArray.push(item)
    acc[item.enumPictureCategory] = valueArray
    return acc
}, {})
// })
console.log(props.text, 1, props.swipeData);

// console.log(props.swipeData, swipeGroup);
// 对数据进行转换
// const swipeGroup = {}

// // 思路二: 一次循环
// for (const item of props.swipeData) {
//     let valueArray = swipeGroup[item.enumPictureCategory]
//     if (!valueArray) {
//         valueArray = []
//         swipeGroup[item.enumPictureCategory] = valueArray
//     }
//     valueArray.push(item)
// }

const getCategoryIndex = (item) => {
    console.log(item?.title);
    const valueArray = swipeGroup[item?.enumPictureCategory]
    return valueArray?.findIndex(data => data === item) + 1
}
</script>

<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item, index) in swipeData" :key="index">
                <van-swipe-item class="item">
                    <img :src="item.url">
                </van-swipe-item>
            </template>
            <template #indicator="{ active, total }">
                <div class="indicator">
                    <template v-for="(value, key, index) in swipeGroup" :key="key">
                        <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                            <span class="text">{{ value[0]?.title }}</span>
                            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                                {{ getCategoryIndex(swipeData[active]) }} / {{ value.length }}
                            </span>
                        </span>
                    </template>

                    <!-- {{ active }} -->
                </div>

            </template>
        </van-swipe>
    </div>
</template>

<style lang="less" scoped>
.swipe-list {
    .item {
        img {
            width: 100%;
        }
    }
}

.indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    display: flex;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);

    .item {
        margin: 0 3px;

        &.active {
            padding: 0 3px;
            border-radius: 5px;
            background-color: #fff;
            color: #333;
        }
    }
}
</style>
