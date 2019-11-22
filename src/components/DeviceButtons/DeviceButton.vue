<template>
  <div class="button-wrapper" @click="handleClickButton">
    <el-button
      type="primary"
      @click="handleClickButton"
      class="button"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <img :src="iconUrl" />
    </el-button>
    <div class="text">{{ title }}</div>
  </div>
</template>

<script>
import TintColor from "@/utils/tint-color";

export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    size: {
      type: [String, Number],
      default: "50"
    },
    title: {
      type: String,
      default: "Tăng"
    },
    onClickButton: Function,
    offlineColor: String,
    activeColor: {
      type: String,
      default: "#ffffff"
    },
    power: Boolean
  },
  data() {
    return {
      active: false,
      iconUrl: ""
    };
  },
  methods: {
    handleClickButton() {
      this.active = !this.active;
      this.onClickButton();
      if (this.power) {
        // new TintColor(this.icon, this.offlineColor).run().then(newImage => {
        //   this.iconUrl = newImage.url;
        // });
      }
    }
  },
  mounted() {
    new TintColor(this.icon, this.activeColor).run().then(newImage => {
      this.iconUrl = newImage.url;
    });
  }
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  text-align: center;
  margin: 0 10px 10px 10px;
  width: 100%;

  .button {
    border: 2px solid var(--main-color);
    border-radius: 50%;
    padding: 12px;
    cursor: pointer;
    background: transparent;
    background-position: center;
    transition: background 0.8s;

    img {
      width: 100%;
    }

    &:active {
      background-color: #6eb9f7;
      background-size: 100%;
      transition: background 0s;
    }
  }

  .text {
    margin-top: 10px;
    color: #fff;
  }

  &.active {
    color: var(--main-color);

    .circle {
      border: 2px solid var(--main-color);
    }
  }
}
</style>
