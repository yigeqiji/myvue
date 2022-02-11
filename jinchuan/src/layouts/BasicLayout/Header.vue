<template>
  <div class="container">
    <div class="vconsole-trigger cursor-pointer" @click="vconsoleTrigger"></div>
    <div class="now-time-box" v-text="nowTime"></div>
    <div class="app-title-text" v-forbidden-select>金川镍都实业智慧生产安全管理系统</div>
    <div class="app-window-manager">
      <img class="small cursor-pointer" src="@/assets/images/app-small.png" @click="smallApp()"/>
      <img class="quit cursor-pointer" src="@/assets/images/app-quit.png" @click="quitApp()"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      vconsole:null,
      nowTime: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods:{
    vconsoleTrigger(){
      if (this.vconsole){
        this.vconsole.destroy()
        this.vconsole=null
      }else{
        this.vconsole=new this.$vconsole
      }

    },
    smallApp(){
      let that=this
      // this.$notify("调用ue方法，最小化")
      this.$ue.co(function*(){
        yield that.$ue.MinimizeApp();
      })
    },
    quitApp(){
      let that=this
      this.$ue.co(function*(){
        yield that.$ue.CloseApp();
      })
    },
  },
  mounted() {
    setInterval(() => {
      this.nowTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, 1)
  },

}
</script>

<style scoped lang="scss">

.container {
  background: url(~@/assets/images/app-title.png);
  background-size: 100% 100%;
}
.vconsole-trigger{
  position: fixed;
  width:30px;
  height:30px;
  z-index:99;
  left:0;
  top:0;
}
.now-time-box {
  position: absolute;
  left: 5%;
  top: 13.8%;
  letter-spacing: 0.1rem;
  color: $titleColor;
}
.app-title-text{
  color: $titleColor;
  font-size:2rem;
  width:100%;
  text-align: center;
  position:absolute;
  top:13.5%;
  text-shadow: 0 0 5px #444;
}
.app-window-manager{
  position:absolute;
  display: flex;
  align-items: center;
  right:2.5%;
  top:13.5%;
}
.app-window-manager>img{
  width:1.5rem;
}
.quit{
  margin-left:0.5rem;
}
</style>
