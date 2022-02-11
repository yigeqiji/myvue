<template>
  <transition name="fade">
    <div class="container">
      <transition name="fade">
        <div class="content-container" v-show="!isDetailShow" v-forbidden-select>
          <div class="content-header">
            <div class="content-header-title">
              <div class="content-header-title-text">历史违规查询</div>
            </div>
            <input type="text" id="hidden-input" tabindex="1">
            <!-- content-header-filter start-->
            <div class="content-header-filter">
              <ul class="filter-ul">
                <li class="filter-li">
                  <div class="filter-name">园区选择</div>
                  <q-select
                      standout="bg-mSelected text-white"
                      bg-color="mInput"
                      dense
                      style="width:7.5rem;"
                      v-model="parkID"
                      :options="parkOptions"
                      map-options
                      options-selected-class="q-selected-item"
                      popup-content-class="q-select-popup"
                  >
                    <template v-slot:option="scope">
                      <q-item
                          v-bind="scope.itemProps"
                          v-on="scope.itemEvents"
                      >
                        <div class="select-item">
                          <p v-text="scope.opt.label"></p>
                        </div>
                      </q-item>
                    </template>
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </li>
                <li class="filter-li">
                  <div class="filter-name">车间选择</div>
                  <q-select
                      standout="bg-mSelected text-white"
                      bg-color="mInput"
                      dense
                      style="width:7.5rem;"
                      v-model="factoryID"
                      :options="factoryOptions"
                      emit-value
                      map-options
                      options-selected-class="q-selected-item"
                      popup-content-class="q-select-popup"
                  >
                    <template v-slot:option="scope">
                      <q-item
                          v-bind="scope.itemProps"
                          v-on="scope.itemEvents"
                      >
                        <div class="select-item">
                          <p v-text="scope.opt.label"></p>
                        </div>
                      </q-item>
                    </template>
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </li>
                <li class="filter-li">
                  <div class="filter-name">监控区域</div>
                  <q-select
                      standout="bg-mSelected text-white"
                      bg-color="mInput"
                      clearable
                      dense
                      style="width:10rem;"
                      option-value="id"
                      option-label="content"
                      v-model="scanAreaID"
                      @blur="isNullChangeVal('scanAreaID')"
                      use-input
                      map-options
                      :options="scanAreaOptions"
                      @filter="scanAreaFilter"
                      input-class="q-select-input"
                      options-selected-class="q-selected-item"
                      popup-content-class="q-select-popup scroll-bar"
                  >
                    <template v-slot:option="scope">
                      <q-item
                          v-bind="scope.itemProps"
                          v-on="scope.itemEvents"
                      >
                        <div class="select-item">
                          <p v-text="scope.opt.content"></p>
                        </div>
                      </q-item>
                    </template>
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="q-select-no-option">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </li>
                <li class="filter-li">
                  <div class="filter-name">设备编号</div>
                  <q-select
                      standout="bg-mSelected text-white"
                      bg-color="mInput"
                      clearable
                      dense
                      style="width:12rem;"
                      option-value="id"
                      option-label="content"
                      v-model="cameraID"
                      @blur="isNullChangeVal('cameraID')"

                      use-input
                      map-options
                      :options="cameraOptions"
                      @filter="cameraFilter"
                      input-class="q-select-input"
                      options-selected-class="q-selected-item"
                      popup-content-class="q-select-popup scroll-bar"
                  >
                    <!--                                      :title="cameraID.content"
                    -->
                    <template v-slot:option="scope">
                      <q-item
                          v-bind="scope.itemProps"
                          v-on="scope.itemEvents"
                      >
                        <div class="select-item">
                          <p v-text="scope.opt.content"></p>
                        </div>
                      </q-item>
                    </template>
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="q-select-no-option">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </li>
                <li class="filter-li">
                  <div class="filter-name">违规类型</div>
                  <q-select
                      standout="bg-mSelected text-white"
                      bg-color="mInput"
                      clearable
                      dense
                      style="width:12rem;"
                      option-value="alarm_key"
                      option-label="content"
                      v-model="alarmKey"
                      @blur="isNullChangeVal('alarmKey')"
                      use-input
                      map-options
                      :options="alarmOptions"
                      @filter="alarmFilter"
                      input-class="q-select-input"
                      options-selected-class="q-selected-item"
                      popup-content-class="q-select-popup scroll-bar"
                  >
                    <template v-slot:option="scope">
                      <q-item
                          v-bind="scope.itemProps"
                          v-on="scope.itemEvents"
                      >
                        <div class="select-item">
                          <p v-text="scope.opt.content"></p>
                        </div>
                      </q-item>
                    </template>
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="q-select-no-option">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </li>
                <li class="filter-li">
                  <!--    todo 这个时间筛选可以提取出一个组件   -->
                  <div class="filter-name">时间选择</div>
                  <div>
                    <!--             :rules="['fulltime']"      -->
                    <q-input class="time-filter-input" input-class="beginTime" v-model="beginTime" color="transparent"
                             standout="bg-mSelected text-white" bg-color="mInput" dense input-style="color:white;"
                             mask="####-##-## ##:##:##"
                             @mouseleave="timeInputFocus('beginTime',false)"
                             @focus="$refs.beginTime.show()"
                    >
                      <q-popup-proxy :no-parent-event="true" transition-show="scale" transition-hide="scale"
                                     content-style="background:none;"
                                     ref="beginTime" anchor="bottom left" @show="timeInputFocus('beginTime',true)"
                                     @hide="timeInputFocus('beginTime',false)">
                        <div style="display: flex;align-items: center;">
                          <q-date :emit-immediately='true' v-model="beginTime" mask="YYYY-MM-DD HH:mm:ss"
                                  color="timeTop"
                                  :no-unset="true"
                                  style="background:rgba(14, 21,49,1);color:white;">
                            <div class="time-popup-proxy-box">
                            </div>
                          </q-date>

                          <q-time v-model="beginTime" format24h mask="YYYY-MM-DD HH:mm:ss"
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

                  </div>
                  <div style="text-align: center;color:white;margin:0 1rem;">-</div>
                  <div>
                    <q-input class="time-filter-input" input-class="endTime" v-model="endTime" color="transparent"
                             standout="bg-mSelected text-white" bg-color="mInput" dense input-style="color:white;"
                             mask="####-##-## ##:##:##"
                             @mouseleave="timeInputFocus('endTime',false)"
                             @focus="$refs.endTime.show()">


                      <q-popup-proxy :no-parent-event="true" transition-show="scale" transition-hide="scale"
                                     content-style="background:none;"
                                     ref="endTime" anchor="bottom left" @show="timeInputFocus('endTime',true)"
                                     @hide="timeInputFocus('endTime',false)">
                        <div style="display: flex;align-items: center;">
                          <q-date :emit-immediately='true' v-model="endTime" mask="YYYY-MM-DD HH:mm:ss" color="timeTop"
                                  :no-unset="true"
                                  style="background:rgba(14, 21,49,1);color:white;">

                            <div class="time-popup-proxy-box">
                            </div>
                          </q-date>

                          <q-time v-model="endTime" format24h mask="YYYY-MM-DD HH:mm:ss" with-seconds :no-unset="true"
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

                  </div>
                </li>
                <li class="filter-li filter-right-btns">
                  <div class="export-btn cursor-pointer" @click="exportHistoryList">导出</div>
                  <div class="search-btn search-list-btn cursor-pointer" @click="queryHistoryList(1)">查询</div>
                </li>
              </ul>

            </div>
          </div>
          <!-- content-header-filter end-->
          <div class="content-body">
            <!--                    :dense="$q.screen.lt.md"
            -->
            <q-table
                style="width:100%;"
                :data="historyList"
                color="primary"
                card-class="m-table-card"
                :columns="tableColumns"
                row-key="name"
                hide-pagination
                :pagination.sync="pagination"
            >

              <template v-slot:header-cell="props">
                <q-th class="m-table-th" :props="props">
                  <div class="table-header">
                    <img :src="require(`@/assets/images/record/table-icons/${props.col.icon}`)" style="height:1.5rem;"/>
                    <div class="table-header-text" v-text="props.col.label"></div>
                  </div>
                </q-th>
              </template>
              <template v-slot:body-cell="props">
                <q-td class="m-table-td" :props="props">
                  <div v-if="props.col.field!=='operate'&&props.col.field!=='num'" class="table-td"
                       v-text="props.value">
                  </div>
                  <div v-if="props.col.field==='num'" class="table-td"
                       v-text="(currentPage-1)*pageSize+(props.pageIndex+1)">
                  </div>
                  <div v-if="props.col.field==='operate'" class="table-td">
                    <a class="detail-a" :href="`#${props.row.id}`">
                      <div class="search-btn search-detail-btn cursor-pointer" @click="handleFind(props.row)">详情</div>
                    </a>
                  </div>
                </q-td>
              </template>
            </q-table>

          </div>

          <div class="content-pagination">
            <Pagination
                :show-jumper="true"
                :total="pagesCount"
                :currentPage="currentPage"
                :pagerCount="pageSize"

                @current-change="handlePageChange"
            />
            <!--
                          @prev-click="prevClick"
                          @next-click="nextClick"
                          @prev-quick-click="prevQuickClick"
                          @next-quick-click="nextQuickClick"
                          @page-click="pageClick"
            -->

          </div>

        </div>
        <!-- content container end   -->
      </transition>

      <transition name="fade">
        <div class="detail-content-container" v-show="isDetailShow">
          <div class="detail-header-container">
            <div class="content-header-title" v-forbidden-select>
              <div class="content-header-title-text">查询详情</div>
            </div>

            <ul class="detail-header-content">
              <li class="detail-header-content-item" v-for="(v,k) in detailItemNames" :key="k">
                <div class="detail-header-content-item-name" v-text="v.name"></div>
                <div class="detail-header-content-item-value" v-if="v.field!=='park'" v-text="detailRow[v.field]"></div>
                <div class="detail-header-content-item-value" v-else v-text="v.value"></div>

              </li>
            </ul>


          </div>
          <div class="detail-video-container">
            <div class="content-header-title" v-forbidden-select>
              <div class="content-header-title-text">历史回放</div>
              <div class="content-header-title-right">
                <div class="detail-export-btn cursor-pointer" @click="downloadFiles">导出</div>
                <div class="detail-back-btn cursor-pointer" @click="handleDetailBack">返回</div>
              </div>
            </div>
            <div class="detail-video-content">
              <div class="detail-video-img-box cursor-pointer" v-show="videoUrls.length>0" v-for="(v,k) in videoUrls"
                   @click="handleVideoClick(v)" :key="k">
                <img class="detail-video-img" :src="imgList[0]?imgList[0]:''" alt="" v-img-error>
                <img class="detail-video-play-btn" src="@/assets/images/video-play.png" alt="">
              </div>
              <div class="detail-video-img-box" v-show="videoUrls.length===0">
                <img class="detail-video-img" src="" v-img-error alt="">
              </div>
            </div>
          </div>
          <div class="detail-img-container">
            <div class="content-header-title" v-forbidden-select>
              <div class="content-header-title-text">违规截图</div>
            </div>

            <div v-if="imgList.length>=5" class="galley" ref="galley">
              <div class="galley-item cursor-pointer" v-for="(item,index) in imgList" :id="'img'+index" ref="galleyImg"
                   :key="index"
                   :style="`position:absolute;left:${imageLeft*index}%;`">

                <img class="galley-item-img" :src="item" :data-original="item" :alt="index"
                     @mouseenter="imgHover(index)" @mouseleave="imgHover(-1)" v-img-error/>
              </div>
            </div>
            <div v-else class="galley" ref="galley">
              <div class="galley-item cursor-pointer" v-for="(item,index) in imgList" :id="'img'+index" ref="galleyImg"
                   :key="index">

                <img class="galley-item-img" :data-original="item" :src="item" :alt="index" v-img-error/>
              </div>
            </div>

          </div>
        </div>
      </transition>

    </div>
  </transition>
