<template>
<div class="container" v-forbidden-select>
  <div class="footer-trigger cursor-pointer" @click="setFooterShow"></div>
  <div class="router-container cursor-pointer" v-show="$store.state.footerShow">
    <router-link class="router-link" active-class="router-link-active" to="analyse">
      <img :src="imgUrl('analyse',0)" alt="" class="router-link-bg">
      <p class="router-link-name">数据统计</p>
    </router-link>
    <router-link class="router-link" active-class="router-link-active" to="home">
      <img :src="imgUrl('home',1)" alt="" class="router-link-bg">
      <p class="router-link-name">安全管理</p>
    </router-link>
    <!--    <router-link class="router-link" active-class="router-link-active" to="equipment-manager">设备管理</router-link>-->
    <router-link class="router-link" active-class="router-link-active" to="record">
      <img :src="imgUrl('record',0)" alt="" class="router-link-bg">
      <p class="router-link-name">历史追踪</p>
    </router-link>
<!--    <router-link class="router-link" active-class="router-link-active" to="spot-check?id=22" style="color:red;">设备点检</router-link>-->
<!--    <router-link class="router-link" active-class="router-link-active" to="camera-info?sn=3" style="color:red;">相机</router-link>-->

    <!--    <router-link class="router-link" active-class="router-link-active" to="camera-info?sn=1">相机信息</router-link>-->

  </div>
  <img class="app-bottom-line" src="@/assets/images/app-bottom-line.png" alt="">

</div>
</template>

<script>
export default {
name: "Footer",
  data(){
  return{
    routerBgArr:[{normal:require('@/assets/images/app-tab-bg-1.png'),selected:require('@/assets/images/app-tab-bg-1-selected.png')},
      {normal:require('@/assets/images/app-tab-bg.png'),selected:require('@/assets/images/app-tab-bg-selected.png')}
    ]
  }
  },
  methods:{
    setFooterShow(){
      this.$store.commit("setFooterShow",!this.$store.state.footerShow)
    },
    imgUrl(routeName,index){
      return this.$route.name===routeName?this.routerBgArr[index].selected:this.routerBgArr[index].normal;
/*      if (this.$route.name===routeName){
        return this.routerBgArr[index].normal
      }else{
        return require('@/assets/images/app-tab-bg-1.png')

      }*/
      /*let activeEL=document.getElementsByClassName("router-link-active")[0]
      console.log()*/
    }
  },
  mounted() {
/*  let activeEL=document.getElementsByClassName("router-link-active")[0]
    if (activeEL){
      let src=activeEL.children[0].getAttribute("data-src")
      activeEL.children[0].src=src+".png"
    }*/
  }
}
</script>

<style scoped lang="scss">
.footer-trigger{
  width:30px;
  height:30px;
  position: fixed;
  z-index:99;
  right:0;
  top:0;
}
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  //opacity: 0;
}
.container *{
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.container a{
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.router-container{
  display: flex;
  width:23rem;
  align-items: flex-end;
  justify-content: space-between;
  transition:all 0.5s linear;
  border-radius: 2rem;
}
.container:hover{
  opacity:1;
}
.router-link {
  height:2.5rem;
  //margin:0 16%;
  color: white;
  @extend %titleFontSize;
  text-decoration-line: none;
  //transition:all 0.5s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.router-link-name{
  text-align: center;
  white-space: nowrap;
  position:relative;
  z-index:5;
}
.router-link-bg{
  height:100%;
  position:absolute;
}
.router-link-active{
  //transform: scale(1.1);
  height:2.6rem;
  font-weight: 900;

  //border-color:$titleColor;
}
.router-link:hover{
  height:2.6rem;
  font-weight: 900;

  //border-color:$titleColor;
}
.app-bottom-line{
  position:absolute;
  bottom:0;
}
</style>