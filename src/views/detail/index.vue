<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia';

import { useRouter, useRoute } from 'vue-router';
import useDetail from '@/stores/modules/detail'

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

// detailStore.getDetailInfoDates(route.params.id)
const { swipeData, topInfos, houseFacility, landlord, comment, orderRules, position, introduction } = storeToRefs(detailStore)
// const { detailInfos } = storeToRefs(detail)
// const mainPart = computed(() => detailInfos.value.mainPart)
// console.log(detailInfos.mainPart);
console.log(swipeData, 'swipeData');
const onClickLeft = () => router.back()
const text1 = computed(() => swipeData)
</script>

<template>
    <div class="detail">
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <DetailSwipe v-if="swipeData" :swipe-data="swipeData" :text="text1" />
        <!-- <DetailTopInfos :topInfos="topInfos" />
        <DetailFacility :houseFacility="houseFacility" />
        <DetailLandlord :landlord="landlord" />
        <DetailComment :comment="comment" />
        <DetailNotice />
        <DetailMap />
        <DetailIntro /> -->


    </div>
</template>

<style scoped></style>
