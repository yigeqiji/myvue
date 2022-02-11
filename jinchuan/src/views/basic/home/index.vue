<template>
  <transition name="fade">
  <div class="container" v-forbidden-select>
    <div class="content-container">
          <div class="left-container" style="height:100%;top:0;position:relative;">
            <transition name="fade">
<!-- background-image: linear-gradient(to left, rgba(23, 35, 53, 0.5) , rgba(23, 35, 53, 1));             -->
            <HomeCommonContainer :m-show="$store.state.sensorInfoShow" m-style="width:auto;position:absolute;top:30%;background-image: linear-gradient(to left, rgba(23, 35, 53, 0.5) , rgba(23, 35, 53, 1));">
              <template v-slot:content>
                <SensorInfos>
                  <template v-slot:title><Title title="环境态势"/></template>
                </SensorInfos>
              </template>
            </HomeCommonContainer>
            </transition>
          </div>
          <div class="right-container">
            <HomeCommonContainer mClass="home-common-container">
              <template v-slot:content>
                <PieChart class="right-common-container">
                  <template v-slot:title><Title title="本日统计"/></template>
                </PieChart>
              </template>
            </HomeCommonContainer>

            <HomeCommonContainer mClass="home-common-container">
              <template v-slot:content>
                <DailyVideos class="right-common-container">
                  <template v-slot:title><Title title="本日违规"/></template>
                </DailyVideos>
              </template>
            </HomeCommonContainer>

            <HomeCommonContainer mClass="home-common-container">
              <template v-slot:content>
                <CameraVideos class="right-common-container">
                  <template v-slot:title><Title title="实时监控"/></template>
                </CameraVideos>
              </template>
            </HomeCommonContainer>
          </div>

    </div>

  </div>
  </transition>
</template>
<script>
import DailyVideos from "./DailyVideos";
import CameraVideos from "./CameraVideos";
import PieChart from "./PieChart";
import HomeCommonContainer from "@/functional/home/CommonContainer"
import Title from "@/functional/home/Title";
import SensorInfos from "@/views/basic/home/SensorInfos";

export default {
  name: "home",
  components: {
    PieChart, DailyVideos, CameraVideos, HomeCommonContainer, Title,SensorInfos
  },
  data() {
    return {
      ueData:0,
    }
  },
  methods:{

  },
  watch:{

  },
  mounted() {
    this.$ue.OnLoginSuccess.addSubscriber(this.OnLoginSuccess)
  }

}
</script>
<style lang="scss">
.home-common-container{
  height:33%;
}
</style>
<style scoped lang="scss">
.container {
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-container{
  width:100% - ($outerContainerPadding * 2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height:100%;
}
.left-container {
  width: $leftWidth;
  height: 100%;
  position: relative;
}

.right-container {
  width: 100%-$leftWidth;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

</style>
