<template>
<section class="section mt-15 mb-15">
    <div class="flex space-between mt-15 mb-15">
        <span class="section-title">{{ $t('dashboard.roomList') }}</span>
        <router-link to="/room/tat-ca"><span class="view-more">{{ $t('root.viewAll')}}</span></router-link>
    </div>
    <carousel :per-page="1" :scrollPerPage="true" :perPageCustom="[[480, 2], [768, 6]]" :paginationEnabled="false" navigationEnabled navigationNextLabel='<i class="el-icon-arrow-right" />' navigationPrevLabel='<i class="el-icon-arrow-left" />'>
        <slide v-for="(room, index) in rooms" :key="index">
            <room :room="room" :dialogConfirmDelete="dialogConfirmDelete" :handleDelete="handleDelete" class="box p-15 mb-15 block box-shadow"/>
        </slide>
    </carousel>

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
            this.dialogConfirmDelete =  true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
