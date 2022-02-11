<template functional>
<div class="container" v-text="props.content">

</div>
</template>

<script>
export default {
name: "LoadingBox",
  props:{
  content:{
    type:String,
    default:"loading..."
  }
  }
}
</script>

<style scoped lang="scss">
.container{
  width:100%;
  padding:0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#eee;
  @extend %middleFontSize;
}
</style>