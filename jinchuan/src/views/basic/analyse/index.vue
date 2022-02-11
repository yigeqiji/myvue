<template>
  <transition name="fade">
    <!-- container start   -->
    <div class="container" ref="container" v-forbidden-select>
      <input type="text" id="hidden-input" tabindex="1">

      <!--   bg-container start 整个内容的背景框   -->
      <div class="bg-container">
        <!--   content-header start     -->
        <div class="content-header">
          <div class="content-header-title">
            <div class="content-header-title-text">历史违规查询</div>
          </div>
          <div class="filter-datetime-container">
            <div class="filter-title">查询时间:</div>
            <ul class="filter-datatime-box">
              <li class="filter-li">
                <q-input v-model="beginTime" input-class="beginTime" color="transparent" filled dense input-style="color:white;"
                         mask="####-##-## ##:##:##"
                         @mouseleave="timeInputFocus('beginTime',false)"
                         @focus="$refs.beginTime.show()">

                  <q-popup-proxy :no-parent-event="true" transition-show="scale" transition-hide="scale"
                                 content-style="background:none;"
                                 ref="beginTime" anchor="bottom left" @show="timeInputFocus('beginTime',true)"
                                 @hide="timeInputFocus('beginTime',false)">
                    <div style="display: flex;align-items: center;">

                      <q-date :emit-immediately='true' v-model="beginTime" mask="YYYY-MM-DD HH:mm:ss" color="timeTop"
                              style="background:rgba(14, 21,49,1);color:white;" :no-unset="true">
                        <div class="time-popup-proxy-box">
                        </div>
                      </q-date>

                      <q-time :emit-immediately='true' v-model="beginTime" mask="YYYY-MM-DD HH:mm:ss" format24h
                              with-seconds :no-unset="true"
                              style="margin-left:1rem;background:rgba(14, 21,49,1);color:white;" color="timeTop">
                        <div class="time-popup-proxy-box">
                          <div class="time-popup-proxy-btn" @click="timeToCurrent('beginTime')">此刻</div>
                          <div class="time-popup-proxy-btn time-assure-btn" @click="hidePop('beginTime')">确定</div>
                        </div>
                      </q-time>
                    </div>
                  </q-popup-proxy>
                </q-input>

              </li>
              <div class="filter-split-line">-</div>
              <li class="filter-li">
                <q-input class="time-filter-input" input-class="endTime" v-model="endTime" color="transparent" filled dense
                         input-style="color:white;"
                         mask="####-##-## ##:##:##"
                         @mouseleave="timeInputFocus('endTime',false)"
                         @focus="$refs.endTime.show()">

                  <q-popup-proxy :no-parent-event="true" transition-show="scale" transition-hide="scale"
                                 content-style="background:none;"
                                 ref="endTime" anchor="bottom left" @show="timeInputFocus('endTime',true)"
                                 @hide="timeInputFocus('endTime',false)">

                    <div style="display: flex;align-items: center;">

                      <q-date :no-unset="true" :emit-immediately='true' v-model="endTime" mask="YYYY-MM-DD HH:mm:ss"
                              color="timeTop"
                              style="background:rgba(14, 21,49,1);color:white;">

                        <div class="time-popup-proxy-box">
                        </div>
                      </q-date>

                      <q-time :no-unset="true" :emit-immediately='true' v-model="endTime" mask="YYYY-MM-DD HH:mm:ss"
                              format24h with-seconds
                              style="margin-left:1rem;background:rgba(14, 21,49,1);color:white;" color="timeTop">
                        <div class="time-popup-proxy-box">
                          <div class="time-popup-proxy-btn" @click="timeToCurrent('endTime')">此刻</div>
                          <div class="time-popup-proxy-btn time-assure-btn" @click="hidePop('endTime')">
                            确定
                          </div>
                        </div>
                      </q-time>
                    </div>

                  </q-popup-proxy>

                </q-input>

              </li>
              <li class="filter-li filter-btn-li">
                <div class="filter-btn cursor-pointer" @click="loadAllData(true)">
                  查询
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--   content-header end     -->


        <!--category-container start-->
        <div class="category-container">
          <div id="zone-drag-nav" class="zone-drag-container">
            <div class="top-item all-count-item">
              <div class="item-top-box">
                <p>总统计</p>
              </div>
              <div class="item-bottom-box">
                <ul class="item-all-count-ul">
                  <li class="all-count-li" v-for="(v,k) in allCount.length" v-text="allCount[k]" :key="k"></li>
                </ul>
              </div>
            </div>

            <!--    item start  -->
            <div v-for="(v,k) in zoneData" class="top-item" :key="k">

              <!--  水波球   -->
              <div class="item-left-box" style="width:50%;height:100%;">
                <div class="gauge-box" :id="`gauge${k}`" style="width:100%;height:100%;"></div>
              </div>

              <div class="item-right-box">
                <ul class="item-right-box-ul">
                  <li class="item-right-box-li">
                    <p class="item-right-value">{{ v.content }}</p>
                  </li>
                  <li class="item-right-box-li">
                    <p class="item-right-title">违规次数</p>
                    <p class="item-right-value">{{ v.count }}次</p>
                  </li>
                  <li class="item-right-box-li">
                    <p class="item-right-title">违规比例</p>
                    <p class="item-right-value">{{ (v.percent * 100).toFixed(1) }}%</p>
                  </li>
                </ul>
              </div>

            </div>
            <!--    item end  -->

          </div>
        </div>
        <!--category-container end-->

        <!--chart-container start-->
        <div class="chart-container">
          <!--left-nav-container start-->
          <div class="left-nav-container">
            <ul class="left-nav-ul scroll-bar">
              <li v-for="(v,k) in zoneData" class="left-nav-item" @mouseenter="mousemove(k)"
                  @mouseleave="mouseleave()" :key="k">
                <p class="nav-item-content">
                  {{ v.content }}
                </p>
                <div class="left-nav-item-hover-container">
                  <div class="left-nav-item-hover-box">
                    <div v-for="(sv,sk) in v.alarm_infos" class="nav-hover-box-item" :key="sk"
                         :class="isHaveToastItem(`${getAlarmInfoIndex(sk,k)}`)?'nav-hover-box-item-active':''"
                         :id="`nav-hover-box-item${getAlarmInfoIndex(sk,k)}`"
                         @click.stop="addToastItem(`${getAlarmInfoIndex(sk,k)}`,`${sv.content}`)">
                      <p class="nav-hover-box-add">+</p>
                      <p class="nav-hover-box-title">{{ sv.content }}</p>
                    </div>

                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!--left-nav-container end-->

          <div class="center-echart-container">
            <div class="left-echart-container">
              <div class="left-top-echart-box">

                <img class="echart-box-bg" src="@/assets/images/analyse/bg1.png" alt="">
                <div class="echart-box echart-box-zindex" id="mychart1">

                </div>
                <div class="echart-box">
                  <div class="common-echart-box-title">
                    总览统计
                  </div>
                </div>
              </div>
              <div class="left-bottom-echart-box">
                <img class="echart-box-bg" src="@/assets/images/analyse/bg1.png" alt="">
                <div class="echart-box echart-box-zindex" id="mychart2"></div>
                <div class="echart-box">
                  <div class="common-echart-box-title">
                    对比统计
                  </div>
                </div>
              </div>
            </div>
            <div class="right-echart-container">
              <div class="right-top-echart-box">
                <img class="echart-box-bg" src="@/assets/images/analyse/bg4.png" alt="">
                <div class="echart-box echart-box-zindex" id="mychart3"></div>
                <div class="echart-box">
                  <div class="common-echart-box-title">
                    每日统计
                  </div>
                </div>
              </div>
              <div class="right-bottom-echart-box">
                <img class="echart-box-bg" src="@/assets/images//analyse/bg4.png" alt="">
                <div class="echart-box echart-box-zindex" id="mychart4"></div>
                <div class="echart-box">
                  <div class="common-echart-box-title">
                    每月统计
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--   右侧弹出窗       -->
          <div class="right-toast-container-bar" id="right-toast-container-bar">
            <div class="right-toast-bar-slot">
              <div class="right-toast-container scroll-bar">
                <div class="toast-item" v-for="(v,k) in toastItemList" v-show="v" :key="k">
                  <div class="toast-item-color-tip" :style="`background:${colors[v.index]}`"></div>
                  <p v-text="v.name"></p>
                  <p class="remove-toast-item-box" @click.stop="removeToastItem(v.index)">×</p>
                </div>
              </div>
            </div>

          </div>
          <!--   右侧弹出窗       -->

        </div>
        <!--chart-container end-->
      </div>
      <!--  bg-container end    -->

    </div>
    <!-- container end   -->
  </transition>
