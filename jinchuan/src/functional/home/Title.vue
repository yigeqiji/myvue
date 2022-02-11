<template functional>
  <div class="title-container">
    <img class="title-img" src="@/assets/images/home/bt.png" alt="">
    <p class="title-text" v-text="props.title"></p>
  </div>
</template>

<script>
export default {
  name: "Titles"
}
</script>

<style scoped lang="scss">
.title-container {
  height:100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

.title-img {
  height: 100%;
  position: absolute;
  left: 0;
}

.title-text {
  position: absolute;
  @extend %titleFontSize;
  left: 1.5rem;
  color: $titleColor;
  font-weight: 900;
  letter-spacing: 0.08rem;
  white-space: nowrap;
}
</style>