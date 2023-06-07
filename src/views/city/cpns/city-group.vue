<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'

const props = defineProps({
    cityArr: {
        type: Object,
        default: () => ({})
    }
})

const router = useRouter()
const cityStore = useCityStore()

const indexList = computed(() => {
    const list = props.cityArr.cities.map(item => item.group)
    list.unshift('#')
    return list
})

const choseCity = (city) => {
    cityStore.currentCity = city

    router.back()
}
</script>

<template>
    <div class="city-group">
        <van-index-bar :index-list="indexList">
            <!-- 热门城市 -->
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="item in cityArr.hotCities" :key="item.cityId">
                    <div class="city">
                        <van-cell :title="item.cityName" @click="choseCity(item)" />
                    </div>
                </template>
            </div>

            <!-- 城市 -->
            <template v-for="(item, index) in cityArr.cities" :key="index">
                <van-index-anchor :index="item.group" />
                <template v-for="itm in item.cities" :key="itm.cityId">
                    <van-cell :title="itm.cityName" @click="choseCity(item)" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
        margin: 6px 0;
    }
}
</style>
