<template>
<section class="box section">
    <h4 class="section-title m-15">{{ $t('dashboard.roomList') }}</h4>

    <div v-if="roomList.length > 0">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="6" v-for="(room, index) in roomList" :key="index">
                <room :room="room" :dialogConfirmDelete="dialogConfirmDelete" :handleDelete="confirmDelete" class="box p-15 block m-15 box-shadow" />
            </el-col>
        </el-row>

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

    <div v-if="roomList.length === 0" class="box p-15 m-15 box-shadow">
        <p><i>{{ $t('root.emptyList') }}</i></p>
    </div>

</section>
</template>

<script>
import Room from '@/components/Room'
import i18n from '@/lang';

export default {
    data() {
        return {
            dialogConfirmDelete: false,
            roomToDelete: '',
            deleting: false
        }
    },
    components: {
        Room
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
            set: function() {}
        }
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