</template>

<script>
import Viewer from "viewerjs";
import 'viewerjs/dist/viewer.css';
import Pagination from "@/components/Pagination";
import {QSpinnerBars} from "quasar";

export default {
  name: "index",
  components: {Pagination},
  data() {
    return {
      viewer: [],
      viewerOptions: {
        url: 'data-original',
        navbar: false,
        title: false,
        toolbar: {
          oneToOne: true,
          prev: true,
          next: true,
          close: () => {
            this.viewer.forEach(v => {
              v && v.hide()
            })
          },
        },
      },
      tableColumns: [
        {label: '序号', field: 'num', icon: 'num.png'},
        {label: '车间编号', field: 'workshop_name', icon: 'factory.png'},
        {label: '设备', field: 'scan_area_location', icon: 'camera.png'},
        {label: '录制时间', field: 'created_time', icon: 'time.png'},
        {label: '录制时长', field: 'video_interval', icon: 'datetime.png'},
        {label: '报警类型', field: 'alarm_names', icon: 'alarm.png'},
        {label: '操作', field: 'operate', icon: 'operate.png'},
      ],
      historyList: [],

      parkID: 1,
      parkOptions: [{value: 0, label: "全部"}, {value: 1, label: "实业公司"}],

      factoryID: 1,
      factoryOptions: [{value: 0, label: "全部"}, {value: 1, label: "铸造车间"}],

      scanAreaID: "",
      scanAreaOptions: [],
      scanAreaOptionSrc: [],

      cameraID: "",
      cameraOptions: [],
      cameraOptionsSrc: [],

      alarmKey: "",
      alarmOptions: [],
      alarmOptionsSrc: [],

      beginTime: this.$moment(new Date()).subtract(1, "months").format("YYYY-MM-DD HH:mm:ss"),
      endTime: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),

      isDetailShow: false,
      detailRow: {},
      detailItemNames: [{name: "园区", field: "park", value: "实业公司"}, {name: "车间", field: "workshop_name"},
        {name: "设备编号", field: "sn"}, {name: "监控区域", field: "scan_area"},
        {name: "录制时间", field: "created_time"}, {name: "录制时长", field: "video_interval"},
        {name: "事件编号", field: "event_id"}, {name: "报警类型", field: "alarm_names"}],

      imgList: [],
      videoUrls: [],
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      imageLeft: 0,
      currentPage: 1,
      pageSize: 10,
      pagesCount: 1,

      isExportClick: true,

      isDownloadClick: true,

      timeProxyShow: [true, false],

    }
  },
  watch: {},
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
    isNullChangeVal(data) {
      if (this[data] == null) {
        this[data] = ""
      }
    },
    handlePageChange(page) {
      this.queryHistoryList(page)
    },
    imgHover(index) {
      const galleyOffsetWidth = this.$refs.galley.offsetWidth

      for (let i = 0; i < this.$refs.galleyImg.length; i++) {

        let img = this.$refs.galleyImg[i]
        let left = img.offsetWidth / galleyOffsetWidth
        img.style.left = (this.imageLeft * i) + "%";
        if (index === -1) {
          continue
        }
        if (i > index) {
          img.style.left = (this.imageLeft * (i - 1) + left * 100) + "%";
        }
      }
    },
    handleDetailBack() {
      /*      this.$notify("发送给ue关闭视频弹窗方法")

            let that=this
            this.$ue.co(function*(){
              yield that.$ue.CloseVideo();
            })*/
      this.isDetailShow = false;   // 控制是否显示详情页
    },
    handleVideoClick(url) {

      // this.$ue4('SetVideoURL', url);
      // this.$notify("发送给ue方法PlayVideo")

      let that = this
      this.$ue.co(function* () {
        yield that.$ue.PlayVideo(url);
      })

    },
    async handleFind(row) {
      this.detailRow = row
      this.detail_alarms = [];
      this.imgList = [];
      this.videoUrls = [];
      for (const key in row.alarm_arr) {
        this.detail_alarms.push(row.alarm_arr[key].content)
      }
      const res = await this.$http.get("alarm/history/by/id", {id: row.id})
      // this.sn = data.data.scan_area_location
      if (res.img_urls && res.img_urls.length > 0) {
        for (const iterator of res.img_urls) {
          this.imgList.push(iterator);
          this.imageLeft = 96 / (this.imgList.length + 1)
        }
      }
      //解决再次加载 viewer不显示问题
      this.viewer.forEach(v => {
        v.destroy();
      })
      this.viewer = []
      this.$nextTick(() => {
        this.viewer.push(new Viewer(this.$refs.galley, this.viewerOptions))
      })
      if (res.video_urls) this.videoUrls = this.videoUrls.concat(res.video_urls);
      this.isDetailShow = true;

    },
    downloadFiles() {
      let self = this
      if (self.isDownloadClick) {
        self.isDownloadClick = false
        let fileUrls = self.imgList
        // fileUrls.push(self.currentVideoURL)
        fileUrls = fileUrls.concat(self.videoUrls)
        fileUrls.forEach(async (api_url) => {
          this.$loading.show({spinner: QSpinnerBars, spinnerColor: 'primary', messageColor: 'white', message: '正在下载文件'})
          this.$nextTick(() => {
            setTimeout(() => {
              this.$loading.hide();
            }, 2000)
          });
          let params = {created_time: this.detailRow.created_time, api_url}
          await this.$http.download(params)
          this.$successNotify("导出到桌面成功")

          this.$loading.hide();
        })


        setTimeout(function () {
          self.isDownloadClick = true
        }, 1500)

      }
    },
    async exportHistoryList() {
      let self = this
      if (self.isExportClick) {
        self.isExportClick = false

        var params = this._loadQueryListParams(-1)
        params.api_url = "alarm/history/list/export_excel"
        this.$loading.show({
          spinner: QSpinnerBars,
          spinnerColor: 'primary',
          messageColor: 'white',
          // backgroundColor: 'yellow',
          message: '正在导出文件'
        });
        setTimeout(function () {
          self.isExportClick = true
        }, 1000)
        await this.$http.download(params, 1);
        this.$successNotify("导出文件到桌面成功");
        this.$loading.hide();


      }
    },
    async queryHistoryList(page) {
      this.currentPage = page
      let postParam = this._loadQueryListParams()
      const res = await this.$http.post('alarm/history/list', postParam)
      console.log("history list----", res)
      this.pagesCount = Math.ceil(res.count / this.pageSize)
      this.historyList = res.data
    },
    _loadQueryListParams(pageIndex) {
      let _this = this;
      let page = pageIndex !== -1 ? _this.currentPage : pageIndex

      return {
        start_time: _this.beginTime,
        end_time: _this.endTime,
        page,
        page_size: _this.pageSize,
        alarm_key: _this.alarmKey.alarm_key !== undefined ? _this.alarmKey.alarm_key : _this.alarmKey,
        sn: _this.cameraID.id !== undefined ? _this.cameraID.id.toString() : _this.cameraID,
        roomid: _this.factoryID,
        scan_area: _this.scanAreaID.id === "" ? "" : _this.scanAreaID.content
      }
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
    async loadScanAreas() {
      const res = await this.$http.get("camera/scan_area/list")
      res.unshift({id: "", content: "全部"})
      this.scanAreaOptions = res
      this.scanAreaOptionSrc = res
    },
    async loadCameras() {
      const res = await this.$http.get("camera/filter/list")

      res.unshift({id: "", content: "全部"})
      this.cameraOptions = res
      this.cameraOptionsSrc = res
    },
    async loadAlarms() {
      const res = await this.$http.get("alarm/info/list")

      res.unshift({alarm_key: "", content: "全部"})
      this.alarmOptions = res
      this.alarmOptionsSrc = res
    },
    scanAreaFilter(val, update) {
      update(() => {
        this.scanAreaOptions = this._filterHolder(val, this.scanAreaOptions, this.scanAreaOptionSrc)
      })
    },
    cameraFilter(val, update) {
      update(() => {
        this.cameraOptions = this._filterHolder(val, this.cameraOptions, this.cameraOptionsSrc)
      })
    },
    alarmFilter(val, update) {
      update(() => {
        this.alarmOptions = this._filterHolder(val, this.alarmOptions, this.alarmOptionsSrc)
      })
    },
    _filterHolder(val, options, optionsSrc) {

      if (val === "") {
        options = optionsSrc
      } else {
        let obj = optionsSrc.filter(v => {
          return v.content.indexOf(val) > -1
        })
        options = []
        if (obj) {

          options = options.concat(obj)
        }
      }
      return options
    },
    handleRouteParams() {
      let params = this.$route.params.alarm

      if (!params || !params.alarm_key) {
        return
      }
      this.alarmKey = params.alarm_key
      this.beginTime = this.$moment(new Date()).format("YYYY-MM-DD 00:00:00")
      this.endTime = this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }
  },
  created() {
    this.handleRouteParams()
    this.queryHistoryList(1)
    //TODO 这些筛选项可以暂存 vuex中，定时刷新
    this.loadScanAreas()
    this.loadCameras()
    this.loadAlarms()
    /*    this.loadScanAreas()
        this.loadCameras()
        this.loadAlarms()*/
  },
  mounted() {
  }
}
</script>
<style lang="scss">
.q-table__middle {
  overflow: hidden;
}

