<script setup>
import { onMounted, ref } from "vue";
import DetailSection from '@/components/detailSection/index.vue'

const props = defineProps({
    position: {
        type: Object,
        default: () => ({})
    }
})

const mapRef = ref()
onMounted(() => {
    const map = new BMapGL.Map(mapRef.value);
    const point = new BMapGL.Point(props.position.longitude, props.position.latitude); // 创建点坐标 
    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
    const marker = new BMapGL.Marker(point);  //绘制点
    map.addOverlay(marker)
})

</script>

<template>
    <div class="home">
        <DetailSection title="位置周边" more-text="查看更多周边信息">
            <div class="baidu" ref="mapRef"></div>
        </DetailSection>
    </div>
</template>

<style lang="less" scoped>
.baidu {
    height: 250px;
}
</style>
