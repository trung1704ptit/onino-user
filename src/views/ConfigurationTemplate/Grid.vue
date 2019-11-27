<template>
  <section class="section panel-group bg-light m-15">
    <div class="mt-15 mb-15 p-15">
      <h2 class="text">{{ $t('configuration.configurationList')}}</h2>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6" v-for="(room, index) in roomList" :key="index">
          <block grid />
        </el-col>
      </el-row>

      <el-dialog :title="$t('room.confirmDelete')" :visible.sync="dialogConfirmDelete">
        <div>{{ $t('room.confirmDeleteMessage') }}</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogConfirmDelete = false">{{ $t('root.cancel') }}</el-button>
          <el-button
            :loading="deleting"
            type="primary"
            @click="handleDelete"
          >{{ $t('root.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import Room from "@/components/Room";
import i18n from "@/lang";
import { mapGetters, mapstate } from "vuex";

import CountTo from "vue-count-to";
import Block from "./Block";

export default {
  components: {
    CountTo,
    Block
  },
  data() {
    return {
      dialogConfirmDelete: false,
      roomToDelete: "",
      deleting: false
    };
  },
  mounted() {
    if (this.roomList.length === 0) {
      this.$store.dispatch("room/getAllRoom").then(response => {
        this.roomList = response;
      });
    }
  },
  computed: {
    roomList: {
      get: function() {
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
      this.$store
        .dispatch("room/deleteRoom", this.roomToDelete)
        .then(response => {
          this.$message({
            message: i18n.t("room.deleteRoomSuccess"),
            type: "success",
            showClose: true,
            duration: 4000
          });
          this.dialogConfirmDelete = false;
          this.deleting = false;
        });
    },
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }
}
</style>
