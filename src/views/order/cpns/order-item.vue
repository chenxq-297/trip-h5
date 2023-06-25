<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
    itemData: {
        type: Object,
        default: () => { },
    },
})

const getTitleData = computed(() => {
    let data = props.itemData;
    return {
        unitName: data.unitName,
        orderStatusDesc: data.orderStatusDesc,
        cancelReasonDesc: data.cancelReasonDesc,
        orderStatus: data.orderStatus, // 1 待支付  0 取消
        orderStatusDescColor: data.orderStatusDescColor,
    };
});
const getInfoData = computed(() => {
    let data = props.itemData;
    return {
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        checkInLatestTime: data.checkInLatestTime,
        checkOutLatestTime: data.checkOutLatestTime,
        prepayAmount: data.prepayAmount,
        unitPicture: data.unitPicture,
    };
});
const getFooterBtnData = computed(() => {
    let data = props.itemData;
    return {
        countdown: data.countdown, // 剩余支付秒
        orderStatusDesc: data.orderStatusDesc,
        orderStatus: data.orderStatus, // 1 待支付  0 取消
    };
});

// info格式化
const getFormDate = computed(() => {
    return (dataString, isWeek = false) => {
        let date = new Date(dataString);
        if (isWeek) {
            return "周" + "日一二三四五六".charAt(date.getDay());
        }
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    };
});

// footer
const remainingTime = ref();
const timeId = ref(null);
let counter = 1;

const startCountDown = () => {
    timeId.value = setInterval(() => {
        remainingTime.value = parseInt((props.itemData.countdown - counter) / 60);
        counter++;
        if (remainingTime.value <= 0) {
            clearInterval(timeId.value);
            return;
        }
    }, 1000);
};

onMounted(() => {
    startCountDown();
});
</script>

<template>
    <div class="order-item">
        <!-- title -->
        <div class="order-item-title">
            <div class="name ellipsis-text-1">
                {{ getTitleData.unitName }}
            </div>
            <div class="status-name" :style="{ color: getTitleData.orderStatusDescColor }">
                {{ getTitleData.orderStatusDesc }}
                <span class="sub-name"> {{ getTitleData.cancelReasonDesc }}</span>
            </div>
        </div>
        <!-- info -->
        <div class="order-item-info">
            <img class="img-bg" :src="getInfoData.unitPicture" alt="" />

            <div class="bottom">
                <div class="b-left">
                    <div class="date">
                        <p class="day">{{ getFormDate(getInfoData.checkInDate) }}</p>
                        <div class="week-time">
                            <span class="week">{{
                                getFormDate(getInfoData.checkInDate, true)
                            }}</span>
                            <span class="time">{{ getInfoData.checkInLatestTime }}</span>
                        </div>
                    </div>
                    <img class="arrow" src="@/assets/img/order/icon_right_orderlist.png" />
                    <div class="date">
                        <p class="day">{{ getFormDate(getInfoData.checkOutDate) }}</p>
                        <div class="week-time">
                            <span class="week">{{
                                getFormDate(getInfoData.checkOutDate, true)
                            }}</span>
                            <span class="time">{{ getInfoData.checkOutLatestTime }}</span>
                        </div>
                    </div>
                </div>
                <div class="b-right">
                    <p class="name">支付总价</p>
                    <span class="price">￥{{ getInfoData.prepayAmount }}</span>
                </div>
            </div>
        </div>
        <!-- footer -->
        <div class="order-item-btn">
            <div class="left">
                <div v-if="getFooterBtnData.orderStatus === 1" class="left-content">
                    <img class="icon-time" src="@/assets/img/order/icon-time.png" alt="" />
                    <span class="time">{{ remainingTime }}分</span>
                    <span class="msg">后订单自动取消</span>
                </div>
            </div>

            <div class="right">
                <button v-if="getFooterBtnData.orderStatus === 1" class="btn connect">联系房东</button>
                <button v-if="getFooterBtnData.orderStatus === 1" class="btn pay">去支付</button>
                <button v-if="getFooterBtnData.orderStatus === 5" class="btn delete">删除</button>
                <button v-if="getFooterBtnData.orderStatus === 5" class="btn order">再次预定</button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
// fn
.rowlayout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.order-item {
    padding: 0 20px;
    // margin-top: 10px;
    background-color: white;
    border-radius: 5px;
    margin: 10px 10px;

    .order-item-title {
        padding: 20px 0px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .name {
            max-width: 204px;
            font-size: 12px;
            color: #333;
            line-height: 12px;
        }

        .status-name {
            font-size: 18px;
            color: #ff9645;
            letter-spacing: 0;
        }

        .sub-name {
            position: relative;
            left: -5px;
            font-size: 12px;
            color: #b2b2b2;
        }
    }

    .order-item-info {
        position: relative;
        height: 223px;
        width: 100%;
        border-radius: 6px;

        .img-bg {
            width: 100%;
            height: 100%;
            border-radius: 6px;
        }

        .bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            height: 60px;
            background: rgba(9, 10, 14, 0.7);
            border-radius: 0 0 6px 6px;

            .b-left {
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                color: white;

                .date {
                    padding: 0 20px;

                    .day {
                        padding: 0;
                        margin: 0;
                        margin-bottom: 5px;
                        font-size: 16px;
                        line-height: 16px;
                        margin-bottom: 6px;
                    }

                    .week-time {
                        font-size: 12px;
                        text-align: center;
                        line-height: 12px;
                        opacity: 0.8;
                    }
                }

                .arrow {
                    width: 16px;
                    height: 12px;
                }
            }

            .b-right {
                position: relative;
                width: 105px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &::before {
                    content: "";
                    position: absolute;

                    top: 10px;
                    left: -25px;
                    width: 1px;
                    height: 40px;
                    background-color: white;
                }

                .name {
                    color: #fff;
                    text-align: center;
                    line-height: 12px;
                    opacity: 0.8;
                    margin: 0;
                    transform: scale(0.9);
                }

                .price {
                    margin-top: 5px;
                    font-size: 16px;
                    color: var(--primary, #ff9645);
                    letter-spacing: 0;
                    text-align: right;
                    line-height: 16px;
                }
            }
        }
    }

    .order-item-btn {
        .rowlayout();
        height: 60px;

        .left-content {
            .rowlayout();
            font-size: 11px;

            .icon-time {
                width: 11px;
                height: 11px;
                margin-right: 3px;
            }

            .time {
                color: var(--primary-color);
                letter-spacing: 0;
                margin-right: 1px;
            }

            .msg {
                color: #666;
                letter-spacing: 0;
                line-height: 11px;
            }
        }

        .right {
            .rowlayout();

            .btn {
                display: inline-block;
                text-align: center;
                line-height: 30px;
                margin-left: 10px;

                font-size: 14px;
                min-width: 75px;
                color: #666;
                background: #fff;
                border: 1px solid #e9e9e9;
                border-radius: 6px;
            }

            .connect {}

            .pay {
                color: white;
                background-color: var(--primary-color, #ff9645);
                border: 1px solid var(--primary-color, #ff9645);
            }

            .delete {}

            .order {
                color: var(--primary-color, #ff9645);
                background-color: #fff;
                border: 1px solid var(--primary-color, #ff9645);
            }
        }
    }
}
</style>
