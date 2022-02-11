<template>
  <div class="container">
    <div class="common-container">
<!--      <video autoplay class="common-video" muted="true" src="@/assets/videos/4.mp4"></video>-->
      <canvas id="canvas-1" class="canvas" width="800px" height="800px"></canvas>
      <canvas id="canvas-2" class="canvas" width="800px" height="800px"></canvas>
    </div>
    <button @click="startCanvas">开始</button>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      canvas1: null,
      context1: null,
    }
  },
  mounted() {
    this.canvas1 = document.getElementById("canvas-1")
    this.context1 = this.canvas1.getContext("2d")
    this.context1.strokeStyle = "green";
    this.context1.lineWidth=1

    this.canvas2 = document.getElementById("canvas-2")
    this.context2 = this.canvas2.getContext("2d")
    this.context2.strokeStyle = "red";
    this.context2.lineWidth=2
  },
  methods:{
    startCanvas(){
      let that=this
      for (let i=1; i<=100; i++) {

        setTimeout( function timer() {
          that.context1.clearRect(0,0,800,800);
          that.context1.strokeRect(i*10,i*10,150,100)
        }, i*500 );
      }

      for (let i=1; i<=100; i++) {

        setTimeout( function timer() {
          that.context2.clearRect(0,0,800,800);
          that.context2.strokeRect(i*30,i*30,100,200)
        }, i*100 );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  border: 1px solid orange;
}
.common-container{
  width:800px;
  height: 800px;
  border: 1px solid red;
  position: relative;
}
.canvas {
  position: absolute;

  border: 1px solid green;
}
.common-video{
  position: absolute;
  width: 100%;
  height:100%;
}
</style>