<script setup>
import { ref, watch } from 'vue';
import OrderItem from './cpns/order-item.vue'

import { useOrderStore } from '@/stores/modules/order'

const orderStore = useOrderStore()
const currentOrder = ref(0);
const orderlist = ref([])
const orderTitles = ["全部订单", "近期订单", "待支付"];
const orderTitleType = ["all", "recent", "pend"];

watch(currentOrder, async (newval, oldval) => {
    if (newval !== undefined) {
        orderlist.value = await orderStore.getOrderListFn(orderTitleType[newval])

    }
}, {
    immediate: true
})

</script>

<template>
    <div class="order">
        <header>
            <!-- title -->
            <van-nav-bar title="消息中心" left-arrow @click-left="() => $router.back()">
                <template #right>
                    <i class="icon-right-menu"></i>
                </template>
            </van-nav-bar>
            <!-- tabs -->
            <van-tabs v-model:active="currentOrder" title-active-color="#ff9854" :line-height="2">
                <template v-for="(item, index) in orderTitles" :key="item">
                    <van-tab :title="item" :name="index"></van-tab>
                </template>
            </van-tabs>
        </header>
        <main>
            <div v-if="orderlist.length">
                <template v-for="(item, index) in orderlist" :key="item">
                    <OrderItem :item-data="item"></OrderItem>
                </template>
            </div>
            <div v-else class="tips">
                <img src="@/assets/img/order/icon-order.png" alt="" />
                <div class="title">近期暂无订单</div>
            </div>
        </main>
    </div>
</template>

<style lang="less" scoped>
.order {
    height: 100vh;
    --van-tabs-line-height: 40px;
    padding-bottom: 55px;

    main {
        height: calc(100% - 86px);
        overflow: scroll;
        background-color: #f7f8fb;

        .tips {
            text-align: center;
            margin-top: 80px;

            img {
                width: 88%;
            }

            .title {
                margin-top: 20px;
                color: #000;
                font-size: 18px;
            }
        }
    }
}
</style>
