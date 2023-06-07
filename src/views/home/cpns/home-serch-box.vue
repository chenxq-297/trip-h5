<script setup>
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'

const router = useRouter()
const cityStore = useCityStore()

const cityClick = () => {
    router.push('/city')
}
const positionClick = () => {
    console.log(2971);
}
</script>

<template>
    <div class="serch-box">
        <div class="one-line">
            <div class="city" @click="cityClick">{{ cityStore.currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.one-line {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;

    .city {
        flex: 1;
        color: #333;
        font-size: 15px;
    }

    .position {
        width: 74px;
        display: flex;
        align-items: center;

        .text {
            position: relative;
            top: 2px;
            color: #666;
            font-size: 12px;
        }

        img {
            margin-left: 5px;
            margin-top: 3px;
            width: 18px;
            height: 18px;
        }
    }
}
</style>