</template>

<script>
import {loadAnalyseContentCharts, loadAnalyseLiquid} from "@/utils/echarts/option";
import {echartColors} from "@/utils/echarts/config";

export default {
  name: "index",
  data() {
    return {
      allCount: 0,
      beginTime: this.getPassFormatDate(),
      endTime: this.getNowFormatDate(),
      myCharts: [],
      zoneCharts: [],
      navHoverIndex: -1,
      hoverContainers: "",
      toastItemList: [],
      toastContainerEl: null,
      toastContainerLeft: 0,
      toastContainerTop: 0,
      startLeft: 0,
      startTop: 0,
      zoneData: [{}, {}, {}, {}],
      legendData: [],
      legendSelected: [],
      alarmInfos: [],
      mychartData2: [],
      mychartData3: [],
      mychartData4: [],
      colors: echartColors,
      toastBallStyle: `position:fixed;z-index:999;pointer-events:none;padding:0.5rem 1rem;white-space:nowrap;color:rgba(0,204,255,1);font-size:1rem;box-shadow:inset 0 0 0.5rem rgba(0,204,255,1);transition:0.7s top cubic-bezier(0,1.15,0,1.03),0.7s left cubic-bezier(0,0,0,0);`,
      timeProxyShow: [false, false]
    }
  },
  created() {

  },
  mounted() {

    this.loadAllData();

    this.hoverContainers = document.getElementsByClassName("left-nav-item-hover-container")
    this.toastContainerEl = document.getElementById("right-toast-container-bar")

    window.addEventListener("resize", this.allChartsResize)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.allChartsResize)
  },
  computed: {

  },

  methods: {
    timeInputFocusHandler(proxyKey, isShow) {
      if (isShow) {
        this.timeProxyShow = this.timeProxyShow.map((v, k) => {
          if (k !== proxyKey) {
            return v = false
          }
          return true
        })
      } else {
        this.timeProxyShow[proxyKey] = false
        this.$forceUpdate()
      }
    },
    //所有图片resize
    allChartsResize() {
      this.myCharts.forEach((v) => {
        if (v) {
          v.resize()
        }
      })
      this.zoneCharts.forEach((v) => {
        if (v) {
          v.resize()
        }
      })
    },
    hiddenInputFocus() {
      setTimeout(() => {
        document.getElementById("hidden-input").focus()
      })
    },
    hidePop(ref) {
      this.$refs[ref].hide()
      this.hiddenInputFocus()
    },
    timeInputFocus(className, isFocus) {
      setTimeout(() => {
        if (isFocus) {
          document.getElementsByClassName(className)[0].focus()

        } else {
          document.getElementsByClassName(className)[0].blur()

        }
      })
    },
    timeToCurrent(ref) {
      this[ref] = this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      this.hidePop()
    },
    //加载水波球
    loadLiquid(boxKey, data) {
      //屏蔽echarts重复渲染警告
      this._echartsDispose("gauge" + boxKey)
      let myChart = this.$echarts.init(document.getElementById("gauge" + boxKey));
      var value = data.percent;
      var title = data.content;
      var datas = [value, value, value];
      const options = loadAnalyseLiquid(value, title, datas)
      myChart.setOption(options);
      this.zoneCharts[boxKey] = myChart
    },
    //当前时间
    getNowFormatDate() {
      return this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    },
    //过去一个月的时间
    getPassFormatDate() {
      return this.$moment(new Date()).subtract(1, "months").format("YYYY-MM-DD HH:mm:ss")

    },
    initAllEcharts() {
      for (let i = 1; i <= 4; i++) {
        this.init(i)
      }

    },
    dispatchSth(name, select) {
      let type = "legendUnSelect"
      if (select) {
        type = "legendSelect"
      }
      for (const key in this.myCharts) {
        if (key != 1) {
          this.legendSelected[name] = select
          this.myCharts[key].dispatchAction({
            type: type,
            name: name
          })
        }

      }
    },

    isHaveToastItem(key) {
      let bool = false
      for (let i = 0; i < this.toastItemList.length; i++) {
        if (this.toastItemList[i].index == key) {
          bool = true
          break
        }
      }
      return bool
    },
    getAlarmInfoIndex(sonIndex, fIndex) {
      if (fIndex == 0) {
        return sonIndex
      } else {
        fIndex--
        let _sonIndex = this.zoneData[fIndex].alarm_infos.length + 1 + sonIndex
        return this.getAlarmInfoIndex(_sonIndex, fIndex)
      }
    },
    loadAllData(notLoadLegend) {
      this.myCharts = []
      this.loadPieZoneStats(notLoadLegend)
      this.loadDayLineStats()
      this.loadMonthLineStats()
    },
    /*==================
    * @Author yu
    * @Description 加载饼图数据
    * @Params notLoadLegend：是否不重置echarts筛选项
    * @Return
    ==================*/
    async loadPieZoneStats(notLoadLegend) {
      let _this = this
      let alarmInfos = [];
      let legendData = []
      let legendSelected = {}

      if (!notLoadLegend) {
        this.toastItemList = []
      }
      const start_time = this.beginTime
      const end_time = this.endTime
      const res = await this.$http.post("alarm/history/pie/zone/stats", {start_time, end_time})
      _this.zoneData = res.zone_statistics
      _this.allCount = res.count.toString()
      _this.$nextTick(() => {
        for (const index in _this.zoneData) {
          _this.loadLiquid(index, _this.zoneData[index])
          for (const alarmIndex in _this.zoneData[index].alarm_infos) {
            let _alarmInfos = _this.zoneData[index].alarm_infos
            alarmInfos.push(_alarmInfos[alarmIndex])
            if (!notLoadLegend) {
              legendData.push(_alarmInfos[alarmIndex].content)
              if (index != 0) {
                legendSelected[_alarmInfos[alarmIndex].content] = false
              } else {
                _this.addToastItem(_this.getAlarmInfoIndex(alarmIndex, index), _alarmInfos[alarmIndex].content, true)
              }
            }

          }
        }
        if (!notLoadLegend) {
          _this.legendData = legendData
          _this.legendSelected = legendSelected
        }
        _this.alarmInfos = alarmInfos
        _this.mychartData2 = alarmInfos
        //第一个饼图，alarmInfos
        _this.init(1)
        //第二个饼图，mychartData2
        _this.init(2)
        for (let i = 0; i < _this.hoverContainers.length; i++) {
          _this.hoverContainers[i].style.marginTop = "-" + _this.hoverContainers[i].offsetHeight / 2 + "px"
        }
      })

    },
    async loadDayLineStats() {
      let _this = this
      const start_time = this.beginTime
      const end_time = this.endTime
      const res = await this.$http.post("alarm/history/day_line/stats", {start_time, end_time})
      _this.mychartData3 = res.stats_data
      _this.init(3);
    },
    async loadMonthLineStats() {
      let _this = this
      const res = await this.$http.post("alarm/history/month_line/stats", {"date_time": _this.endTime})
      _this.mychartData4 = res.stats_data
      _this.init(4);
    },
    dragTopContainer() {
      var div1 = document.getElementById("zone-drag-nav");
      div1.onmousedown = function (ev1) {
        var distanceX = ev1.clientX - div1.offsetLeft;
        div1.onmousemove = function (ev2) {
          if (ev2.clientX - ev1.clientX > 0 && div1.offsetLeft > 0) {
            div1.onmouseup = function () {
              div1.onmousemove = null;
              div1.style.left = 0
              return
            };
          }
          div1.style.left = ev2.clientX - distanceX + 'px';
        };
        div1.onmouseup = function () {
          div1.onmousemove = null;
          div1.onmouseup = null;
        };
      }
      document.onmouseup = function () {
        div1.onmousemove = null;
        div1.onmouseup = null;
      }
    },
    flyToToast(startLeft, startTop, v) {
      this.toastContainerTop = this.toastContainerTop ? this.toastContainerTop : this.toastContainerEl.getBoundingClientRect().top
      this.toastContainerLeft = this.toastContainerLeft ? this.toastContainerLeft : this.toastContainerEl.getBoundingClientRect().left - 30
      let el = document.createElement("div")
      console.log(startLeft, startTop)
      el.setAttribute("style", `${this.toastBallStyle}left:${startLeft}px;top:${startTop}px;`)
      el.innerHTML = v
      this.$refs.container.appendChild(el)
      setTimeout(() => {
        el.style.top = "5%"
        el.style.left = this.toastContainerLeft + "px"
      }, 100)

      setTimeout(() => {
        el.style.top = this.toastContainerTop + "px"
      }, 690)
      setTimeout(() => {
        this.$refs.container.removeChild(el)
      }, 2000)


    },
    addToastItem(k, v, isInitItem) {
      if (this.isHaveToastItem(k)) {
        return
      }
      this.toastItemList.unshift({name: v, index: k})
      if (isInitItem) {
        return
      }

      this.dispatchSth(v, true)
      // const currentE = $('#nav-hover-box-item' + k)[0]
      const currentE = document.getElementById("nav-hover-box-item" + k)
      let left = currentE.getBoundingClientRect().left
      let top = currentE.getBoundingClientRect().top
      this.startLeft = left
      this.startTop = top


      // this.addToCart()
      this.flyToToast(left, top, v)

    },
    removeToastItem(k) {
      for (let i = 0; i < this.toastItemList.length; i++) {
        if (this.toastItemList[i].index == k) {
          //echart legend tag to no select
          this.dispatchSth(this.toastItemList[i].name, false)

          //remove item from toastItemList
          this.toastItemList.splice(i, 1)
          break
        }
      }

    },
    mousemove(index) {

      let _this = this
      document.onmousemove = function (e) {

        if (this.navHoverIndex == index) {
          _this.mouseleave()
          return
        }
        this.navHoverIndex = index
        _this.hoverContainers[index].style.top = e.clientY + "px"
      }

    },
    mouseleave() {
      document.onmousemove = null
    },
    changeHoverIndex(index) {
      this.mousemove(index)
    },
    clearHoverIndex() {
      if (this.navHoverIndex == -1) {
        return
      }
      this.navHoverIndex = -1
    },
    _echartsDispose(elID) {
      let el = document.getElementById(elID);
      let existInstance = this.$echarts.getInstanceByDom(el);
      if (existInstance) {
        this.$echarts.dispose(existInstance);
      }
    },
    init(k) {
      /* console.log(k)
       this.$echarts.dispose(document.getElementById("mychart" + k))*/
      // this.$echarts.dispose(this.myCharts[k])
      //解决echarts dom已经渲染警告

      this._echartsDispose("mychart" + k);
      let myChart = this.$echarts.init(document.getElementById("mychart" + k));
      let data = {
        legendData: this.legendData,
        legendSelected: this.legendSelected,
        mychartData2: this.mychartData2,
        mychartData3: this.mychartData3,
        mychartData4: this.mychartData4,
      }
      let option = loadAnalyseContentCharts(k, data, this.alarmInfos)
      myChart.setOption(option, true);

      this.myCharts[k] = myChart
    },

  }
}
</script>

