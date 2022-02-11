<template>
    <div class="container">
      <div class="title">
        <slot name="title"></slot>
      </div>

      <div class="content">
        <div class="pie-box-container" v-for="(v,k) in pieData" :key="k" @mouseleave="hideAllToolTips">

          <div class="pie-box-title" v-text="v.content"></div>
<!--  pie-box-content start        -->
          <div class="pie-box-content">
              <div class="pie-box">
                <div class="pie-circle-border"></div>
                <div :id="`main${k}`" style="width:5rem;height:5rem;" class="echart-box"></div>
              </div>

              <img class="center-line-bg" src="@/assets/images/home/center-line.png" alt="" style="width:0.08rem;">

              <ul class="pie-alarm-info-ul">

                <li class="pie-alarm-info-li cursor-pointer" v-for="(sv,sk) in v.alarm_infos" :key="sk" @click="toListPage(sv)">

                  <div class="pie-item-left">
                    <img :src="require(`@/assets/images/home/alarm_icons/${sv.alarm_key}.png`)" alt="">
                  </div>

                  <div class="pie-item-right">

                    <div class="alarm-info-name" v-text="sv.content"></div>

                    <div class="pie-item-right-bottom">
                      <div class="alarm-info-color-tip" :style="{'background':sv.color}"></div>
                      <div class="alarm-info-count">
                        <span v-text="`${sv.count}`"></span>
                        <span>次</span>
                      </div>
                    </div>

                  </div>

                </li>
              </ul>
          </div>
          <!--  pie-box-content end        -->
        </div>
      </div>


    </div>
</template>

<script>

    import {loadHomePieChartOption} from "@/utils/echarts/option";
    import {homePieChartData} from "@/utils/echarts/mock-data";
    import {echartColors} from "@/utils/echarts/config";

    export default {
        name: "PieChart",
        data(){
          return{
            myChart: [],
            pieData: homePieChartData,
          }
        },
      methods:{
        toListPage(alarm){
          if (alarm.count==0){
            this.$notify(`今日没有 ${alarm.content} 数据`,"right",{color:"orange"})
            return
          }
          this.$router.push({name:'record',params:{alarm}})
        },
        async loadDailyPieData(isInterval) {
          const res=await this.$http.post(this.$apiServers.home.dailyPieChart.api,{ is_daily: true,isInterval })
          this.$nextTick(()=>{
            this.myChart=[]
            let colorIndex=0;
            let stats=res.zone_statistics
            stats.forEach((v,k)=>{
              v.k=k
              if(k===0){
                v.range=[0,v.alarm_infos.length-1]
              }else{
                let last=stats[k-1].range[1]
                v.range=[last+1,last+v.alarm_infos.length]
              }
              //TODO
              v.alarm_infos.forEach(v=>{
                v.name=v.content
                v.value=v.count
                v.color=echartColors[colorIndex]
                colorIndex++
              })
              this.initEchart(v)
            })
            this.pieData=res.zone_statistics
          })


          clearInterval(this.oneMinuteLoad)
          this.oneMinuteLoad = setInterval(() => {
            this.loadDailyPieData(true)
          }, 1000 * 60)
        },
        _echartsDispose(elID){
          let el = document.getElementById(elID);
          let existInstance = this.$echarts.getInstanceByDom(el);
          if (existInstance) {
            this.$echarts.dispose(existInstance);
          }
        },
        initEchart(data) {
          this._echartsDispose("main"+data.k)
          let myChart = this.$echarts.init(document.getElementById("main"+data.k));
          let homePieChartOption = loadHomePieChartOption(data);
          myChart.setOption(homePieChartOption,true);
          myChart.on("click",(v)=>{
            this.toListPage(v.data)
          })
          // myChart.resize({ width: 500, height: 500 })
          this.myChart.push(myChart)

        },
        hideAllToolTips() {
          for (let v of this.myChart) {
            if (v) {
              v.dispatchAction({
                type: 'hideTip',
              });
            }
          }
        },
        allChartsResize() {
          this.myChart.forEach((v)=>{
            if (v){
              v.resize()
            }
          })
        }
      },
      mounted() {
          this.loadDailyPieData()
          window.addEventListener("resize", this.allChartsResize)


      },
      beforeDestroy() {
        clearInterval(this.oneMinuteLoad)
        window.removeEventListener("resize", this.allChartsResize)

      }
    }
</script>

<style scoped lang="scss">
    //@import "~@/assets/sass/pages/home";
    $leftPieBoxWidth:40%;
    .container {
     @extend %container;
    }
    .title {
      @extend %title;
    }
    .content{
     @extend %content;
      padding-left:0.5rem;
    }

    .pie-box-container {
      width: 48.5%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }
    .pie-box-container:nth-child(1),.pie-box-container:nth-child(2){
      height:55%;
    }
    .pie-box-container:nth-child(3),.pie-box-container:nth-child(4){
      height:45%;

    }
    $pieBoxTitleHeight:15%;
    .pie-box-title {
      width: 100%;
      height:$pieBoxTitleHeight;
      @extend %middleFontSize;
      //font-weight: 700;
      color: $titleColor;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pie-box-content{
      width: 100%;
      height:100% - $pieBoxTitleHeight;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .pie-box {
      width:$leftPieBoxWidth;
      /* height:100%; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .pie-top-text {
      width: 100%;
      color: #fff;
      font-weight: 700;
      letter-spacing: 2px;
      font-size: 12px;
      text-align: center;
    }
    .pie-circle-border {
      position: absolute;
      padding:16%;
      border-radius: 50%;
      border:2px solid alphaColor-1(0.3);
    }
    .echart-box {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 999;

    }
    .pie-alarm-info-ul {
      width:100%-$leftPieBoxWidth;
      height:100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

    }
    .pie-alarm-info-ul>* {
      margin: 0;
    }
    .center-line-bg {
      margin: 0 0.7rem;
      width:1rem;
    }
    .pie-alarm-info-li {
      display: flex;
      align-items: center;
      justify-content: space-between;

    }
    .pie-alarm-info-li:not(:first-child){
    }
    .pie-item-left {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pie-item-left>img {
      width: 1.5rem;
    }
    .pie-item-right {
      display: flex;
      flex-direction: column;
      padding-left: 0.5rem;
    }
    .pie-item-right-bottom {
      display: flex;
      align-items: center;
    }
    .pie-alarm-info-li * {
      margin: 0;
    }
    .alarm-info-name {
      font-size: 10px;
      letter-spacing: 0.005rem;
      color: #fff;
      white-space: nowrap;
      padding:0;
    }
    .alarm-info-count {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $itemNameColor;
      font-weight: 700;
      margin-left: 0.3rem;
      /* position:absolute;
        right:0; */
    }
    .alarm-info-count > span {
      margin: 0;
      padding: 0;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .alarm-info-count > span:nth-child(1) {
      font-size: 0.7rem;
    }
    .alarm-info-count > span:nth-child(2) {
      font-size: 0.7rem;
    }
    .alarm-info-color-tip {
      min-width: 0.5rem;
      min-height: 0.5rem;
      border-radius: 3px;
    }
</style>
