<template>
<router-link :to="href">
    <div class="card-panel box block block-shadow">
        <div class="content" v-if="viewAll">
            <svg-icon icon-class="list" /> {{ $t('root.viewAll')}}
        </div>
        <div class="content" v-if="addNew">
            <i class="el-icon-plus" /> {{ $t('route.addNew')}}
        </div>
    </div>
</router-link>
</template>

<script>
    export default {
        props: {
            href: String,
            viewAll: Boolean,
            addNew: Boolean
        },
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
