<template>
<div class="container">
  <div class="crane-trigger" @click="isCraneShow=!isCraneShow"></div>
  <div class="title">
    <slot name="title"></slot>
  </div>
  <div class="content">
    <div class="weather-container" v-if="isWeathershow">
    <ul class="weather-ul">
      <li class="weather-li" v-for="(v,k) in weathers" :key="k">
        <img class="weather-icon" :src="require(`@/assets/images/home/weather_icons/${v.wea_img}.png`)" alt="">
        <p class="weather-temp">{{v.tem2}}~{{v.tem1}}℃</p>
        <p class="weather-content">{{weeks[v.week]}}/{{v.wea}}</p>
      </li>
    </ul>
    </div>

    <div class="common-container">
      <div class="common-container-title">
        <p class="title-text">环境态势</p>
        <img src="@/assets/images/home/center-line-row.png" alt="" class="title-line-img">
      </div>
      <ul class="item-ul">
        <li class="item-li" v-for="(v,k) in sensorInfos" :key="k">
          <p class="item-name" v-text="v.name"></p>
          <div class="item-progress" ref="item-progress">
            <div class="item-progress-percent" :style="`width:${v.percent};`">
              <div class="item-progress-bar" ref="progress-bar"></div>
            </div>
          </div>
          <p class="item-value" >{{v.value}}{{v.unit}}</p>
        </li>
      </ul>
    </div>

    <div class="common-container" v-show="this.isCraneShow">
      <div class="common-container-title">
        <p class="title-text">天车卷扬电机温度</p>
        <img src="@/assets/images/home/center-line-row.png" alt="" class="title-line-img">
      </div>
      <ul class="item-ul">
        <li class="item-li"  v-for="(v,k) in craneInfoKeys" :key="k">
          <p class="item-name" v-text="craneInfos[v].name"></p>
          <div class="item-progress" ref="item-progress">
            <div class="item-progress-percent" :style="`width:${craneInfos[v].temp}%;`">
              <div class="item-progress-bar" ref="progress-bar"></div>
            </div>
          </div>
          <p class="item-value  crane-item-value">{{craneInfos[v].temp}}℃</p>
        </li>
      </ul>
    </div>


  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
