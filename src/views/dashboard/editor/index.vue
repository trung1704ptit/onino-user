<template>
  <div class="dashboard-editor-container">
    <weather />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper box">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper box">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper box">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>

    <section class="box section">
      <div class="p-15 flex space-between">
        <span class="section-title">{{ $t('dashboard.cameraSecurity') }}</span>
        <router-link to="/"><span class="view-more">Xem thêm</span></router-link>
      </div>
      <carousel :per-page="1" :scrollPerPage="true" :perPageCustom="[[480, 1], [768, 3]]" :paginationEnabled="false" navigationEnabled>
        <slide>
          <div class="box p-15 camera" @click="viewCamera">
            <div class="title">
              <span>Phòng Khách</span>
            </div>
            <img src="@/assets/img/camera-01.jpg"/>
          </div>
        </slide>
        <slide>
          <div class="box p-15 camera" @click="viewCamera">
            <div class="title">
              <span>Phòng Ngủ</span>
            </div>
            <img src="@/assets/img/camera-02.jpg" />
          </div>
        </slide>
        <slide>
          <div class="box p-15 camera" @click="viewCamera">
            <div class="title">
              <span>Phòng Bếp</span>
            </div>          
            <img src="@/assets/img/camera-01.jpg" />
          </div>
        </slide>
        <slide>
          <div class="box p-15 camera" @click="viewCamera">
            <div class="title">
              <span>Cửa Trước</span>
            </div>          
            <img src="@/assets/img/camera-01.jpg" />
          </div>
        </slide>
      </carousel>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import VueCarousel, { Carousel, Slide }  from 'vue-carousel';
import Weather from './components/Weather';
 
Vue.use(VueCarousel);

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    Carousel,
    Slide,
    Weather
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    viewCamera() {
      console.log('view camera');
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
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

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
