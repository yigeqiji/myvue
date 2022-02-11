<template functional>
<div class="container">
  {{props.content}}
</div>
</template>

<script>
export default {
name: "EmptyBox"
}
</script>

<style scoped lang="scss">
.container{
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#eee;
  @extend %middleFontSize;
}
</style>