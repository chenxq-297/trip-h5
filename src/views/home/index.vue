<script setup>
import HomeSerchBox from './cpns/home-serch-box.vue';


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
        </main>


    </div>
</template>

<style lang="less" scoped>
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
</style>
