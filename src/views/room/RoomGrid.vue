<template>
<section class="box section">
    <h4 class="section-title m-15">{{ $t('dashboard.roomList') }}</h4>

    <el-row :gutter="10">
        <el-col :xs="24" :sm="6" v-for="(room, index) in rooms" :key="index">
            <room :room="room" :dialogConfirmDelete="dialogConfirmDelete" :handleDelete="handleDelete" class="box p-15 block m-15 box-shadow" />
        </el-col>
    </el-row>

    <el-dialog :title="$t('room.confirmDelete')" :visible.sync="dialogConfirmDelete">
        <div>{{ $t('room.confirmDeleteMessage') }}</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogConfirmDelete = false">
                {{ $t('root.cancel') }}
            </el-button>
            <el-button type="primary">
                {{ $t('root.confirm') }}
            </el-button>
        </div>
    </el-dialog>
</section>
</template>

<script>
import Room from '@/components/Room'

export default {
    data() {
        return {
            rooms: [{
                    title: 'Phòng ngủ',
                    icon: '@/assets/img/bed.png',
                    temperature: 28,
                    humidity: 80
                },
                {
                    title: 'Phòng ngủ',
                    icon: '@/assets/img/bed.png',
                    temperature: 28,
                    humidity: 80
                },
                {
                    title: 'Phòng ngủ',
                    icon: '@/assets/img/bed.png',
                    temperature: 28,
                    humidity: 80
                },
                {
                    title: 'Phòng ngủ',
                    icon: '@/assets/img/bed.png',
                    temperature: 28,
                    humidity: 80
                },
                {
                    title: 'Phòng ngủ',
                    icon: '@/assets/img/bed.png',
                    temperature: 28,
                    humidity: 80
                },
                {
                    title: 'Phòng ngủ',
                    icon: '@/assets/img/bed.png',
                    temperature: 28,
                    humidity: 80
                }, {
                    title: 'Phòng ngủ',
                    icon: '@/assets/img/bed.png',
                    temperature: 28,
                    humidity: 80
                },
                {
                    title: 'Phòng ngủ',
                    icon: '@/assets/img/bed.png',
                    temperature: 28,
                    humidity: 80
                }
            ],
            dialogConfirmDelete: false
        }
    },
    components: {
        Room
    },
    methods: {
        handleDelete(e) {
            e.preventDefault();
            this.dialogConfirmDelete = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
