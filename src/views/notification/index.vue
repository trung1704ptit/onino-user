<template>
<div class="bg-light block-shadow p-15 m-15">
    <div v-if="notifications.length > 0">
        <div class="p-15 notify-item" v-for="item of notifications" :key="item.value">
            <div class="flex">
                <img :src="item.icon" class="notify-icon" />
                <div>
                    <p class="m-0 white-text">{{ item.description }}</p>
                    <i class="timestamp">{{ moment(item.timestamp).format('HH:MM DD/MM/YYYY') }}</i>
                </div>

                <i class="el-icon-close remove white-text" :title="$t('root.delete')" @click="handleRemove(item.id)" />
            </div>
        </div>
    </div>
    <div v-if="notifications.length === 0">
        {{ $t('root.emptyList')}}
    </div>
</div>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            notifications: [{
                    id: 123243566,
                    icon: 'https://s3.ap-southeast-1.amazonaws.com/stg.onino.userdata/5daebf23428cfd00010122f5?1572231646184',
                    value: 'default1',
                    description: 'Nhiệt độ phòng đang là 33C, hệ thống điều hòa vừa được bật',
                    type: 'Kitchen',
                    timestamp: new Date()
                },
                {
                    id: 314534234,
                    icon: 'https://s3.ap-southeast-1.amazonaws.com/stg.onino.userdata/5daebf23428cfd00010122f5?1572231646184',
                    value: 'default2',
                    description: 'Nhiệt độ phòng đang là 33C, hệ thống điều hòa vừa được bật',
                    type: 'Kitchen',
                    timestamp: new Date()
                }
            ]
        }
    },
    computed: {
        size() {
            return this.$store.getters.size
        }
    },
    methods: {
        handleRemove(id) {
            this.notifications = this.notifications.filter(item => item.id !== id);
        },
        moment: () => moment()
    }
}
</script>

<style lang="scss" scoped>
.notify-item {
    border-bottom: 1px solid #f1f1f1;
    position: relative;
}

.notify-icon {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 15px;
}

.remove {
    position: absolute;
    right: 15px;
    top: 20px;
    cursor: pointer;
}
</style>