<style scoped lang="scss">
$contentHeaderHeight: 10%;
$categoryContainerHeight: 15%;
$chartContainerHeight: 68%;
%itemSelect {
  //border-color: rgba(23, 35, 53, 0.9);
  //background:rgba(23, 35, 53, 0.9);
  background-image: linear-gradient(to left, rgba(23, 35, 53, 1), rgba(23, 35, 53, 0.5));

  //box-shadow: inset 0 0 0.5rem rgba(23, 35, 53, 0.9);

  /*  background:rgba(68, 73, 236, 0.6);
    box-shadow: inset 0 0 0.5rem rgba(23, 35, 53, 1);*/
}

.container {
  padding: 0 $outerContainerPadding;
}

.bg-container {
  width: 100%;
  height: 100%;
  @extend %containerBg;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.content-header {
  height: $contentHeaderHeight;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.content-body {
  height: 100%-$contentHeaderHeight;
}

.content-header-title {
  height: 1.5rem;
  line-height: 2rem;
  padding-left: 1.5rem;
  background: url(~@/assets/images/record/header-title-bg.png) no-repeat;
  background-size: auto 100%;
  position: relative;
}

.content-header-title-text {
  height: auto;
  @extend %titleFontSize;
  color: white;
}

.filter-datetime-container {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.filter-datetime-container > * {
  margin: 0;
}

.filter-title {
  color: $itemNameColor;
  margin-right: 1rem;
  @extend %titleFontSize;


}

.filter-datatime-box {
  display: flex;
  width: 80%;
  height: 2.5rem;
  justify-content: flex-start;
  align-items: flex-start;
}

.filter-li {
  height: 100%;
  display: flex;
  align-items: center;
}

.filter-btn-li {
  margin-left: 1rem;

}

.filter-split-line {
  height: 100%;
  display: flex;
  align-items: center;
  color: white;
  padding: 0 1rem;
}

.filter-start-time {
  height: 2rem;

}

.filter-end-time {
  margin-left: 1rem;
  height: 2rem;

}

.category-container {
  width: 100%;
  height: $categoryContainerHeight;
  position: relative;
  cursor: pointer;
  margin-top: 1rem;
}

.filter-btn {
  height: 2rem;
  width: 4rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 0.5rem;
  font-weight: 700;
  background: $buttonBgColor;
  @extend %middleFontSize;
}

.filter-btn:hover {
  background: rgba(50, 60, 119, 1);
  color: #ccc;
}

.zone-drag-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
}

.zone-drag-container > * {
  margin: 0;
}

.top-item {
  width: 23%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  //border: 2px solid rgba(26, 133, 163, 1);

  border-radius: 0.5rem;
  //background-image: linear-gradient(to bottom, rgba(26, 133, 163, 0.8), rgba(26, 133, 163, 0.1));
  background-image: linear-gradient(to bottom, rgba(30, 176, 252, 0.8), rgba(30, 176, 252, 0.2))
}

.all-count-item {
  flex-direction: column;
  /*background-image:none;*/
  overflow: hidden;
  //background-image: linear-gradient(to top, rgba(26, 133, 163, 0.8), rgba(26, 133, 163, 0.1));

}

.item-top-box {
  width: 100%;
  height: 35%;
  border-bottom: 2px solid rgba(29, 170, 243, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  @extend %titleFontSize;
  color: white;
  font-weight: 900;

}

.item-bottom-box {
  width: 100%;
  height: 65%;
}

.item-all-count-ul {
  width: 96%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.all-count-li {
  width: 14%;
  height: 60%;
  border: 1px solid rgba(26, 133, 163, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  @extend %titleFontSize;

  font-weight: 700;

}


.item-left-box {
  width: 50%;
  height: 100%;
}

.item-right-box {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}

.gauge-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.top-item-title {
  height: 20%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: white;
}

.gauge-right-box {
  width: 30%;
}

.top-item:not(:nth-child(1)) {
  margin-left: 3.5%;
}

.item-right-box-ul {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

}

.item-right-box-li {
  width: 100%;
  height: 3rem;
  @extend %middleFontSize;
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-around;
}

.item-right-title {
  min-width: 4.5em;
}

.item-right-box-li > p {
  margin: 0;
}

.item-right-value {
  color: #eee;
  white-space: nowrap;
}

.chart-container {
  width: 100%;
  height: $chartContainerHeight;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

}


.left-nav-container {
  position: absolute;
  left: 0;
  /*width:50%;*/
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.left-nav-container > * {
  margin: 0;
}

.left-nav-ul {
  height: 100%;
  /*width:14rem;*/
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  direction: rtl;
}


.left-nav-ul > * {
  margin: 0;
}

.left-nav-item {

  min-width: 14rem;
  min-height: 4.5rem;
  //border: 1px solid rgba(26, 133, 163, 1);
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  //background-image: linear-gradient(to right, rgba(26, 133, 163, 0.8), rgba(26, 133, 163, 0.1));
  background-image: linear-gradient(to right, rgba(30, 176, 252, 0.8), rgba(30, 176, 252, 0.1));
  border-radius: 0.5rem;
}

.left-nav-item:hover {
  //border: 1px solid rgba(26, 133, 163, 0.8);
  //background-image: linear-gradient(to left, rgba(26, 133, 163, 0.3), rgba(26, 133, 163, 0.1));
  background-image: linear-gradient(to left, rgba(30, 176, 252, 0.8), rgba(30, 176, 252, 0.1));

}

.nav-item-content {
  @extend %middleFontSize;

  font-weight: 700;
}

.left-nav-item-hover-container {
  min-width: 21rem;
  left: 14rem;
  margin-left: 2%;
  opacity: 0;
  position: fixed;
  padding: 1rem 2rem;
  top: 0;
  z-index: -1;
  box-sizing: border-box;
}

.left-nav-item:hover .left-nav-item-hover-container {
  opacity: 1;
  z-index: 3;

}


.left-nav-item-hover-box {
  height: 100%;
  //border: 1px solid rgba(26, 133, 163, 1);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  //background: rgba(26, 133, 163, 1);
  background: rgba(30, 176, 252, 0.6);
}

.nav-hover-box-item {
  height: 2rem;
  width: 94%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
  box-sizing: border-box;
  //border: 1px solid rgba(26, 133, 163, 0);
  @extend %middleFontSize;

}

.nav-hover-box-item > * {
  margin: 0;
}

.nav-hover-box-item:not(:nth-child(1)) {
  margin-top: 0.5rem;
}

.nav-hover-box-item:hover {
  transition: all 0.2s ease;

  @extend %itemSelect;
}

.nav-hover-box-item-active {
  transition: all 0.2s ease;
  @extend %itemSelect;
}


.left-nav-item:not(:nth-child(1)) {
  margin-top: 2rem;
}

.nav-hover-box-add {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(4, 202, 255, 1);
  background: rgba(4, 202, 255, 0.5);
  @extend %titleFontSize;

  font-weight: 700;
}

.nav-hover-box-add:hover {
  background: rgba(4, 202, 255, 0.8);

}

.right-toast-container-bar {
  height: 100%;
  width: 0.8rem;
  background: rgba(4, 202, 255, 0.1);
  position: absolute;
  right: 0;
  border-radius: 1rem;
  cursor: pointer;
  animation: flash-right-bar 3s ease-in-out infinite;
  transition: all 0.15s ease;
}

@keyframes flash-right-bar {
  0% {
    background: rgba(4, 202, 255, 0.1)
  }
  50% {
    background: rgba(4, 202, 255, 0.6)
  }
  100% {
    background: rgba(4, 202, 255, 0.1)
  }
}

.right-toast-bar-slot {
  width: 10rem;
  height: 100%;
  position: absolute;
  right: -2rem;
}

.right-toast-container-bar:hover {
  background: rgba(4, 202, 255, 0);
  animation: none;
}

.right-toast-container-bar:hover .right-toast-container {
  opacity: 1;
  z-index: 3;
  right: 2rem;
}

.right-toast-container {
  width: 100%;
  min-width: 20rem;
  max-height: 100%;
  min-height: 50%;
  position: absolute;
  right: 4rem;
  border-radius: 1rem;
  opacity: 0;
  z-index: -1;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  padding: 1rem 0;
  box-sizing: border-box;
  border: 1px solid rgba(26, 133, 163, 1);
  //background-image: linear-gradient(to right, rgba(26, 133, 163, 1), rgba(26, 133, 163, 0.1));
  background-image: linear-gradient(to right, rgba(30, 176, 252, 0.9), rgba(30, 176, 252, 0.1));

}

.right-toast-container > * {
  margin: 0 auto;
}

.toast-item {
  width: 85%;
  height: 3.5rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @extend %middleFontSize;
  color: white;
  //border: 1px solid rgba(4, 202, 255, 1);
  //@extend %itemSelect;
  background-image: linear-gradient(to right, rgba(23, 35, 53, 1), rgba(23, 35, 53, 0.5));
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.toast-item > * {
  margin: 0;
}

.remove-toast-item-box {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(4, 202, 255, 1);

  position: absolute;
  right: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
}

.toast-item-color-tip {
  width: 1rem;
  height: 1rem;
  position: absolute;
  left: 1rem;
}

.toast-item:hover {
  box-shadow: inset 0 0 1rem rgba(4, 202, 255, 1);

}

.toast-item:hover .remove-toast-item-box {
  opacity: 1;
}

.remove-toast-item-box:hover {
  background: rgba(4, 202, 255, 0.1);
}

.flyer {
  width: 10rem;
  height: 2rem;
  position: fixed;
  border: 1px solid rgba(4, 202, 255, 1);
  box-shadow: inset 0 0 0.5rem rgba(4, 202, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.center-echart-container {
  width: 80%;
  margin-left: 10%;
  height: 100%;
  display: flex;
}

.left-echart-container {
  width: 45%;
  height: 100%;
}

.right-echart-container {
  width: 55%;
  height: 100%;
}

.left-echart-container .echart-box-bg, .left-echart-container .echart-box {
  width: 80%;
  height: 95%;
  position: absolute;

}

.right-echart-container .echart-box-bg, .right-echart-container .echart-box {
  width: 85%;
  height: 95%;
  position: absolute;
}

.left-top-echart-box, .left-bottom-echart-box, .right-top-echart-box, .right-bottom-echart-box {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
}

.common-echart-box-title {
  width: 100%;
  height: 1.8rem;
  box-sizing: border-box;
  padding-left: 1rem;
  @extend %middleFontSize;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: flex;
  align-items: center;
  font-weight: 700;
  /* background-size: auto auto; */
  background-image: url("/images/analyse/bt.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
  color: $itemNameColor;
}

.echart-box-zindex {
  z-index: 2;
}

#mychart1 {
  padding: 0;
}

//时间筛选弹出框 确定、此刻按钮
.time-popup-proxy-box {
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.time-popup-proxy-btn {
  padding: 0.35rem;
  border-radius: 0.2rem;
  cursor: pointer !important;
  position: relative;
}

.time-popup-proxy-btn:hover {
  transition: all 0.3s ease;
  background: #5964b3;
}

</style>