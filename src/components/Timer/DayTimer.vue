<template>
  <div class="section">
    <div class="flex mt-15">
      <span class="time mr-15">{{ $t('root.timeStart') }}:</span>

      <datetime type="datetime" v-model="startTime" input-id="startDate">
        <template slot="button-cancel">
          <fa :icon="['far', 'times']"></fa>
          {{$t('root.cancel')}}
        </template>
        <template slot="button-confirm">
          <fa :icon="['fas', 'check-circle']"></fa>
          {{$t('root.confirm')}}
        </template>
      </datetime>
    </div>

    <div class="flex mt-15">
      <span class="time mr-15">{{ $t('root.timeEnd') }}:</span>

      <datetime type="datetime" v-model="endTime" input-id="startDate">
        <template slot="button-cancel">
          <fa :icon="['far', 'times']"></fa>
          {{$t('root.cancel')}}
        </template>
        <template slot="button-confirm">
          <fa :icon="['fas', 'check-circle']"></fa>
          {{$t('root.confirm')}}
        </template>
      </datetime>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Datetime } from "vue-datetime";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";

export default {
  data() {
    return {
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
  },
  components: {
    datetime: Datetime
  }
};
</script>