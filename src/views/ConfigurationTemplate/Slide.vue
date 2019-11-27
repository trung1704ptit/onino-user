<template>
  <section class="section panel-group">
    <div class="mt-15 mb-15">
      <div class="flex space-between mt-15 mb-15">
        <span class="section-title">{{ $t('dashboard.configuration') }}</span>
        <router-link to="/cau-hinh/tat-ca">
          <span class="view-more">{{ $t('root.viewAll')}}</span>
        </router-link>
      </div>
      <carousel
        :per-page="1"
        :scrollPerPage="true"
        :perPageCustom="[[480, 1], [768, 3],[992, 5]]"
        :paginationEnabled="false"
        navigationEnabled
        navigationNextLabel='<i class="el-icon-arrow-right" />'
        navigationPrevLabel='<i class="el-icon-arrow-left" />'
      >
        <slide v-for="(item, index) in roomList" :key="index">
          <block :className="index == 1 ? 'active-bg' : ''" slide />
        </slide>
        <slide v-if="roomList.length < 6">
          <latest-block :href="'/cau-hinh/tat-ca'" viewAll />
        </slide>
      </carousel>

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
import LatestBlock from "@/components/LatestBlock";

export default {
  components: {
    CountTo,
    Block,
    LatestBlock
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
