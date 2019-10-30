<template>
<section class="section mt-15 mb-15">
    <div class="flex space-between mt-15 mb-15">
        <span class="section-title">{{ $t('dashboard.roomList') }}</span>
        <router-link to="/room/tat-ca"><span class="view-more">{{ $t('root.viewAll')}}</span></router-link>
    </div>
    <carousel :per-page="1" :scrollPerPage="true" :perPageCustom="[[480, 2], [768, 6]]" :paginationEnabled="false" navigationEnabled navigationNextLabel='<i class="el-icon-arrow-right" />' navigationPrevLabel='<i class="el-icon-arrow-left" />'>
        <slide v-for="(room, index) in roomList" :key="index">
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
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            dialogConfirmDelete: false,
            roomList: []
        }
    },
    computed: {
        ...mapGetters([
            'room'
        ])
    },
    mounted() {
        if (this.room.roomList.length === 0) {
            this.$store.dispatch('room/getAllRoom').then(response => {
                console.log(response);
                this.roomList = response;
            })
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