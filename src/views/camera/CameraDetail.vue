<template>
    <div class="box p-15 box-shadow m-15">
        <el-row :gutter="20">
            <el-col :span="16" :xs="24">
                <div class="block">
                    <iframe width="100%" height="500" src="https://www.youtube.com/embed/rR5HnFS3bJE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </el-col>

            <el-col :span="8" :xs="24">
                <div class="block">
                    <h4 class="history-title">{{ $t('camera.sensorHistory') }}</h4>
                    <ul>
                        <li>
                            <div class="flex space-between content">
                                <div class="flex">
                                    <img src="@/assets/img/walking.png" class="action-icon" />
                                    <div class="description">
                                        Cảm biến chuyển động phát hiện người lạ
                                        <i class="timestamp">{{ moment(new Date()).format('HH:MM DD/MM/YYYY') }}</i>
                                    </div>
                                </div>
                                <img src="@/assets/img/camera-01.jpg" class="camera-capture" />
                            </div>
                        </li>
                        <li>
                            <div class="flex space-between content">
                                <div class="flex">
                                    <img src="@/assets/img/walking.png" class="action-icon" />
                                    <div class="description">
                                        Cảm biến chuyển động phát hiện người lạ
                                        <i class="timestamp">{{ moment(new Date()).format('HH:MM DD/MM/YYYY') }}</i>
                                    </div>
                                </div>
                                <img src="@/assets/img/camera-02.jpg" class="camera-capture" />
                            </div>
                        </li>
                        <li>
                            <div class="flex space-between content">
                                <div class="flex">
                                    <img src="@/assets/img/walking.png" class="action-icon" />
                                    <div class="description">
                                        Cảm biến chuyển động phát hiện người lạ
                                        <i class="timestamp">{{ moment(new Date()).format('HH:MM DD/MM/YYYY') }}</i>
                                    </div>
                                </div>
                                <img src="@/assets/img/camera-01.jpg" class="camera-capture" />
                            </div>
                        </li>
                        <li>
                            <div class="flex space-between content">
                                <div class="flex">
                                    <img src="@/assets/img/walking.png" class="action-icon" />
                                    <div class="description">
                                        Cảm biến chuyển động phát hiện người lạ
                                        <i class="timestamp">{{ moment(new Date()).format('HH:MM DD/MM/YYYY') }}</i>
                                    </div>
                                </div>
                                <img src="@/assets/img/camera-02.jpg" class="camera-capture" />
                            </div>
                        </li>
                                                <li>
                            <div class="flex space-between content">
                                <div class="flex">
                                    <img src="@/assets/img/walking.png" class="action-icon" />
                                    <div class="description">
                                        Cảm biến chuyển động phát hiện người lạ
                                        <i class="timestamp">{{ moment(new Date()).format('HH:MM DD/MM/YYYY') }}</i>
                                    </div>
                                </div>
                                <img src="@/assets/img/camera-02.jpg" class="camera-capture" />
                            </div>
                        </li>
                                                <li>
                            <div class="flex space-between content">
                                <div class="flex">
                                    <img src="@/assets/img/walking.png" class="action-icon" />
                                    <div class="description">
                                        Cảm biến chuyển động phát hiện người lạ
                                        <i class="timestamp">{{ moment(new Date()).format('HH:MM DD/MM/YYYY') }}</i>
                                    </div>
                                </div>
                                <img src="@/assets/img/camera-02.jpg" class="camera-capture" />
                            </div>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    methods: {
        moment: () => moment()
    }
}
</script>

<style lang="scss" scoped>
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        max-height: 500px;
        overflow: auto;
        li {
            &:hover {
                background: #fff;
            }
            padding: 10px 10px 10px 0;
            .content {
                border-bottom: 1px solid #f1f1f1;
            }
        }
    }
    .history-title {
        margin-top: 0;
    }
    .description {
        margin: 0 15px;
    }
    .action-icon {
        width: 50px;
        height: 50px;
    }
    .camera-capture {
        width: 130px;
        height: auto;
        margin-bottom: 10px;
        object-fit: cover;
    }
</style>