<template>
    <section class="section mt-15 mb-15">
      <div class="flex space-between mt-15 mb-15">
        <span class="section-title">{{ $t('dashboard.roomList') }}</span>
        <router-link to="/"><span class="view-more">Xem thêm</span></router-link>
      </div>
      <carousel
        :per-page="1"
        :scrollPerPage="true"
        :perPageCustom="[[480, 2], [768, 6]]"
        :paginationEnabled="false"
        navigationEnabled
        navigationNextLabel='<i class="el-icon-arrow-right" />'
        navigationPrevLabel='<i class="el-icon-arrow-left" />'
      >
        <slide>
          <div class="box p-15 block" @click="viewBlock">
            <img src="@/assets/img/bed.png" class="room-icon" />
            <div class="title">
                <span>Phòng ngủ</span>
            </div>
            <div class="flex space-between">
                <span>28°C</span>
                <span>80%</span>
            </div>
          </div>
        </slide>
        <slide>
          <div class="box p-15 block" @click="viewBlock">
            <img src="@/assets/img/bed.png" class="room-icon" />
            <div class="title">
                <span>Phòng ngủ</span>
            </div>
            <div class="flex space-between">
                <span>28°C</span>
                <span>80%</span>
            </div>
          </div>
        </slide>
        <slide>
          <div class="box p-15 block" @click="viewBlock">
            <img src="@/assets/img/shower.png" class="room-icon" />
            <div class="title">
                <span>Phòng tắm</span>
            </div>
            <div class="flex space-between">
                <span>28°C</span>
                <span>80%</span>
            </div>
          </div>
        </slide>
        <slide>
          <div class="box p-15 block" @click="viewBlock">
            <img src="@/assets/img/bed.png" class="room-icon" />
            <div class="title">
                <span>Phòng ngủ</span>
            </div>
            <div class="flex space-between">
                <span>28°C</span>
                <span>80%</span>
            </div>
          </div>
        </slide>
                <slide>
          <div class="box p-15 block" @click="viewBlock">
            <img src="@/assets/img/shower.png" class="room-icon" />
            <div class="title">
                <span>Phòng tắm</span>
            </div>
            <div class="flex space-between">
                <span>28°C</span>
                <span>80%</span>
            </div>
          </div>
        </slide>
        <slide>
          <div class="box p-15 block" @click="viewBlock">
            <img src="@/assets/img/bed.png" class="room-icon" />
            <div class="title">
                <span>Phòng ngủ</span>
            </div>
            <div class="flex space-between">
                <span>28°C</span>
                <span>80%</span>
            </div>
          </div>
        </slide>
                <slide>
          <div class="box p-15 block" @click="viewBlock">
            <img src="@/assets/img/shower.png" class="room-icon" />
            <div class="title">
                <span>Phòng tắm</span>
            </div>
            <div class="flex space-between">
                <span>28°C</span>
                <span>80%</span>
            </div>
          </div>
        </slide>
        <slide>
          <div class="box p-15 block" @click="viewBlock">
            <img src="@/assets/img/bed.png" class="room-icon" />
            <div class="title">
                <span>Phòng ngủ</span>
            </div>
            <div class="flex space-between">
                <span>28°C</span>
                <span>80%</span>
            </div>
          </div>
        </slide>
      </carousel>
    </section>
</template>

<style lang="scss" scoped>
    .VueCarousel-navigation-button {
        font-size: 35px !important;
        background-color: rgba(0,0,0,.6) !important;
        border-radius: 4px;
        padding: unset !important;
        color: #fff !important;
    }
    button.VueCarousel-navigation-next {
        right: 60px !important;
    }
    button.VueCarousel-navigation-prev {
        left: 60px !important;
    }
    .block {
        position: relative;
        cursor: pointer;
        height: 150px;
        margin-right: 15px;
        border: 3px solid #fff;
        transition: all 0.2s ease-in-out;
        text-align: center;
        &:hover {
            border: 3px solid #fff;
            border-image: linear-gradient(45deg, var(--main-color), rgb(250,224,66)) 1;
        }
        .title {
            text-align: center;
        }
        .room-icon {
            margin: auto;
            max-width: 100px;
            max-height: 70px;
            margin-bottom: 10px;
        }
    }
</style>