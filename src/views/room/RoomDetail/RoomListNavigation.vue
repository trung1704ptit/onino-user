<template>
  <div v-if="roomList.length > 0">
    <carousel
      :per-page="1"
      :scrollPerPage="true"
      :perPageCustom="[[480, 2], [992, 7]]"
      :paginationEnabled="false"
    >
      <slide v-for="(room, index) in roomList" :key="index" style="padding-right: 8px">
        <router-link :to="'/room/chi-tiet/' + room.id" style="width: 100%">
          <el-button
            :type="currentRoomId === room.id && 'primary'"
            size="small"
            class="uppercase"
            style="width: 100%"
          >{{ room.name }}</el-button>
        </router-link>
      </slide>
    </carousel>
  </div>
</template>

<script>
export default {
  props: {
    roomList: Array,
    currentRoomId: String
  }
};
</script>