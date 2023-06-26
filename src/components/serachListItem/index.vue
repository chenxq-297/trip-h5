<script setup>
import { ref, watch, computed } from "vue";

const houseData = ref({});

const props = defineProps({
    itemData: {
        type: Object,
        default: () => { },
    },
});
watch(() => props.itemData, (newValue, oldValue) => {
    houseData.value = newValue;
}, {
    immediate: true,
});

const getToolBarData = computed(() => {
    let data = houseData.value;

    let favoriteCount = 0;
    let totalCount = 0;
    if (data.preloadHouse) {
        favoriteCount = data.preloadHouse.favoriteCount;
        totalCount = data.preloadHouse.totalCount;
    } else {
        totalCount = data.commentBriefForCD.totalCount;
    }
    return {
        logoUrl: data.logoUrl,
        favoriteCount,
        totalCount,
    };
});

const getTitleData = computed(() => {
    let data = houseData.value;
    return {
        address: data.address,
        unit: data.unitSummeries[0]?.text,
        unitDesp: data.unitSummeries[1]?.text,
        unitName: data.unitName,
    };
});
</script>

<template>
    <div class="search-list-item">
        <div class="swiper-wrapper">
            <!-- 轮播图 -->
            <img class="banner" :src="houseData.defaultPicture" />
            <!-- 分页器 -->
            <div class="bottom">
                <div class="msg-tip">
                    <strong v-if="itemData.overall" class="score">{{ itemData.commentBriefForCD.overall }}分</strong>
                    <span class="answer">{{ itemData.commentBriefForCD.commentBrief }}</span>
                </div>
            </div>
            <!-- 侧边栏 -->
            <div class="side-bar">
                <div class="tool-bar">
                    <img class="avatar" :src="getToolBarData.logoUrl" alt="" />
                    <div class="collection">
                        <img class="heart-img" src="../../assets/img/search/tj-mob-ui_unit-item_collected-new.png" alt="" />
                        <span v-if="getToolBarData.favoriteCount">{{ getToolBarData.favoriteCount }}</span>
                    </div>
                    <div class="message">
                        <img class="msg-img" src="../../assets/img/search/tj-mob-ui_unit-item_comment-new.png" alt="" />
                        <span>{{ getToolBarData.totalCount }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <!--  -->
            <div class="search-list-item-title">
                <div class="info">
                    <van-tag color="#3f4954" text-color="#fff">
                        {{ getTitleData.address }}
                    </van-tag>
                    <span class="name">{{ getTitleData.unit }}</span>
                    <span class="desp">{{ getTitleData.unitDesp }}</span>
                </div>
                <div class="title ellipsis-text-2">{{ getTitleData.unitName }}</div>
            </div>
            <!--  -->
            <div class="search-list-item-info">
                <div class="tags">
                    <template v-for="(item, index) in itemData.houseTags" :key="index">
                        <van-tag :color="item.background.color" :text-color="item.color">
                            {{ item.text }}
                        </van-tag>
                    </template>
                </div>

                <div class="price">
                    <span class="real-price">{{ itemData.finalPrice }}</span>
                    <span class="old-price">¥{{ itemData.productPrice }}</span>
                    <van-tag v-if="itemData.priceTipBadge" round color="rgb(251, 74, 74)" text-color="#fff">
                        <i class="icon-unit-sound"></i>
                        {{ itemData.priceTipBadge.text }}
                    </van-tag>
                </div>
                <div v-if="itemData.promoContent" class="footer">
                    <van-tag round color="transparent" text-color="#f66">
                        {{ itemData.promoContent }}
                    </van-tag>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="less">
.search-list-item {
    margin: 10px 0px;
}

.swiper-wrapper {
    position: relative;

    .banner {
        width: 100%;
        border-radius: 6px;
        margin-bottom: 7px;
    }

    .bottom {
        position: absolute;
        bottom: 15px;
        left: 10px;
        right: 10px;

        .msg-tip {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            max-width: 55%;

            height: 17px;
            padding-left: 6px;
            border-radius: 10px;
            background-color: hsla(0, 0%, 100%, 0.9);

            .score {
                font-size: 14px;
                transform: scale(0.8);
                transform-origin: 0 center;
                color: #333;
            }

            .answer {
                position: relative;
                font-size: 12px;
                transform: scale(0.8);
                transform-origin: 0 center;
                margin-left: -2px;
                padding-left: 5px;
                color: #666;

                &::before {
                    content: " ";
                    left: 0;
                    top: 2px;
                    position: absolute;
                    height: 10px;
                    width: 1px;
                    background-color: #dadada;
                }
            }
        }
    }

    .side-bar {
        position: absolute;
        top: 10px;
        right: 10px;

        .tool-bar {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-top: 5px;
        }

        .message,
        .collection {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 10px;

            .msg-img,
            .heart-img {
                width: 30px;
                height: 30px;
            }

            span {
                color: white;
            }
        }
    }
}

.info {
    display: flex;
    align-items: center;

    .name,
    .desp {
        font-size: 12px;
        white-space: nowrap;
        color: #666;
    }

    .name {
        position: relative;
        margin-left: 10px;
        margin-right: 10px;

        &::after {
            position: absolute;
            content: "";
            top: 45%;
            right: -25%;
            width: 2px;
            height: 2px;
            border-radius: 2px;
            background-color: #666;
        }
    }
}

.title {
    line-height: 22px;
    font-size: 18px;
    margin-top: 8px;
    font-weight: 500;
}

.search-list-item-info {
    margin-top: 7px;

    .tags :deep(.van-tag) {
        margin-right: 6px;
    }

    .price {
        margin-top: 3px;
        margin-bottom: 7px;

        .real-price {
            position: relative;
            top: 1px;
            color: #ff9645;
            font-size: 20px;
            padding-right: 10px;
            padding-left: 1px;

            &::before {
                content: "¥";
                bottom: 0;
                font-size: 14px;
                padding-right: 3px;
            }
        }

        .old-price {
            font-weight: 500;
            font-size: 12px;
            color: #999;
            text-decoration: line-through;
            padding-right: 5px;
        }

        .icon-unit-sound {
            margin-right: 5px;
            display: inline-block;
            width: 10px;
            height: 10px;
            background-image: url(https://fe.tujiacdn.com/pwa/static/fevueui/images/unit-item-m/icon-unit-sound.png);
            background-size: 10px 10px;
            background-repeat: no-repeat;
            background-position: 50%;
        }
    }

    .price :deep(.van-tag) {
        position: relative;
        font-size: 12px;
        transform: scale(0.9);
    }
}
</style>