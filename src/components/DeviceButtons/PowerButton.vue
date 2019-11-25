<template>
  <div class="button-wrapper">
    <el-button
      type="primary"
      @click="handleClickButton"
      class="button"
      :style="{ width: size + 'px', height: size + 'px', borderColor: on ? activeColor : offlineColor }"
    >
      <img :src="iconUrl" alt="power button" />
    </el-button>
    <div class="text">{{ on ? 'Bật' : 'Tắt' }}</div>
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
    offlineColor: {
        type: String,
        default: "#e64242"
    },
    activeColor: {
      type: String,
      default: "#0588cb"
    },
    power: Boolean,
    on: {
      type: Boolean,
      default: true
    }
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
        this.on = !this.on;
        const isOn = this.on;

        if (isOn) {
          new TintColor(this.iconUrl, this.activeColor)
            .run()
            .then(newImage => {
              this.iconUrl = newImage.url;
            });
        } else {
          new TintColor(this.iconUrl, this.offlineColor).run().then(newImage => {
            this.iconUrl = newImage.url;
          });
        }
    }
  },
  mounted() {
    if (this.power) {
      new TintColor(this.icon, this.activeColor).run().then(newImage => {
        this.iconUrl = newImage.url;
      });
    } else {
      new TintColor(this.icon, this.activeColor).run().then(newImage => {
        this.iconUrl = newImage.url;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  text-align: center;
  margin: 0 10px 10px 10px;
  width: 100%;

  .button {
    border: 3px solid transparent;
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
    font-size: 14px;
  }

  &.active {
    color: var(--main-color);

    .circle {
      border: 2px solid var(--main-color);
    }
  }
}
</style>
