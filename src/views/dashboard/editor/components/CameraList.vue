<template>
    <section class="box section">
      <div class="p-15 flex space-between">
        <span class="section-title">{{ $t('dashboard.cameraSecurity') }}</span>
        <router-link to="/"><span class="view-more">Xem thêm</span></router-link>
      </div>
      <carousel
        :per-page="1"
        :scrollPerPage="true"
        :perPageCustom="[[480, 1], [768, 3]]"
        :paginationEnabled="false"
        navigationEnabled
        navigationNextLabel='<i class="el-icon-arrow-right" />'
        navigationPrevLabel='<i class="el-icon-arrow-left" />'
      >
        <slide>
          <router-link to="/camera">
            <div class="box p-15 camera">
              <div class="title">
                <span>Phòng Khách</span>
              </div>
              <img src="@/assets/img/camera-01.jpg"/>
            </div>
          </router-link>
        </slide>
        <slide>
          <router-link to="/camera">
            <div class="box p-15 camera">
              <div class="title">
                <span>Phòng Khách</span>
              </div>
              <img src="@/assets/img/camera-01.jpg"/>
            </div>
          </router-link>
        </slide>
        <slide>
          <router-link to="/camera">
            <div class="box p-15 camera">
              <div class="title">
                <span>Phòng ăn</span>
              </div>
              <img src="@/assets/img/camera-01.jpg"/>
            </div>
          </router-link>
        </slide>
        <slide>
          <router-link to="/camera">
            <div class="box p-15 camera">
              <div class="title">
                <span>Phòng Ngủ</span>
              </div>
              <img src="@/assets/img/camera-01.jpg"/>
            </div>
          </router-link>
        </slide>
      </carousel>
    </section>
</template>

<style lang="scss">
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
    .camera {
        position: relative;
        cursor: pointer;
        img {
            height: 300px;
            object-fit: cover;
            width: 100%;
        }
        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 4px;
            padding: 2vw;
            color: #fff;
            background: rgba(0,0,0,0.5);
            text-align: center;
        }
    }
</style>