//输入框高度
$inputHeight: 33px;
.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: $inputHeight;
}

.q-field--auto-height.q-field--dense .q-field__control, .q-field--auto-height.q-field--dense .q-field__native {
  min-height: $inputHeight;
  height: $inputHeight;
  line-height: $inputHeight;
}

//input颜色
.q-field__native > span {
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.q-field__native > span:hover {
  cursor: pointer;
}

//输入框颜色
.q-select-input {
  color: white;
  text-align: center;
}

//---start 修改输入换行问题
.q-field__native {
  display: flex !important;
  flex-wrap: nowrap !important;
}

.q-select .q-field__input {
  width: 2px !important;
  min-width: 2px !important;
  text-align: left;
}

.q-table tr {

}

.q-table__bottom--nodata {
  border-right: $tableLineWidth solid $tableLineColor;
}

//---end 修改输入换行问题
</style>
<style scoped lang="scss">


.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

$contentHeaderHeight: 20%;
.container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-container, .detail-content-container {
  width: 100% - ($outerContainerPadding * 2);
  height: 90%;
  top: 2%;
  padding: 0 2rem;
  @extend %containerBg;

  position: absolute;
}

.content-header {
  height: $contentHeaderHeight;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.content-body {
  height: 100%-$contentHeaderHeight;
  //display: flex;

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

.content-header-filter {
  height: auto;
  display: flex;
  align-items: center;
}

.filter-ul {
  width: calc(100% - 12rem);
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.filter-li {
  display: flex;
  align-items: center;
}

$itemRightMargin: 1rem;

.filter-name {
  text-align: center;
  min-width: 5rem;
  color: $itemNameColor;
  @extend %titleFontSize;
  margin-right: $itemRightMargin;

}

.filter-li:not(:first-child) .filter-name {
  margin-left: 2rem;
}

.select-item {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  align-items: center;
}

.q-select-no-option {
  padding-left: 1rem;
}

.select-popup {
  color: white;
  background: $inputColor;
}

//selected
.q-selected-item {
  color: $selectedTextColor !important;
  background: $selectedBgColor !important;
}

.q-select-popup .q-item {
  background: $inputColor;
  color: white;
}

.q-select-popup .q-item:hover {
  background: $selectedBgColor;
}

//时间筛选弹出框 确定、此刻按钮 ------start
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

//时间筛选弹出框 确定、此刻按钮 ------end

.filter-right-btns {
  position: absolute;
  right: 2rem;
}

.export-btn {

  border: 1px solid rgb(89, 100, 179);
  background-color: rgba(84, 100, 249, .5);
  padding: 0.2rem 1rem;
  color: #fff;
  border-radius: 0.5rem;
  @extend %middleFontSize;
}

.export-btn:hover {

  background-color: rgba(75, 83, 146, 0.3);
  color: #ccc;
}

.search-btn {
  color: white;
  font-weight: 700;

  background: $buttonBgColor;
  @extend %middleFontSize;
}

.detail-a {
}

.detail-a:link .search-btn {
  background: $pageSelectColor;
}

.detail-a:visited .search-btn {
  background: rgba(130, 121, 121, 1);
  color: #eee;
  opacity: 0.1;
}

.search-btn:hover {
  background: $pageSelectColor;
  color: #ccc;
}

.search-list-btn {
  padding: 0.25rem 1rem;
  border-radius: 0.6rem;
  margin-left: 1rem;
}

.search-detail-btn {
  padding: 0.25rem 0.5rem;
  border-radius: 0.35rem;
}

/*==================
* table
==================*/

.m-table-card {
  color: white;
  @extend %titleFontSize;
  background: none;
  box-shadow: none;
  border-left: $tableLineWidth solid $tableLineColor;
  border-top: $tableLineWidth solid $tableLineColor;
  border-bottom: $tableLineWidth solid $tableLineColor;
}

.m-table-th {
  padding: 0;
  position: relative;
  border: none;
  border-right: $tableLineWidth solid $tableLineColor;
  border-bottom: $tableLineWidth solid $tableLineColor;
  height: 5rem;
}

.table-header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @extend %titleFontSize;
}

.m-table-td {
  border-color: $tableLineColor;
  border-right: $tableLineWidth solid $tableLineColor;
  @extend %middleFontSize;
}

.table-td {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.75rem;
}

.table-header-text {
  margin-left: 0.5rem;
  @extend %middleFontSize;
}

/*==================
* pagination
==================*/
.content-pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}


/*==================
* detail content start
==================*/

.detail-content-container {
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

$detailContentBgColor: rgba(19, 24, 47, 0.35);
.detail-header-container, .detail-video-container, .detail-img-container {
  width: 100%;
  padding: 1rem 2rem;
  background: $detailContentBgColor;
}

.detail-video-container, .detail-img-container {
  margin-top: 2rem;
}

.detail-header-content {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.detail-header-content-item {
  display: flex;
  align-items: center;

}

.detail-header-content-item:last-child {
  min-width: 50%;
  margin-top: 1rem;
}

.detail-header-content-item-name {
  margin-right: 1rem;
  @extend %titleFontSize;
  color: $itemNameColor;
}

.detail-header-content-item-value {
  background: $inputColor;
  padding: 0.1rem 2rem;
  //border: 1px solid $inputBorderColor;
  border-radius: 0.5rem;
  @extend %middleFontSize;
  color: white;
}

.content-header-title-right {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
}

.detail-export-btn, .detail-back-btn {
  color: white;
  font-weight: 700;
  background: $buttonBgColor;
  @extend %middleFontSize;
  padding: 0.25rem 1rem;
  border-radius: 0.35rem;
}

.detail-back-btn {
  margin-left: 1rem;
}

.detail-export-btn:hover {
  background: $pageSelectColor;
  color: #ccc;
}

.detail-back-btn:hover {
  background: $pageSelectColor;
  color: #ccc;
}

$videoHeight: 15rem;
.detail-video-content {
  width: 100%;
  height: $videoHeight;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  overflow-x: auto;
}

.detail-video-img-box {
  height: 90%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-video-img-box:not(:first-child) {
  margin-left: 0.5rem;
}

.detail-video-img {
  height: 100%;
}

.detail-video-play-btn {
  width: 4rem;
  height: 4rem;
  position: absolute;
  z-index: 99;
  border-radius: 50%;
  box-shadow: 0 0 4rem #333;
}

.galley {
  height: $videoHeight;
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
  overflow: hidden;
}

.galley-item {
  height: 100%;
  display: flex;
  transition: all .2s linear;
}

.galley-item-img {
  height: 100%;
}
</style>