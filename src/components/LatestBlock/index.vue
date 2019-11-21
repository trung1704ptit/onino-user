<template>
<router-link :to="href">
    <div class="card-panel box block block-shadow">
        <div class="content">
            <svg-icon icon-class="list" /> {{ $t('root.viewAll')}}
        </div>
    </div>
</router-link>
</template>

<script>
    export default {
        props: {
            href: String
        }
    }
</script>

<style lang="scss" scoped>
.block {
    height: calc(100% - 30px);
    display: flex;
    margin: 15px 15px 15px 0;

    .content {
        margin: auto;
    }
}
</style>
