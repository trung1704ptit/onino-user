<template>
<div>
    <div v-for="(day, index) in days" :key="index" class="inline-block mt-15 mb-15">
        <day :day="day" :handleClick="handleClick" />
    </div>
    <hour-timer />
</div>
</template>

<script>
import Day from './Day';
import HourTimer from  './HourTimer';

export default {
    components: {
        Day,
        HourTimer
    },
    data() {
        return {
            days: [2, 3, 4, 5, 6, 7, 8],
            selected: []
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
