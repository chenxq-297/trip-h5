<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia';

import { useRouter, useRoute } from 'vue-router';
import useDetail from '@/stores/modules/detail'
import useScroll from '@/hooks/useScroll';

import tabControlActive from '@/components/tabControlBar.vue/index.vue'
import DetailSwipe from './cpns/detail01-swipe.vue';
import DetailTopInfos from './cpns/detail02-infos.vue'
import DetailFacility from './cpns/detail03-facility.vue'
import DetailLandlord from './cpns/detail04-landlord.vue'
import DetailComment from './cpns/detail05-comment.vue'
import DetailNotice from './cpns/detail06-notice.vue'
import DetailMap from './cpns/detail07-map.vue'
import DetailIntro from './cpns/detail08-intro.vue'


const detailStore = useDetail()
const router = useRouter()
const route = useRoute()

detailStore.getDetailInfoDates(route.params.id)
const { swipeData, topInfos, houseFacility, landlord, comment, orderRules, position, introduction, currentHouse } = storeToRefs(detailStore)
// console.log(detailInfos.mainPart);
const onClickLeft = () => router.back()

onMounted(() => {
    // 初始化tabControlActive
    allEl.value = document.querySelectorAll("main > div[id]")
    names.value = Object.values(allEl.value).map(item => item.id)
    offTops.value = Object.values(allEl.value).map(item => item.offsetTop)
})

const allEl = ref(null)
const names = ref([])
const offTops = ref([])
const detailRef = ref()

const { scrollTop } = useScroll(detailRef)

// 点击跳转对应tabControlActive
// const tabClick = (index) => document.querySelectorAll("main > div[id]")[index].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
let isClick = false
let currentDistance = -1
const tabClick = (index) => {
    let distance = Object.values(allEl.value)[index].offsetTop - 44
    isClick = true
    currentDistance = distance
    detailRef.value.scrollTo({
        top: distance,
        behavior: "smooth"
    })
}
// 显示tabControlActive
const showTabControlActive = computed(() => scrollTop.value >= 300)
const tabControlRef = ref()

watch(scrollTop, (newVal) => {
    // 每个组件举例顶部的数值
    if (newVal === currentDistance) {
        console.log(currentDistance, 297);
        isClick = false
    }
    if (isClick) return
    let index = offTops.value.length - 1
    for (let i = 0; i <= offTops.value.length; i++) {
        if (offTops.value[i] > newVal + 44) {
            index = i - 1
            break
        }
    }
    tabControlRef.value.setCurrentIndex(index)
    // tabClick(index)

    // console.log(values);
})

</script>

<template>
    <div class="detail" ref="detailRef">
        <tabControlActive v-show="showTabControlActive" class="tabs" :titles="names" @tab-item-click="tabClick"
            ref="tabControlRef" />
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <main>
            <DetailSwipe :swipe-data="swipeData" />
            <DetailTopInfos id="描述" :topInfos="topInfos" />
            <DetailFacility id="设施" :houseFacility="houseFacility" />
            <DetailLandlord id="房东" :landlord="landlord" />
            <DetailComment id="评论" :comment="comment" />
            <DetailNotice id="须知" :orderRules="orderRules" />
            <DetailMap id="周边" :position="position" />
            <DetailIntro :introduction="introduction" />
            <div class="mainEnd">
                <img src="@/assets/img/detail/icon_ensure.png" alt="">
                <div class="text">弘源旅途, 永无止境!</div>
            </div>
        </main>
        <footer>
            <div class="chat">
                <i class="detail_icon_chat"></i>
                <span class="text">聊天</span>
            </div>
            <div class="price">
                <span class="final">{{ "¥" + currentHouse?.finalPrice }}</span>
                <span class="unit">{{ currentHouse?.priceMark }}</span>
                <span class="old">{{ currentHouse?.productPrice }}</span>
            </div>
            <div class="order">
                <i class="detail_icon_order"></i>
                <span class="text">预订当前房源</span>
            </div>
        </footer>
    </div>
</template>

<style lang="less" scoped>
.detail {
    position: relative;
    z-index: 8;
    height: 100vh;
    overflow-y: auto;
}

.tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
}

.mainEnd {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
        width: 123px;
    }

    .text {
        margin-top: 12px;
        font-size: 12px;
        color: #7688a7;
    }
}

footer {
    position: fixed;
    z-index: 19;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    border-top: 1px solid #f7f9fb;
    background-color: #fff;

    .chat {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50px;
        margin: 6px 0;
        border-right: 1px solid #ddd;

        .text {
            margin-top: 5px;
            font-size: 12px;
        }
    }

    .price {
        flex: 1;
        padding: 0 20px;
        font-size: 12px;
        color: #666;

        .final {
            font-size: 16px;
            font-weight: 700;
            color: #ff9645
        }

        .unit {
            margin: 0 6px;
        }

        .old {
            text-decoration: line-through;
        }
    }

    .order {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 100%;
        background: linear-gradient(90deg, #fa8c1d, #fcaf3f);

        .text {
            font-size: 18px;
            color: #fff;
            margin-left: 5px;
        }
    }
}
</style>
