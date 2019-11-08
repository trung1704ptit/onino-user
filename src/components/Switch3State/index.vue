<template>
<div class="flex space-around state3">
    <div class="open" :title="$t('root.open')" @click="handleClick"><i class="el-icon-caret-left" /> <i class="el-icon-caret-right" /></div>
    <div class="stop" :title="$t('root.stop')" @click="handleClick"><i class="el-icon-minus" /> <i class="el-icon-minus" /></div>
    <div class="close" :title="$t('root.close')" @click="handleClick"><i class="el-icon-caret-right" /> <i class="el-icon-caret-left" /></div>
</div>
</template>

<script>
export default {
    methods: {
        handleClick(e) {
            e.preventDefault();
            console.log('handle click');
        }
    }
}
</script>

<style lang="scss" scoped>
.state3 {
    color: var(--main-color);
    letter-spacing: -5px;
    color: #fff;
    font-size: 22px;

    .el-icon-minus {
        transform: rotate(90deg);
        letter-spacing: -10px;
    }

    .stop {
        &:hover {
            color: var(--main-color)
        }
    }

    .open,
    .close {
        margin-top: 5px;

        &:hover {
            color: var(--main-color)
        }
    }
}
</style>
