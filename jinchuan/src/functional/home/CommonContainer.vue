<template functional>
  <div class="container" :class="props.mClass" :style="props.mStyle" v-show="props.mShow">
    <div class="content">
      <slot name="content" class="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
props:{
  mClass:{
    type:String,
    default:""
  },
  mStyle:{
    type:String,
    default:""
  },
  mShow:{
    type:Boolean,
    default:true
  }
}
}
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  //height:33%;
  display: flex;
  flex-direction: column;
  position: relative;
  //background: rgba(3,40,85,0.5);
  background-image: linear-gradient(to right, rgba(23, 35, 53, 0.5) , rgba(23, 35, 53, 1));

  //box-shadow: 0 0 0.2rem #444;
  border-radius: 0.2rem;
  padding:0.5rem;
}
.content{
  width:100%;
  height:100%;
}

</style>