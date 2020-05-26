<template>
    <div class="builder__element builder__element-image">
        <img :src="imageUrl">
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: 'https://timeweb.com/upload/iblock/377/xtesttesttest2333.png.pagespeed.ic.32k3ryECVD.png'
        }
    }
}
</script>

<style lang="scss" scoped>
    img {
        max-width: 100%;
        display: block;
    }
</style>