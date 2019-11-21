<template>
    <div>
        <chrome-picker :value="colors" @input="updateColor" />
    </div>
</template>

<script>
import {
    Chrome
} from 'vue-color'

let defaultProps = {
    hex: '#4FCECB'
}

export default {
    props: {
        colors: {},
        updateColor: Function
    },
    components: {
        'chrome-picker': Chrome,
    },
}
</script>