name: "SensorInfos",
  data(){
  return{
    isWeathershow:true,
    weatherDate:null,
    isCraneShow:true,
    weeks:['周日','周一','周二','周三','周四','周五','周六',],
    wea_descs:['晴','云','雨','阴','雪','雾','沙尘','雷','冰雹'],
    wea_keys:['qing','yun','yu','yin','xue','wu','shachen','lei','bingbao'],
    weathers:[{wea_img:'qing',wea:"晴",tem2:"10",tem1:"20",weak:0,},{wea_img:'yu',wea:"晴",tem2:"10",tem1:"20",weak:1,},{wea_img:'qing',wea:"晴",tem2:"10",tem1:"20",weak:2},{wea_img:'yu',wea:"晴",tem2:"10",tem1:"20",weak:3}],
    weatherTimeout:null,

    sensorInfos:{"temp":{name:"环境温度",percent:"0%",value:"25",unit:"℃",max:50,},
      "humi":{name:"环境湿度",percent:"30%",value:"25",unit:"g/m³",max:100},
      "noise":{name:"环境噪声",percent:"60%",value:"50",unit:"分贝",max:100},
      "pm1_0":{name:"PM.1",percent:"40%",value:"20",unit:"μg/m³",max:1000},
      "pm2_5":{name:"PM.2.5",percent:"100%",value:"20³",unit:"μg/m³",max:1000},
      "pm10":{name:"PM.10",percent:"20%",value:"20",unit:"μg/m³",max:1000},
    },

    craneTempLevel:{

    },
    craneInfoKeys:[22,1,2,3],
    craneInfos:{
      22:{name:'5吨天车',temp:29},
      1:{name:'15吨天车',temp:26},
      2:{name:'16吨天车',temp:25},
      3:{name:'10吨天车',temp:27},

    }
  }
  },
  methods:{
    async loadWeather(){
      //https://v0.yiketianqi.com/api?version=v9&appid=49816961&appsecret=GBf3x4Nj&city=金昌
      const res=await axios.get("https://restapi.amap.com/v3/weather/weatherInfo?key=645c262b3720c3f036d99e1cff333d19&city=620302&extensions=all")
      console.log("res-----",res)
      if (res.status===200&&res.data.status==='1'){
        let data=res.data.forecasts[0].casts.slice(0,4)
        this.weatherDate=this.$moment(data[0].date).format("YYYY-MM-DD")
        data.forEach(v=>{
          // v.week=this.$moment(v.date,"YYYY-MM-DD").day()
          v.week=Number(v.week)
          if (v.week==7){
            v.week=0
          }
          v.wea=v.dayweather
          let weaImgIndex=this.wea_descs.findIndex(item=>v.dayweather.includes(item))
          weaImgIndex=weaImgIndex!==-1?weaImgIndex:1
          v.wea_img=this.wea_keys[weaImgIndex]
          v.tem2=v.nighttemp
          v.tem1=v.daytemp

        })
        this.weathers=data
        this.isWeathershow=true
      }else{
        this.isWeathershow=false

      }
      clearTimeout(this.weatherTimeout)
      this.weatherTimeout=setTimeout(()=>{
        if(this.weatherDate!=this.$moment(new Date).format("YYYY-MM-DD")){
          this.loadWeather()
        }
      },60*60*1000)
    },
/*    //传感器信息
    OnSceneSensorData(val){
      this.craneInfos[val.id].temp=val.temp.toFixed(1)

    },
    //天车电机温度
    OnCraneSensorData(val){
      Object.keys(val).forEach(v=>{
        if (this.sensorInfos[v]){
          this.sensorInfos[v].percent=Math.ceil(val[v]/this.sensorInfos[v].max*100)+"%"
          this.sensorInfos[v].value=val[v].toFixed(1)
        }
      })
    }*/
  },
  async created() {
    this.loadWeather()

  },
  mounted() {
    const itemProgress = this.$refs['item-progress' ][0];
    this.$refs['progress-bar'].forEach(v=>{
    v.style.width=itemProgress.offsetWidth+"px";
    })
/*    this.$ue.OnSceneSensorData.addSubscriber(this.OnSceneSensorData)
    this.$ue.OnCraneSensorData.addSubscriber(this.OnCraneSensorData)*/
  },

  watch:{
    "$store.state.craneTemp":function(val){
      this.craneInfos[val.id].temp=val.temp.toFixed(1)
    },
    "$store.state.sensorInfo":function(val){
      Object.keys(val).forEach(v=>{
        if (this.sensorInfos[v]){
          this.sensorInfos[v].percent=Math.ceil(val[v]/this.sensorInfos[v].max*100)+"%"
          this.sensorInfos[v].value=val[v].toFixed(1)
        }
      })

    },
  },
  beforeDestroy() {
    clearTimeout(this.weatherTimeout)
/*    this.$ue.OnSceneSensorData.removeSubscriber(this.OnSceneSensorData)
    this.$ue.OnCraneSensorData.removeSubscriber(this.OnCraneSensorData)*/
  }
}
</script>

<style scoped lang="scss">
.crane-trigger{
  position: absolute;
  z-index:99;
  width:20px;
  height:20px;
  top:0;
  left:0;
}
.container{

  @extend %container;
/*  min-width:300px;
  min-height:200px;*/
}
.title{
  @extend %title;
  height:2rem;
}
.content{
  @extend %content;
  flex-direction: column;
  justify-content: space-between;
}
.weather-container{
  width:100%;
}
.weather-ul{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.weather-li{
  width:24%;
  min-width:6.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.weather-icon{
  width:6rem;
  height:auto;
}
.weather-temp{
  color:white;
  @extend %middleFontSize;
}

.weather-content{
  width:100%;
  font-size:10px;
  color:$itemNameColor;
  white-space: nowrap;
  padding:0 0.5rem;
  text-align: center;
}
.common-container{
  width:100%;
  margin-top:1rem;
}
.common-container-title{
  display: flex;
  flex-direction: column;
  font-weight: 900;
  align-items: center;
  justify-content: center;

}
.title-text{
  color:$itemNameColor;
  @extend %middleFontSize;
}
.title-line-img{
  width:100%;
  margin-top:0.5rem;
}
.item-ul{
  width:100%;
  padding:0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item-li{
  width:100%;
  display: flex;
  align-items: center;
  justify-content:space-between;
  margin-top:0.5rem;
  color:$itemNameColor;
  @extend %middleFontSize;
}
.crane-item-lie{

}
.item-name{
  min-width:5rem;
  white-space: nowrap;

}
.item-value{
  min-width:4.8rem;
  white-space: nowrap;
  margin-left:1rem;
}
.crane-item-value{
  padding-left:1rem;
}
.item-progress{
  width:10rem;
  height:1rem;
  background:rgba(18,62,89,1);
  border:none;
  position: relative;
}
.item-progress-percent{
  width:0;
  height:100%;
  overflow: hidden;

}
.item-progress-bar{
  height:100%;
  z-index:2;
  background-image: linear-gradient(to right,rgba(170,234,195,1) 50%,rgba(248,43,75,1));
}
</style>