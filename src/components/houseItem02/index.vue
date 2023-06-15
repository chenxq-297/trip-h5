<script setup>
defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
})
</script>

<template>
    <div class="item02">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData.image.url">
            </div>
            <div class="info">
                <div class="summary">{{ itemData.summaryText }}</div>
                <div class="name">{{ itemData.houseName }}</div>
                <div class="price">
                    <van-rate :model-value="Number(itemData.commentScore)" color="#fff" :size="15" readonly allow-half />
                    <div class="new">¥ {{ itemData.finalPrice }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.item02 {
    width: 50%;

    .item-inner {
        position: relative;
        margin: 5px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;

        .cover {
            img {
                width: 100%;
            }
        }

        .info {
            position: absolute;
            bottom: 0;
            padding: 8px 10px;
            color: #fff;

            .summary {
                font-size: 12px;
            }

            .name {
                margin: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .price {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }
        }
    }
}
</style>
