<template>
<div @click="handleSelect" class="day flex" :class="isSelected && 'active'">
    <span v-if="day !== 8" class="m-auto">{{ day }}</span>
    <span v-if="day === 8" class="m-auto">CN</span>
</div>
</template>

<script>
export default {
    props: {
        day: Number,
        handleClick: Function
    },
    data() {
        return {
            isSelected: false
        }
    },
    methods: {
        handleSelect() {
            this.handleClick(this.day);
            this.isSelected = !this.isSelected;
        }
    }
}
</script>

<style lang="scss" scoped>
.day {
    border: 1px solid var(--main-color);
    padding: 8px;
    color: #fff;
    background: var(--bg-light);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 6px;
    cursor: pointer;

    &:hover {
        background: var(--dark-blue)
    }

    &.active {
        background: var(--main-color);
    }
}
</style>
