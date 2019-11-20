<template>
    <div class="circle">
        {{ icon }}
    </div>
</template>
]
<script>
export default {
    props: {
        icon: Object
    },
    data() {

    },
    methods: {

    }
}
</script>


<style lang="scss" scoped>
    .circle {
        border: 1px solid #fff;
        &:hover, &.active {
            border: 1px solid var(--main-color);
        }
    }
</style>