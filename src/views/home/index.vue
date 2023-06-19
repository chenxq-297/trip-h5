<script setup>
import { watch, computed, onUnmounted, onActivated } from 'vue'

import HomeSerchBox from './cpns/home-serch-box.vue';
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue';
import SearchBar from '@/components/searchBar/index.vue'

import { useHomeStore } from '@/stores/modules/home'
import useScroll from '@/hooks/useScroll'

const { isReachBottom, scrollTop } = useScroll()
const homeStore = useHomeStore()

const stopWatch = watch(isReachBottom, () => {
    if (isReachBottom.value) {
        homeStore.fetchHouselistData().then(res => {
            isReachBottom.value = false
        })
    }
})
const isShowSeachBar = computed(() => {
    return scrollTop.value > 480
})
onActivated(() => {
    window.scrollTo({ top: scrollTop.value })
})
// watch页面销毁 watch就会随之销毁
onUnmounted(() => {
    console.log('停止侦听');
    stopWatch()
})

</script>

<template>
    <div class="home">
        <header>
            <div class="title">弘源旅途</div>
            <div class="banner">
                <img src="@/assets/img/home/banner.webp" alt="">
            </div>
        </header>
        <main>
            <HomeSerchBox />
            <HomeCategories />
        </main>
        <footer>
            <SearchBar class="seach-bar" v-show="isShowSeachBar" />
            <HomeContent />
        </footer>
    </div>
</template>

<style lang="less" scoped>
.home {
    margin-bottom: 16px;

    header {
        display: flex;
        flex-direction: column;

        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 46px;
            color: var(--primary-color);
            font-size: 16px;
            font-weight: 600;
        }

        img {
            width: 100%;
        }
    }
}

.seach-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>
