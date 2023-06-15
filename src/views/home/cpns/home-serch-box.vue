<script setup>
import { computed, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';

import useCityStore from '@/stores/modules/city'
import useHomeStore from '@/stores/modules/home';
import { TimeToMMDD, getDiffDays } from '@/utils/processTimes'


const router = useRouter()
const homeStore = useHomeStore()
const cityStore = useCityStore()

// 获取位置
const cityClick = () => router.push('/city')
const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功:", res)
    }, err => {
        console.log("获取位置失败:", err)
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    })
}

// 选择时间
// const startDate = ref(new Date())
// const endDate = ref(new Date().getTime() + (24 * 60 * 60 * 1000))
// const { startDate, endDate } = storeToRefs(homeStore?.DateInterval)
// console.log(DateInterval);
// console.log(homeStore.DateInterval, homeStore.currentPage);
// const DateInterval=ref(homeStore.DateInterval)
const { startDate, endDate } = toRefs(homeStore.DateInterval)
const startDateStr = computed(() => TimeToMMDD(startDate.value))
const endDateStr = computed(() => TimeToMMDD(endDate.value))
const stayDateStr = computed(() => getDiffDays(startDate.value, endDate.value))
const showCalendar = ref(false)
const onOkCalendar = ([start, end]) => {
    startDate.value = start
    endDate.value = end
    // 使用computed就不需要
    // stayDateStr.value = getDiffDays(start, end)
    showCalendar.value = false
}

// 热门建议

homeStore.fatchHotSuggestDate()
const { hotSuggests } = storeToRefs(homeStore)

// 搜索
const searchBtnClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDateStr.value,
            endDate: endDateStr.value,
            currentCity: cityStore.currentCity.cityName
        }
    })
}

</script>

<template>
    <div class="serch-box">
        <!-- 地址 -->
        <div class="one-line">
            <div class="city" @click="cityClick">{{ cityStore.currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <!-- 日期 -->
        <div class="two-line" @click="showCalendar = true">
            <div class="start">
                <span class="tip">入住</span>
                <span class="time">{{ startDateStr }}</span>
            </div>
            <div class="stay">共{{ stayDateStr }}晚</div>
            <div class="end">
                <span class="tip">离店</span>
                <span class="time">{{ endDateStr }}</span>
            </div>
        </div>
        <van-calendar v-model:show="showCalendar" type="range" @confirm="onOkCalendar" :show-confirm="false"
            color="#ff9854" />

        <!-- 价格/人数选择 -->
        <div class="three-line bottom-gray-line">
            <div class="start">价格不限</div>
            <div></div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="four-line bottom-gray-line">关键字/位置/民宿名</div>

        <!-- 热门建议 -->
        <div class="five-line">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>

        <!-- 搜索 -->
        <div class="search-btn">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>

    </div>
</template>

<style lang="less" scoped>
.one-line {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.two-line {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    .start {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stay {
        flex: 1;
        line-height: 44px;
        text-align: center;
    }

    .end {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.three-line {
    height: 44px;
    display: flex;
    padding: 0 50px 0 40px;
    justify-content: space-between;
    align-items: center;
    color: #999;
}

.four-line {
    height: 44px;
    display: flex;
    padding: 0 40px;
    // justify-content: space-around;
    align-items: center;
    color: #999;
}

.five-line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 25px;
    color: #999;

    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}

.search-btn {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}

.bottom-gray-line {
    border-bottom: 1px solid var(--line-color);
}
</style>
 