<template>
<div>
    <div v-for="(day, index) in days" :key="index" class="inline-block mt-15 mb-15">
        <day :day="day" :handleClick="handleClick" />
    </div>
</div>
</template>

<script>
import Day from './Day';
import Vue from 'vue'
import {
    Datetime
} from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)

export default {
    components: {
        Day,
        Datetime
    },
    data() {
        return {
            days: [2, 3, 4, 5, 6, 7, 8],
            selected: [],
            startTime: '2019-11-15T05:15:00.000Z'
        }
    },
    methods: {
        handleClick(day) {
            const isSelected = this.selected.some(d => d === day)
            if (isSelected) {
                this.selected = this.selected.filter(d => d !== day);
            } else {
                this.selected.push(day)
            }
            this.selected.sort();
        }
    }
}
</script>

<style lang="scss">
.vdatetime {
    .vdatetime-input {
        border: 1px solid var(--main-color);
        border-radius: 4px;
        color: #fff;
        padding: 5px;
        background: transparent;
    }
}

.time {
    margin-top: 5px;
    color: #fff;
}
</style>
