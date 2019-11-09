<template>
<section class="section">
    <div class="mt-15 mb-15">
        <div class="flex space-between mt-15 mb-15">
            <span class="section-title">{{ $t('dashboard.roomList') }}</span>
            <router-link to="/room/tat-ca"><span class="view-more">{{ $t('root.viewAll')}}</span></router-link>
        </div>
        <div v-if="roomList.length > 0">
            <carousel :per-page="1" :scrollPerPage="true" :perPageCustom="[[480, 2], [768, 6]]" :paginationEnabled="false" navigationEnabled navigationNextLabel='<i class="el-icon-arrow-right" />' navigationPrevLabel='<i class="el-icon-arrow-left" />'>
                <slide v-for="(room, index) in roomList" :key="index">
                    <room :room="room" :base="'room/'" :dialogConfirmDelete="dialogConfirmDelete" :handleDelete="confirmDelete" class="box p-15 mb-15 block box-shadow" />
                </slide>
            </carousel>

            <el-dialog :title="$t('room.confirmDelete')" :visible.sync="dialogConfirmDelete">
                <div>{{ $t('room.confirmDeleteMessage') }}</div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogConfirmDelete = false">
                        {{ $t('root.cancel') }}
                    </el-button>
                    <el-button :loading="deleting" type="primary" @click="handleDelete">
                        {{ $t('root.confirm') }}
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>

    <div v-if="roomList.length === 0" class="box box-shadow p-15">
        <p class="white-text"><i>{{ $t('root.emptyList') }}</i></p>
    </div>
</section>
</template>

<script>
import Room from '@/components/Room'
import i18n from '@/lang'
import {
    mapGetters,
    mapstate
} from 'vuex'

export default {
    data() {
        return {
            dialogConfirmDelete: false,
            roomToDelete: '',
            deleting: false
        }
    },
    mounted() {
        if (this.roomList.length === 0) {
            this.$store.dispatch('room/getAllRoom').then(response => {
                this.roomList = response;
            })
        }
    },
    computed: {
        roomList: {
            get: function () {
                return this.$store.state.room.roomList;
            },
            set: function () {}
        }
    },
    components: {
        Room
    },
    methods: {
        confirmDelete(groupId) {
            this.roomToDelete = groupId;
            this.dialogConfirmDelete = true;
        },
        handleDelete() {
            this.deleting = true;
            this.$store.dispatch('room/deleteRoom', this.roomToDelete).then(response => {
                this.$message({
                    message: i18n.t('room.deleteRoomSuccess'),
                    type: 'success',
                    showClose: true,
                    duration: 4000
                });
                this.dialogConfirmDelete = false;
                this.deleting = false;
            })
        }
    }
}
</script>
