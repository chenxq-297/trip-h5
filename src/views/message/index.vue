<script setup>

</script>

<template>
    <div class="message">
        <van-nav-bar title="消息中心" left-arrow @click-left="() => $router.back()">
            <template #right>
                <i class="icon-right-menu"></i>
            </template>
        </van-nav-bar>
        <div class="content">
            <img src="@/assets/img/message/icon_message.png" alt="">
            <div class="text">暂无聊天消息</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    img {
        width: 88%;
    }
}

.icon-right-menu {
    display: inline-block;
    width: 20px;
    height: 15px;
    background-image: url(../../assets/img/home/icon-right-menu.png);
    background-size: 20px 15px;
}
</style>

