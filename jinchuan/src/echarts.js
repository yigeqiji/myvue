/**
 * @Author 张宇辉
 * @Date 2021-03-23 15:58
 * @QQ 1719945567
 */

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import Vue from "vue"
import 'echarts-liquidfill'
import * as echarts from 'echarts/core';

// 引入柱状图图表，图表后缀都为 Chart
import {
    BarChart,PieChart,LineChart
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [BarChart,PieChart,LineChart,TitleComponent, TooltipComponent, GridComponent,LegendComponent,DataZoomComponent,  CanvasRenderer]
);
Vue.prototype.$echarts=echarts
