<template>
<section class="section bg-light m-15">
    <h4 class="section-title m-15">{{ $t('dashboard.cameraSecurity') }}</h4>

    <el-row :gutter="10">
        <el-col :xs="24" :sm="8">
            <router-link to="/camera/chi-tiet">
                <div class="p-15 camera">
                    <div class="title">
                        <span>Phòng Khách</span>
                    </div>
                    <img src="@/assets/img/camera-01.jpg" />
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="8">
            <router-link to="/camera/chi-tiet">
                <div class="p-15 camera">
                    <div class="title">
                        <span>Phòng Khách</span>
                    </div>
                    <img src="@/assets/img/camera-01.jpg" />
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="8">
            <router-link to="/camera/chi-tiet">
                <div class="p-15 camera">
                    <div class="title">
                        <span>Phòng Khách</span>
                    </div>
                    <img src="@/assets/img/camera-01.jpg" />
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="8">
            <router-link to="/camera/chi-tiet">
                <div class="p-15 camera">
                    <div class="title">
                        <span>Phòng Khách</span>
                    </div>
                    <img src="@/assets/img/camera-01.jpg" />
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="8">
            <router-link to="/camera/chi-tiet">
                <div class="p-15 camera">
                    <div class="title">
                        <span>Phòng Khách</span>
                    </div>
                    <img src="@/assets/img/camera-01.jpg" />
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="8">
            <router-link to="/camera/chi-tiet">
                <div class="p-15 camera">
                    <div class="title">
                        <span>Phòng Khách</span>
                    </div>
                    <img src="@/assets/img/camera-01.jpg" />
                </div>
            </router-link>
        </el-col>
    </el-row>
</section>
</template>

<style lang="scss">
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
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
    }
}
</style>
