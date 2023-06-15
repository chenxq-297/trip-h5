<script setup>
import { useIndex } from '@/stores';
const cancelLoading = () => {
    console.log(123);
    useIndex().isLoading = false
}
</script>

<template>
    <div class="loading" v-show="useIndex().isLoading" @click="cancelLoading">
        <div class="bg">
            <img src="@/assets/img/home/full-screen-loading.gif" alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
.loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .2);

    .bg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 105px;
        height: 105px;
        background-image: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;

        img {
            width: 70px;
            height: 70px;
            margin-bottom: 8px;
        }
    }
}
</style>
