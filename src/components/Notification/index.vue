<template>
    <el-dropdown trigger="click" @command="handleRemoveNotification">
        <div>
        <i class="el-icon-bell" />
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-header-menu">
            <el-dropdown-item v-for="item of notifications" :key="item.value" :disabled="size===item.value" :command="item.value">
                <div class="p-15 notify-item">
                    <div class="flex">
                        <img :src="item.icon" class="notify-icon"/>
                        <div>
                            <p class="m-0">{{ item.description }}</p>
                            <i class="timestamp">{{ moment(item.timestamp).format('HH:MM DD/MM/YYYY') }}</i>
                        </div>
                    </div>
                </div>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
        notifications: [
            {
                label: 'Default',
                icon: 'https://s3.ap-southeast-1.amazonaws.com/stg.onino.userdata/5daebf23428cfd00010122f5?1572231646184',
                value: 'default',
                description: 'Nhiệt độ phòng đang là 33C, hệ thống điều hòa vừa được bật',
                type:  'Kitchen',
                timestamp: new Date()
            },
            {
                label: 'Default',
                icon: 'https://s3.ap-southeast-1.amazonaws.com/stg.onino.userdata/5daebf23428cfd00010122f5?1572231646184',
                value: 'default',
                description: 'Nhiệt độ phòng đang là 33C, hệ thống điều hòa vừa được bật',
                type:  'Kitchen',
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
    handleRemoveNotification(size) {
    },
    moment: () => moment()
  }
}
</script>

<style lang="scss" scoped>
    .notify-item {
        border-bottom: 1px solid #f1f1f1;
    }
    .notify-icon {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 15px;
    }
</style>