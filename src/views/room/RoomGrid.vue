<template>
<section class="box section">
    <h4 class="section-title m-15">{{ $t('dashboard.roomList') }}</h4>

    <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
            <router-link to="/room/chi-tiet">
                <div class="box p-15 m-15 block box-shadow ">
                    <img src="@/assets/img/bed.png" class="room-icon" />
                    <div class="title text mb-15">
                        <span>Phòng ngủ</span>
                    </div>
                    <div class="flex space-between text">
                        <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> 28°C</span>
                        <span><i class="fa fa-tint" aria-hidden="true"></i> 80%</span>
                    </div>
                    <div class="actions">
                        <i class="fa fa-trash-o" aria-hidden="true" :title="$t('root.delete')"></i>
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')"></i>
                    </div>
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="6">
            <router-link to="/room/chi-tiet">
                <div class="box p-15 m-15 block box-shadow ">
                    <img src="@/assets/img/bed.png" class="room-icon" />
                    <div class="title text mb-15">
                        <span>Phòng ngủ</span>
                    </div>
                    <div class="flex space-between text">
                        <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> 28°C</span>
                        <span><i class="fa fa-tint" aria-hidden="true"></i> 80%</span>
                    </div>
                    <div class="actions">
                        <i class="fa fa-trash-o" aria-hidden="true" :title="$t('root.delete')"></i>
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')"></i>
                    </div>
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="6">
            <router-link to="/room/chi-tiet">
                <div class="box p-15 m-15 block box-shadow">
                    <img src="@/assets/img/bed.png" class="room-icon" />
                    <div class="title text mb-15">
                        <span>Phòng ngủ</span>
                    </div>
                    <div class="flex space-between text">
                        <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> 28°C</span>
                        <span><i class="fa fa-tint" aria-hidden="true"></i> 80%</span>
                    </div>
                    <div class="actions">
                        <i class="fa fa-trash-o" aria-hidden="true" :title="$t('root.delete')"></i>
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')"></i>
                    </div>
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="6">
            <router-link to="/room/chi-tiet">
                <div class="box p-15 m-15 block box-shadow">
                    <img src="@/assets/img/bed.png" class="room-icon" />
                    <div class="title text mb-15">
                        <span>Phòng ngủ</span>
                    </div>
                    <div class="flex space-between text">
                        <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> 28°C</span>
                        <span><i class="fa fa-tint" aria-hidden="true"></i> 80%</span>
                    </div>
                    <div class="actions">
                        <i class="fa fa-trash-o" aria-hidden="true" :title="$t('root.delete')"></i>
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')"></i>
                    </div>
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="6">
            <router-link to="/room/chi-tiet">
                <div class="box p-15 m-15 block box-shadow">
                    <img src="@/assets/img/bed.png" class="room-icon" />
                    <div class="title text mb-15">
                        <span>Phòng ngủ</span>
                    </div>
                    <div class="flex space-between text">
                        <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> 28°C</span>
                        <span><i class="fa fa-tint" aria-hidden="true"></i> 80%</span>
                    </div>
                    <div class="actions">
                        <i class="fa fa-trash-o" aria-hidden="true" :title="$t('root.delete')"></i>
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')"></i>
                    </div>
                </div>
            </router-link>
        </el-col>

        <el-col :xs="24" :sm="6">
            <router-link to="/room/chi-tiet">
                <div class="box p-15 m-15 block box-shadow">
                    <img src="@/assets/img/bed.png" class="room-icon" />
                    <div class="title text mb-15">
                        <span>Phòng ngủ</span>
                    </div>
                    <div class="flex space-between text">
                        <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> 28°C</span>
                        <span><i class="fa fa-tint" aria-hidden="true"></i> 80%</span>
                    </div>
                    <div class="actions">
                        <i class="fa fa-trash-o" aria-hidden="true" :title="$t('root.delete')"></i>
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')"></i>
                    </div>
                </div>
            </router-link>
        </el-col>
    </el-row>
</section>
</template>

<style lang="scss" scoped>
@import './style.scss';
.block .actions {
    display: inline;
}
</style>
